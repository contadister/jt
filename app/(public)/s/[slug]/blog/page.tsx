import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { format } from "date-fns";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const site = await prisma.site.findUnique({ where: { slug: params.slug } });
  if (!site) return {};
  return { title: `Blog — ${site.name}`, description: `Latest posts from ${site.name}` };
}

export default async function PublicBlogPage({ params }: Props) {
  const site = await prisma.site.findUnique({
    where: { slug: params.slug },
    select: { id: true, name: true, primaryColor: true, status: true },
  });

  if (!site || site.status === "CANCELLED") notFound();

  const posts = await prisma.blogPost.findMany({
    where: { siteId: site.id, isPublished: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true, title: true, slug: true, excerpt: true,
      coverImage: true, tags: true, publishedAt: true,
      authorName: true, viewCount: true,
    },
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href={`/s/${params.slug}`} className="font-black text-xl text-slate-900 hover:opacity-80 transition-opacity">
            {site.name}
          </Link>
          <nav className="flex gap-5 text-sm font-medium text-slate-500">
            <Link href={`/s/${params.slug}`} className="hover:text-slate-900">Home</Link>
            <Link href={`/s/${params.slug}/blog`} className="text-slate-900">Blog</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-black text-slate-900 mb-3">Blog</h1>
        <p className="text-slate-400 mb-10">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>

        {posts.length === 0 ? (
          <p className="text-slate-400 text-center py-20">No posts published yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/s/${params.slug}/blog/${post.slug}`}>
                  {post.coverImage && (
                    <img src={post.coverImage} alt={post.title}
                      className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:opacity-95 transition-opacity" />
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h2>
                  {post.excerpt && <p className="text-slate-500 leading-relaxed mb-3">{post.excerpt}</p>}
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    {post.authorName && <span>{post.authorName}</span>}
                    {post.publishedAt && <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>}
                    <span>{post.viewCount} views</span>
                  </div>
                </Link>
                <hr className="mt-8 border-slate-100" />
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
