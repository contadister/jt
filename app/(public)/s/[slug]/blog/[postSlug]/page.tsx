import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { format } from "date-fns";
import type { Metadata } from "next";

interface Props { params: { slug: string; postSlug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

async function getPost(params: { slug: string; postSlug: string }) {
  const site = await prisma.site.findUnique({ where: { slug: params.slug }, select: { id: true, name: true, slug: true } });
  if (!site) return null;
  const post = await prisma.blogPost.findFirst({
    where: { siteId: site.id, slug: params.postSlug, isPublished: true },
  });
  if (!post) return null;
  return { ...post, siteName: site.name, siteSlug: site.slug };
}

// Render content — stored as JSON (array of blocks or raw HTML string)
function renderContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((block: { type?: string; text?: string; html?: string; content?: string }) => {
      if (block.type === "paragraph") return `<p>${block.text || block.content || ""}</p>`;
      if (block.type === "heading") return `<h2>${block.text || block.content || ""}</h2>`;
      if (block.type === "image") return `<img src="${block.html || ""}" alt="" class="w-full rounded-xl my-6"/>`;
      return `<p>${block.text || block.content || block.html || ""}</p>`;
    }).join("\n");
  }
  if (typeof content === "object" && content !== null) {
    return (content as { html?: string }).html || JSON.stringify(content);
  }
  return String(content || "");
}

export default async function PublicPostPage({ params }: Props) {
  const post = await getPost(params);
  if (!post) notFound();

  // Increment view count (fire and forget)
  prisma.blogPost.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-100 px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href={`/s/${params.slug}`} className="font-black text-xl text-slate-900 hover:opacity-80 transition-opacity">
            {post.siteName}
          </Link>
          <nav className="flex gap-5 text-sm font-medium text-slate-500">
            <Link href={`/s/${params.slug}`} className="hover:text-slate-900">Home</Link>
            <Link href={`/s/${params.slug}/blog`} className="hover:text-slate-900">Blog</Link>
          </nav>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">{post.title}</h1>

        {post.excerpt && <p className="text-lg text-slate-500 mb-6 leading-relaxed">{post.excerpt}</p>}

        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          {post.authorAvatar && (
            <img src={post.authorAvatar} alt={post.authorName || ""} className="w-8 h-8 rounded-full object-cover" />
          )}
          {post.authorName && <span className="font-medium text-slate-600">{post.authorName}</span>}
          {post.publishedAt && <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>}
          <span>{post.viewCount + 1} views</span>
        </div>

        {post.coverImage && (
          <img src={post.coverImage} alt={post.title}
            className="w-full rounded-2xl mb-10 object-cover max-h-[400px]" />
        )}

        {/* Content */}
        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-a:text-blue-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        <div className="mt-14 pt-8 border-t border-slate-100">
          <Link href={`/s/${params.slug}/blog`}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
