"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, Eye, EyeOff, Loader2, Bold, Italic,
  Heading1, Heading2, List, ListOrdered, Quote, Image as ImageIcon,
  Link2, Minus, Undo2, Redo2, Upload, X, Check, Globe, Tag, FileText,
} from "lucide-react";

interface Post {
  id: string; title: string; slug: string; excerpt: string | null;
  content: unknown; tags: string[]; isPublished: boolean;
  publishedAt: string | null; coverImage: string | null;
  seoTitle: string | null; seoDescription: string | null;
  authorName: string | null; viewCount: number;
}

function ToolBtn({
  onAction, title, children,
}: { onAction: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onAction(); }}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors flex-shrink-0 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
    >
      {children}
    </button>
  );
}

function execCmd(cmd: string, value?: string) {
  document.execCommand(cmd, false, value);
}

export default function BlogPostEditorPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const postId = params.postId as string;
  const isNew = postId === "new";

  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);

  const [post, setPost] = useState<Partial<Post>>({
    title: "", slug: "", excerpt: "", content: "", tags: [],
    isPublished: false, coverImage: null, seoTitle: null,
    seoDescription: null, authorName: null,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"write" | "seo" | "settings">("write");
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/sites/${siteId}/blog/${postId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.post) {
          setPost(d.post);
          setTagInput((d.post.tags || []).join(", "));
          if (editorRef.current) {
            const raw = d.post.content;
            const html =
              typeof raw === "string"
                ? raw
                : raw && typeof raw === "object" && (raw as { html?: string }).html
                ? (raw as { html: string }).html
                : "";
            editorRef.current.innerHTML = html;
          }
        }
        setLoading(false);
      });
  }, [siteId, postId, isNew]);

  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);

  const handleTitleChange = (title: string) => {
    setPost((p) => ({
      ...p,
      title,
      slug: isNew ? slugify(title) : p.slug || slugify(title),
    }));
  };

  const handleSave = useCallback(
    async (publishOverride?: boolean) => {
      setSaving(true);
      const html = editorRef.current?.innerHTML || "";
      const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
      const isPublished = publishOverride !== undefined ? publishOverride : post.isPublished;

      const body = {
        title: post.title,
        slug: post.slug || slugify(post.title || "untitled"),
        excerpt: post.excerpt,
        content: html,
        tags,
        isPublished,
        coverImage: post.coverImage,
        authorName: post.authorName,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      };

      const url = isNew
        ? `/api/sites/${siteId}/blog`
        : `/api/sites/${siteId}/blog/${postId}`;
      const method = isNew ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.post || data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        if (isNew && data.post) {
          router.replace(`/sites/${siteId}/blog/${data.post.id}`);
        }
        if (publishOverride !== undefined) {
          setPost((p) => ({ ...p, isPublished: publishOverride }));
        }
      }
      setSaving(false);
    },
    [post, tagInput, siteId, postId, isNew, router]
  );

  // Autosave every 30s for existing posts
  useEffect(() => {
    if (isNew) return;
    const t = setInterval(() => handleSave(), 30000);
    return () => clearInterval(t);
  }, [handleSave, isNew]);

  const uploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "site-assets");
    fd.append("path", `sites/${siteId}/blog/${Date.now()}-${file.name}`);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    return data.url ?? null;
  };

  const insertInlineImage = () => fileRef.current?.click();

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) execCmd("createLink", url);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-josett-500" size={32} />
      </div>
    );
  }

  const tabs = [
    { id: "write" as const, label: "Write", Icon: FileText },
    { id: "seo" as const, label: "SEO", Icon: Globe },
    { id: "settings" as const, label: "Settings", Icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href={`/sites/${siteId}/blog`}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400 truncate">
              {post.isPublished ? "Published" : "Draft"} ·{" "}
              {post.slug || "new-post"}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {saved && (
              <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                <Check size={12} /> Saved
              </span>
            )}
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              Save
            </button>
            <button
              onClick={() => handleSave(!post.isPublished)}
              disabled={saving}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-xl transition-all disabled:opacity-50 ${
                post.isPublished
                  ? "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-200"
                  : "bg-josett-600 text-white hover:bg-josett-500"
              }`}
            >
              {post.isPublished ? (
                <><EyeOff size={13} /> Unpublish</>
              ) : (
                <><Eye size={13} /> Publish</>
              )}
            </button>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="max-w-4xl mx-auto px-4 flex border-t border-slate-100 dark:border-slate-800">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                tab === id
                  ? "border-josett-500 text-josett-600 dark:text-josett-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-5">
        {/* WRITE tab */}
        {tab === "write" && (
          <>
            {/* Cover image */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              {post.coverImage ? (
                <div className="relative">
                  <img
                    src={post.coverImage}
                    alt="Cover"
                    className="w-full h-52 object-cover"
                  />
                  <button
                    onClick={() => setPost((p) => ({ ...p, coverImage: null }))}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => coverFileRef.current?.click()}
                  className="w-full h-24 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-josett-500 hover:bg-josett-50 dark:hover:bg-josett-950/10 transition-colors"
                >
                  <ImageIcon size={20} />
                  <span className="text-sm font-medium">Add cover image</span>
                </button>
              )}
            </div>

            {/* Title */}
            <textarea
              value={post.title || ""}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title…"
              rows={2}
              className="w-full text-3xl sm:text-4xl font-black text-slate-900 dark:text-white placeholder-slate-300 bg-transparent border-none outline-none resize-none leading-tight"
            />

            {/* Excerpt */}
            <textarea
              value={post.excerpt || ""}
              onChange={(e) => setPost((p) => ({ ...p, excerpt: e.target.value }))}
              placeholder="Short excerpt or summary (optional)…"
              rows={2}
              className="w-full text-base text-slate-500 placeholder-slate-300 bg-transparent border-none outline-none resize-none"
            />

            {/* Editor */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-0.5 px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex-wrap">
                <ToolBtn onAction={() => execCmd("bold")} title="Bold"><Bold size={14} /></ToolBtn>
                <ToolBtn onAction={() => execCmd("italic")} title="Italic"><Italic size={14} /></ToolBtn>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 flex-shrink-0" />
                <ToolBtn onAction={() => execCmd("formatBlock", "h1")} title="Heading 1"><Heading1 size={14} /></ToolBtn>
                <ToolBtn onAction={() => execCmd("formatBlock", "h2")} title="Heading 2"><Heading2 size={14} /></ToolBtn>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 flex-shrink-0" />
                <ToolBtn onAction={() => execCmd("insertUnorderedList")} title="Bullet list"><List size={14} /></ToolBtn>
                <ToolBtn onAction={() => execCmd("insertOrderedList")} title="Numbered list"><ListOrdered size={14} /></ToolBtn>
                <ToolBtn onAction={() => execCmd("formatBlock", "blockquote")} title="Quote"><Quote size={14} /></ToolBtn>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 flex-shrink-0" />
                <ToolBtn onAction={insertLink} title="Insert link"><Link2 size={14} /></ToolBtn>
                <ToolBtn onAction={insertInlineImage} title="Insert image">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                </ToolBtn>
                <ToolBtn onAction={() => execCmd("insertHorizontalRule")} title="Divider"><Minus size={14} /></ToolBtn>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 flex-shrink-0" />
                <ToolBtn onAction={() => execCmd("undo")} title="Undo"><Undo2 size={14} /></ToolBtn>
                <ToolBtn onAction={() => execCmd("redo")} title="Redo"><Redo2 size={14} /></ToolBtn>
              </div>

              {/* Content area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Start writing your post…"
                className="min-h-[420px] px-6 py-5 text-slate-800 dark:text-slate-200 focus:outline-none"
              />

              <style>{`
                [data-placeholder]:empty:before {
                  content: attr(data-placeholder);
                  color: #94a3b8;
                  pointer-events: none;
                  display: block;
                }
                [contenteditable] h1 { font-size:1.875rem; font-weight:900; margin:1.5rem 0 .5rem; line-height:1.2; }
                [contenteditable] h2 { font-size:1.375rem; font-weight:900; margin:1.25rem 0 .5rem; line-height:1.3; }
                [contenteditable] p  { margin:.5rem 0; line-height:1.8; }
                [contenteditable] blockquote { border-left:4px solid #7c3aed; padding-left:1rem; margin:1rem 0; color:#64748b; font-style:italic; }
                [contenteditable] ul { list-style:disc; padding-left:1.5rem; margin:.5rem 0; }
                [contenteditable] ol { list-style:decimal; padding-left:1.5rem; margin:.5rem 0; }
                [contenteditable] a  { color:#7c3aed; text-decoration:underline; }
                [contenteditable] hr { border:none; border-top:2px solid #e2e8f0; margin:1.5rem 0; }
                [contenteditable] img { max-width:100%; border-radius:12px; margin:1rem 0; }
              `}</style>
            </div>
          </>
        )}

        {/* SEO tab */}
        {tab === "seo" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-5">
            <h2 className="font-black text-slate-900 dark:text-white text-lg">SEO Settings</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                SEO Title <span className="font-normal normal-case text-slate-400">(defaults to post title)</span>
              </label>
              <input
                value={post.seoTitle || ""}
                onChange={(e) => setPost((p) => ({ ...p, seoTitle: e.target.value }))}
                placeholder={post.title || "Post title"}
                className="w-full h-11 px-4 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:border-josett-500"
              />
              <p className="text-xs text-slate-400 mt-1">{(post.seoTitle || post.title || "").length}/60 characters</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">SEO Description</label>
              <textarea
                value={post.seoDescription || ""}
                onChange={(e) => setPost((p) => ({ ...p, seoDescription: e.target.value }))}
                placeholder="Brief description for search engines…"
                rows={3}
                className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:border-josett-500 resize-none"
              />
              <p className="text-xs text-slate-400 mt-1">{(post.seoDescription || "").length}/160 characters</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 flex-shrink-0">/blog/</span>
                <input
                  value={post.slug || ""}
                  onChange={(e) => setPost((p) => ({ ...p, slug: e.target.value }))}
                  className="flex-1 h-11 px-4 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:border-josett-500"
                />
              </div>
            </div>

            {/* SERP preview */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Search Preview</p>
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800">
                <p className="text-blue-600 text-sm font-medium mb-0.5 truncate">
                  {post.seoTitle || post.title || "Post Title"}
                </p>
                <p className="text-green-700 dark:text-green-500 text-xs mb-1">
                  josett.com/s/…/blog/{post.slug || "post-slug"}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                  {post.seoDescription || post.excerpt || "No description set."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings tab */}
        {tab === "settings" && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-5">
            <h2 className="font-black text-slate-900 dark:text-white text-lg">Post Settings</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Author Name</label>
              <input
                value={post.authorName || ""}
                onChange={(e) => setPost((p) => ({ ...p, authorName: e.target.value }))}
                placeholder="e.g. Abena Boateng"
                className="w-full h-11 px-4 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:border-josett-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Tags</label>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="business, tips, ghana (comma separated)"
                className="w-full h-11 px-4 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl focus:outline-none focus:border-josett-500"
              />
              {tagInput && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tagInput.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                    <span key={t} className="text-xs bg-josett-100 dark:bg-josett-950/40 text-josett-700 dark:text-josett-300 px-2.5 py-1 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <p className="text-sm text-slate-500">
                {post.isPublished
                  ? "This post is live — readers can see it on your blog."
                  : "This post is a draft — only you can see it."}
              </p>
              <p className="text-xs text-slate-400">Views: {post.viewCount ?? 0}</p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden inputs */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const url = await uploadFile(file);
          if (url && editorRef.current) {
            execCmd("insertHTML", `<img src="${url}" alt="" style="max-width:100%;border-radius:12px;margin:1rem 0;" />`);
          }
          e.target.value = "";
        }}
      />
      <input
        ref={coverFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const url = await uploadFile(file);
          if (url) setPost((p) => ({ ...p, coverImage: url }));
          e.target.value = "";
        }}
      />
    </div>
  );
}
