"use client";

import React from "react";
import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

interface Props {
  content: string;
}

export default function ArticleContentRenderer({ content }: Props) {
  return (
    <div
      className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-b from-[#0D274C]/90 via-[#081B35]/90 to-[#061528]/90 border-2 border-[#FBA832]/25 shadow-2xl backdrop-blur-xl relative"
      data-color-mode="dark"
    >
      <style jsx global>{`
        .wmde-markdown {
          background-color: transparent !important;
          color: #e2e8f0 !important;
          font-family: inherit !important;
          font-size: 1.05rem !important;
          line-height: 1.85 !important;
        }
        .wmde-markdown h2 {
          font-family: var(--font-serif), Georgia, serif !important;
          color: #ffffff !important;
          border-bottom: 2px solid rgba(251, 168, 50, 0.3) !important;
          padding-bottom: 0.5rem !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          font-size: 1.75rem !important;
          font-weight: 700 !important;
        }
        .wmde-markdown h3 {
          font-family: var(--font-serif), Georgia, serif !important;
          color: #fba832 !important;
          margin-top: 1.75rem !important;
          margin-bottom: 0.75rem !important;
          font-size: 1.35rem !important;
          font-weight: 700 !important;
        }
        .wmde-markdown blockquote {
          border-left: 4px solid #fba832 !important;
          background-color: rgba(6, 21, 40, 0.7) !important;
          padding: 1.25rem 1.5rem !important;
          border-radius: 0.75rem !important;
          color: #cbd5e1 !important;
          margin: 1.5rem 0 !important;
        }
        .wmde-markdown table {
          width: 100% !important;
          background-color: #061528 !important;
          border-radius: 0.75rem !important;
          border: 1px solid rgba(251, 168, 50, 0.3) !important;
          overflow: hidden !important;
          margin: 1.5rem 0 !important;
        }
        .wmde-markdown th {
          background-color: #0d274c !important;
          color: #fba832 !important;
          padding: 0.85rem 1rem !important;
          font-weight: 700 !important;
        }
        .wmde-markdown td {
          padding: 0.85rem 1rem !important;
          border-top: 1px solid #1e293b !important;
        }
        .wmde-markdown img {
          border-radius: 1rem !important;
          border: 1px solid rgba(251, 168, 50, 0.3) !important;
          margin: 1.5rem 0 !important;
          max-height: 450px !important;
          object-fit: cover !important;
        }
        .wmde-markdown a {
          color: #fba832 !important;
          text-decoration: underline !important;
          font-weight: 600 !important;
        }
      `}</style>

      {MarkdownPreview ? (
        <MarkdownPreview source={content} />
      ) : (
        <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}
