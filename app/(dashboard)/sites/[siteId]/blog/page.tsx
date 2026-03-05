"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Search, BookOpen, Edit3, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Post {
  id: string; title: string; slug: string; excerpt: string | null;
  isPublished: boolean; publishedAt: string | null; viewCount: number;
  tags: string[]; createdAt: string; coverImage: string | null;
}

export default function BlogPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", tags: "" });

  useEffect(() => {
    fetch(`/api/sites/${siteId}/blog`)
      .then((r) => r.json())
      .then((d) => { setPosts(d.posts || []); setLoading(false); });
  }, [siteId]);

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/sites/${siteId}/blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        excerpt: form.excerpt,
        content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: form.content }] }] },
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });
    const data = await res.json();
    if (data.post) setPosts((p) => [data.post, ...p]);
    setShowForm(false);
    setForm({ title: "", excerpt: "", content: "", tags: "" });
    setSaving(false);
  };

  const handleTogglePublish = async (post: Post) => {
    await fetch(`/api/sites/${siteId}/blog/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !post.isPublished }),
    });
    setPosts((p) => p.map((x) => x.id === post.id ? { ...x, isPublished: !x.isPublished } : x));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/sites/${siteId}/blog/${id}`, { method: "DELETE" });
    setPosts((p) => p.filter((x) => x.id !== id));
  };

  const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Blog</h1>
          <p className="text-slate-500 text-sm">{posts.length} posts</p>
        </div>
        <Link href={`/sites/${siteId}/blog/new`}
          className="flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all">
          <Plus size={14} /> New Post
        </Link>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">New Post</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Excerpt</label>
              <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none resize-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Content</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6}
                placeholder="Write your post content here..."
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none resize-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="business, tips, ghana"
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 text-sm focus:border-josett-500 focus:outline-none" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleCreate} disabled={saving}
              className="flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 disabled:opacity-50">
              {saving && <Loader2 size={13} className="animate-spin" />} Create Post
            </button>
            <button onClick={() => setShowForm(false)} className="border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold px-4 py-2 rounded-xl text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..."
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl focus:border-josett-500 focus:outline-none" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No posts yet</p>
          <p className="text-sm">Write your first blog post</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex items-center gap-4">
              {post.coverImage && (
                <img src={post.coverImage} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" alt="" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{post.title}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    post.isPublished ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                  }`}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                {post.excerpt && <p className="text-xs text-slate-500 truncate">{post.excerpt}</p>}
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-400">{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                  <span className="text-xs text-slate-400">{post.viewCount} views</span>
                  {post.tags.length > 0 && (
                    <div className="flex gap-1">
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/sites/${siteId}/blog/${post.id}`} className="text-slate-400 hover:text-josett-500 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Edit">
                  <Edit3 size={15} />
                </Link>
                <button onClick={() => handleTogglePublish(post)} className="text-slate-400 hover:text-josett-500 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {post.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                <button onClick={() => handleDelete(post.id)} className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
