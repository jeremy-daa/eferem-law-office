"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useNeonAuth } from "@/context/AuthProvider";
import AdminLogin from "@/components/AdminLogin";
import { motion } from "framer-motion";
import {
  LuArrowLeft,
  LuSend,
  LuImage,
  LuFileText,
  LuCalendar,
  LuClock,
  LuSparkles,
  LuPaperclip,
  LuCheckCircle,
  LuAlertCircle,
  LuTag,
  LuShieldCheck,
  LuEye,
  LuEyeOff,
  LuCopy,
  LuCheck,
  LuInfo,
  LuRefreshCw
} from "react-icons/lu";
import Link from "next/link";

// Dynamically import @uiw/react-md-editor for SSR safety in Next.js
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function CreatePostStudio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const { user, loading: authLoading } = useNeonAuth();

  const practiceCategories = [
    "Corporate & Commercial",
    "Construction & Engineering",
    "Litigation & Dispute Resolution",
    "Property & Transfer of Rights",
    "Procurement & Public Tenders",
    "Taxation & Custom Duty Advisory",
    "Labor & Social Security Law",
    "Civil Society Organizations (CSO)",
    "General Legal Advisory"
  ];

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(practiceCategories[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState<string>(
    "## Legal Analysis Overview\n\nProvide a comprehensive analysis of the legal matter, corporate structure, or statutory provision here...\n\n### Key Principles & Statutory References\n- Item 1\n- Item 2\n"
  );
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [isPublished, setIsPublished] = useState(true);

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>("");
  const [featuredImageKey, setFeaturedImageKey] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Pre-populate post data if editing an existing article
  useEffect(() => {
    if (editId) {
      setIsEditing(true);
      setIsLoadingPost(true);
      fetch(`/api/posts/${editId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load article details");
          return res.json();
        })
        .then((data) => {
          if (data) {
            setTitle(data.title || "");
            setSlug(data.slug || "");
            setCategory(data.category || practiceCategories[0]);
            setExcerpt(data.excerpt || "");
            setContent(data.content || "");
            if (data.publishedAt) {
              setPublishedAt(new Date(data.publishedAt).toISOString().slice(0, 16));
            }
            if (data.isPublished !== undefined) {
              setIsPublished(Boolean(data.isPublished));
            }
            const imgUrl = data.image || data.featuredImageKey || "";
            if (imgUrl) {
              setFeaturedImagePreview(imgUrl);
              setFeaturedImageKey(data.featuredImageKey || imgUrl);
            }
          }
          setIsLoadingPost(false);
        })
        .catch((err) => {
          console.error("Error populating post for editing:", err);
          setStatus({ type: "error", msg: "Failed to populate existing article details." });
          setIsLoadingPost(false);
        });
    }
  }, [editId]);

  // Auto-generate clean URL slug from Title (only for new articles)
  useEffect(() => {
    if (title && !isEditing) {
      const cleanSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(cleanSlug);
    }
  }, [title, isEditing]);

  // Calculate live reading time
  const wordsCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readingTime = `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

  const [uploadedSnippet, setUploadedSnippet] = useState<{
    type: "image" | "document";
    name: string;
    code: string;
  } | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleCopySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  // Hero Featured Image Presigned Upload
  const handleFeaturedImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFeaturedImage(file);
    setFeaturedImagePreview(URL.createObjectURL(file));

    setIsUploadingMedia(true);
    try {
      const res = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
      ).then((r) => r.json());

      if (res?.uploadUrl && res?.objectKey) {
        await fetch(res.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
        setFeaturedImageKey(res.objectKey);
      }
    } catch (err) {
      console.error("Featured image upload error:", err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  // Inline Markdown Image Upload (Generates Copyable Snippet)
  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploadingMedia(true);

    try {
      const res = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
      ).then((r) => r.json());

      if (res?.uploadUrl && res?.fileUrl) {
        await fetch(res.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        const snippetCode = `![${file.name.split(".")[0]}](${res.fileUrl})`;
        setUploadedSnippet({
          type: "image",
          name: file.name,
          code: snippetCode,
        });
      }
    } catch (err) {
      console.error("Inline image upload error:", err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  // Inline Document Upload (Generates Copyable Snippet)
  const handleInlineDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploadingMedia(true);

    try {
      const res = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
      ).then((r) => r.json());

      if (res?.uploadUrl && res?.fileUrl) {
        await fetch(res.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        const docCode = `[📄 Download Legal Document: ${file.name}](${res.fileUrl})`;
        setUploadedSnippet({
          type: "document",
          name: file.name,
          code: docCode,
        });
      }
    } catch (err) {
      console.error("Inline doc upload error:", err);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  // Publish / Update Handler
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      return setStatus({ type: "error", msg: "Article title and content are required." });
    }

    setPublishing(true);
    setStatus({ type: null, msg: "" });

    try {
      const endpoint = editId ? `/api/posts/${editId}` : "/api/posts";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          excerpt: excerpt || content.slice(0, 160) + "...",
          content,
          featured_image_key: featuredImageKey,
          image: featuredImageKey,
          authorName: user?.name || "Eferem Hailemariam",
          publishedAt,
          isPublished,
        }),
      });

      const data = await res.json();
      if (res.ok && (data.success || data.id)) {
        setStatus({
          type: "success",
          msg: editId
            ? "Article updated successfully in Neon database!"
            : "Article published successfully to Neon database!",
        });
        setTimeout(() => {
          router.push("/admin");
        }, 1200);
      } else {
        setStatus({
          type: "error",
          msg: data.error || "Failed to save article. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Connection error while saving article.",
      });
    } finally {
      setPublishing(false);
    }
  };

  if (authLoading || isLoadingPost) {
    return (
      <div className="w-full min-h-screen bg-[#0A1D37] text-white flex flex-col items-center justify-center gap-3">
        <LuRefreshCw className="w-8 h-8 text-[#FBA832] animate-spin" />
        <span className="text-xs uppercase tracking-wider text-[#FBA832] font-semibold">
          {isLoadingPost ? "Fetching Article Details from Neon..." : "Loading Blog Studio..."}
        </span>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0A1D37] text-white pt-32 pb-20 px-4 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* Studio Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2.5 rounded-xl bg-[#061528] border border-slate-700/80 hover:border-[#FBA832] text-slate-300 hover:text-white transition-all shadow-md"
            >
              <LuArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold">
                {isEditing ? "Edit Legal" : "Create Legal"}{" "}
                <span className="text-gold-gradient font-serif-heading">Article</span>
              </h1>
              <p className="text-xs text-slate-400 font-sans-body">
                {isEditing
                  ? "Update existing publication content, media, and visibility flags"
                  : "Publish insights with rich markdown, inline documents & Neon S3 media"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FBA832] to-[#f99b15] hover:from-[#f99b15] hover:to-[#e08905] text-[#0A1D37] font-bold text-sm shadow-xl shadow-[#FBA832]/25 flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
            >
              <LuSend className="w-4 h-4" />
              <span>
                {publishing
                  ? "Saving to Neon..."
                  : isEditing
                  ? "Update Article"
                  : "Publish Article"}
              </span>
            </button>
          </div>
        </div>

        {/* Alert Feedback */}
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
              status.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                : "bg-rose-500/20 border border-rose-500/50 text-rose-300"
            }`}
          >
            {status.type === "success" ? (
              <LuCheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : (
              <LuAlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            )}
            <span>{status.msg}</span>
          </motion.div>
        )}

        {/* Stacked Flow: Metadata Card Top, Markdown Editor Bottom */}
        <div className="w-full flex flex-col gap-8">

          {/* Top Section: Full-Width Article Metadata Card */}
          <div className="w-full flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0D274C] to-[#061528] border-2 border-[#FBA832]/30 shadow-2xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBA832]/15 border border-[#FBA832]/35 text-[#FBA832] text-xs font-bold uppercase tracking-wider w-fit">
              <LuShieldCheck className="w-4 h-4" />
              <span>Article Metadata & Publishing Controls</span>
            </div>

            {/* Row 1: Article Title & URL Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Article Title Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <LuFileText className="w-3.5 h-3.5 text-[#FBA832]" />
                  <span>Article Title *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ethiopian Intellectual Property Directives 2026"
                  className="w-full bg-[#061528] border border-slate-700/90 focus:border-[#FBA832] rounded-2xl px-6 py-4 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner font-semibold min-h-[54px]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Custom URL Slug */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <LuSparkles className="w-3.5 h-3.5 text-[#FBA832]" />
                  <span>URL Slug (Auto-Generated)</span>
                </label>
                <input
                  type="text"
                  placeholder="ethiopian-intellectual-property-directives"
                  className="w-full bg-[#061528]/80 border border-slate-800 text-xs text-slate-300 rounded-2xl px-6 py-4 outline-none font-mono min-h-[54px]"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Practice Category, Visibility Status & Publication Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Practice Category Select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <LuTag className="w-3.5 h-3.5 text-[#FBA832]" />
                  <span>Practice Category *</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#061528] border border-slate-700/90 focus:border-[#FBA832] rounded-2xl px-6 py-4 text-sm text-white font-semibold outline-none transition-all shadow-inner cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FBA832%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.5rem_center] bg-no-repeat pr-12 min-h-[54px]"
                >
                  {practiceCategories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-[#061528] text-white py-3 px-4">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Visibility Status Switch */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    {isPublished ? <LuEye className="w-3.5 h-3.5 text-emerald-400" /> : <LuEyeOff className="w-3.5 h-3.5 text-amber-400" />}
                    <span>Visibility Status *</span>
                  </span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs font-bold min-h-[54px] ${
                    isPublished
                      ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/40 shadow-inner"
                      : "bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/40 shadow-inner"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isPublished ? <LuEye className="w-4 h-4 text-emerald-400" /> : <LuEyeOff className="w-4 h-4 text-amber-400" />}
                    <span>{isPublished ? "Publicly Visible" : "Private Draft"}</span>
                  </div>
                  
                  <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${isPublished ? "bg-emerald-500" : "bg-slate-700"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isPublished ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </button>
              </div>

              {/* Publication Date & Time Picker */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <LuCalendar className="w-3.5 h-3.5 text-[#FBA832]" />
                  <span>Publication Date & Time</span>
                </label>
                <input
                  type="datetime-local"
                  className="w-full bg-[#061528] border border-slate-700/90 focus:border-[#FBA832] rounded-2xl px-6 py-4 text-xs text-white outline-none transition-all shadow-inner min-h-[54px] [color-scheme:dark]"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Reading Time & Hero Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              {/* Live Reading Time & Word Count Badge */}
              <div className="p-5 rounded-2xl bg-[#061528] border border-slate-800 flex items-center justify-between min-h-[54px]">
                <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                  <LuClock className="w-4 h-4 text-[#FBA832]" />
                  <span>Calculated Reading Time:</span>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[#FBA832]/20 border border-[#FBA832]/40 text-[#FBA832] text-xs font-bold">
                  {readingTime} ({wordsCount} words)
                </span>
              </div>

              {/* Hero Featured Image Upload */}
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageSelect}
                    className="hidden"
                    id="featured-image-upload"
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className="w-full min-h-[54px] rounded-2xl border-2 border-dashed border-slate-700 hover:border-[#FBA832] bg-[#061528] flex items-center justify-center p-3 cursor-pointer transition-all gap-3 text-center"
                  >
                    {featuredImagePreview ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredImagePreview}
                          alt="Featured Hero"
                          className="w-10 h-10 object-cover rounded-xl border border-slate-700"
                        />
                        <span className="text-xs text-emerald-400 font-bold">Hero Banner Uploaded (Click to Change)</span>
                      </div>
                    ) : (
                      <>
                        <LuImage className="w-5 h-5 text-[#FBA832]" />
                        <span className="text-xs text-slate-300 font-semibold">
                          {isUploadingMedia ? "Uploading to Neon S3..." : "+ Upload Hero Featured Banner (S3 Bucket)"}
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section: Full-Width Markdown Studio & Asset Toolbar */}
          <div className="w-full flex flex-col gap-6">

            {/* Asset Insertion Toolbar */}
            <div className="p-4 px-6 rounded-2xl bg-[#0D274C] border border-[#FBA832]/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#FBA832] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <LuSparkles className="w-4 h-4" />
                <span>Rich Markdown Asset Tools</span>
              </span>

              <div className="flex flex-wrap items-center gap-3">
                {/* Insert Image Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInlineImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingMedia}
                  className="px-4 py-2.5 rounded-xl bg-[#061528] hover:bg-[#085AA3]/50 border border-slate-700 hover:border-[#FBA832] text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md"
                >
                  <LuImage className="w-4 h-4 text-[#FBA832]" />
                  <span>+ Insert Image in Article</span>
                </button>

                {/* Attach PDF / Word Document Button */}
                <input
                  ref={docInputRef}
                  type="file"
                  accept=".pdf, .docx, .doc, .txt"
                  onChange={handleInlineDocUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  disabled={isUploadingMedia}
                  className="px-4 py-2.5 rounded-xl bg-[#061528] hover:bg-[#085AA3]/50 border border-slate-700 hover:border-[#FBA832] text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md"
                >
                  <LuPaperclip className="w-4 h-4 text-[#FBA832]" />
                  <span>+ Attach PDF / Word Doc</span>
                </button>
              </div>
            </div>

            {/* Generated Copyable Snippet Banner */}
            {uploadedSnippet && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-gradient-to-r from-[#061528] via-[#0D274C] to-[#061528] border-2 border-[#FBA832] shadow-2xl flex flex-col gap-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#FBA832] font-bold uppercase tracking-wider">
                    <LuInfo className="w-4 h-4" />
                    <span>
                      {uploadedSnippet.type === "image" ? "Image Snippet Ready" : "Document Snippet Ready"} ({uploadedSnippet.name})
                    </span>
                  </div>
                  <button
                    onClick={() => setUploadedSnippet(null)}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    ✕ Close Banner
                  </button>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed font-sans-body">
                  💡 <strong>Uploaded to Neon S3!</strong> Copy the snippet below and paste it anywhere inside your article text where you want this {uploadedSnippet.type} to appear:
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#0A1D37] border border-slate-700 font-mono text-xs text-amber-300 overflow-x-auto">
                  <code className="whitespace-pre select-all flex-1">{uploadedSnippet.code}</code>

                  <button
                    type="button"
                    onClick={() => handleCopySnippet(uploadedSnippet.code)}
                    className={`px-5 py-2.5 rounded-xl font-sans-body font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all ${
                      copiedSnippet
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-[#FBA832] hover:bg-[#f99b15] text-[#0A1D37] shadow-md hover:scale-105"
                    }`}
                  >
                    {copiedSnippet ? <LuCheck className="w-4 h-4" /> : <LuCopy className="w-4 h-4" />}
                    <span>{copiedSnippet ? "Copied to Clipboard!" : "Copy Snippet"}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Full-Width Markdown Editor Container */}
            <div className="w-full rounded-3xl overflow-hidden border-2 border-[#FBA832]/30 shadow-2xl bg-[#061528] relative" data-color-mode="dark">
              <style jsx global>{`
                .w-md-editor-preview,
                .wmde-markdown {
                  padding: 1.75rem 2rem !important;
                  background-color: #061528 !important;
                }
                .w-md-editor-toolbar {
                  padding: 0.75rem 1.25rem !important;
                  background-color: #0D274C !important;
                  border-bottom: 1px solid rgba(251, 168, 50, 0.25) !important;
                }
              `}</style>
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={650}
                preview="live"
                style={{
                  backgroundColor: "#061528",
                  color: "#fff",
                  borderRadius: "1.5rem",
                }}
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0A1D37] text-white flex flex-col items-center justify-center gap-3">
          <LuRefreshCw className="w-8 h-8 text-[#FBA832] animate-spin" />
          <span className="text-xs uppercase tracking-wider text-[#FBA832] font-semibold">
            Loading Article Studio...
          </span>
        </div>
      }
    >
      <CreatePostStudio />
    </Suspense>
  );
}
