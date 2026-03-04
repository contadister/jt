import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog — Tips, News & Resources" };

const POSTS = [
  {
    slug: "how-to-grow-your-business-online-ghana",
    title: "How to Grow Your Business Online in Ghana (2025 Guide)",
    excerpt: "From creating a professional website to accepting mobile money payments — here's everything you need to establish a strong digital presence in Ghana.",
    category: "Business",
    readTime: "5 min read",
    date: "Jan 15, 2025",
    emoji: "🇬🇭",
  },
  {
    slug: "ecommerce-ghana-beginners-guide",
    title: "Starting an Online Store in Ghana: A Complete Beginner's Guide",
    excerpt: "Learn how to set up your first e-commerce store, accept Paystack payments, and start selling online — no coding required.",
    category: "E-commerce",
    readTime: "7 min read",
    date: "Jan 8, 2025",
    emoji: "🛒",
  },
  {
    slug: "seo-tips-small-business-ghana",
    title: "5 SEO Tips Every Ghanaian Small Business Should Know",
    excerpt: "Rank higher on Google and get found by customers searching for your products and services online.",
    category: "SEO",
    readTime: "4 min read",
    date: "Dec 28, 2024",
    emoji: "🔍",
  },
  {
    slug: "why-your-business-needs-website-2025",
    title: "Why Every Business in Ghana Needs a Website in 2025",
    excerpt: "Social media alone isn't enough. Discover why a dedicated website is the most powerful business investment you can make this year.",
    category: "Business",
    readTime: "3 min read",
    date: "Dec 20, 2024",
    emoji: "💡",
  },
];

const CATEGORIES = ["All", "Business", "E-commerce", "SEO", "Design", "Tips"];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <nav className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">J</div>
          Josett
        </Link>
        <Link href="/register" className="bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all">Get Started</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">Blog</h1>
          <p className="text-slate-500 dark:text-slate-400">Tips, tutorials, and insights for Ghanaian entrepreneurs.</p>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <span key={cat} className={`px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-all ${
              cat === "All" ? "bg-josett-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-josett-50 dark:hover:bg-josett-950/30 hover:text-josett-600 dark:hover:text-josett-400"
            }`}>{cat}</span>
          ))}
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-7 hover:border-josett-200 dark:hover:border-josett-800 hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">{post.emoji}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-josett-600 dark:text-josett-400 bg-josett-50 dark:bg-josett-950/40 px-2.5 py-1 rounded-full">{post.category}</span>
                <span className="text-xs text-slate-400">{post.readTime}</span>
              </div>
              <h2 className="font-black text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-josett-600 dark:group-hover:text-josett-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
              <p className="text-xs text-slate-400">{post.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
