import React, { useEffect } from "react";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getCategoryIcon } from "./Blog";

const BlogDetailPage = ({ post, onClose }) => {
  useEffect(() => {
    const scrollY = window.scrollY || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("left");
      document.body.style.removeProperty("right");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("padding-right");
      document.documentElement.style.scrollBehavior = prevScrollBehavior || "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const intro = post?.body && typeof post.body === "object" ? post.body.intro || "" : (typeof post?.body === "string" ? post.body : "");
  const sections = post?.body && typeof post.body === "object" ? post.body.sections || [] : [];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 text-black dark:text-white transition-all duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Background overlay - fully opaque */}
      <div
        className="absolute inset-0 bg-white dark:bg-slate-950"
        aria-hidden="true"
      />

      {/* Scrollable content area */}
      <div className="relative z-10 w-full h-full overflow-y-auto bg-white dark:bg-slate-950">
        {/* Cover image section */}
        {post?.coverImage && (
          <div className="relative w-full h-72 md:h-[28rem] overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full max-h-[450px] object-cover object-center rounded-xl shadow-lg my-6"

            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            {/* Category tag */}
            <div className="absolute top-5 right-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-blue-400 shadow-md">
                {getCategoryIcon(post?.category)}
                {post?.category}
              </span>
            </div>

            {/* Back button */}
            <div className="absolute top-5 left-5">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-none bg-blue-400 hover:bg-blue-500 transition text-white shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </button>
            </div>
          </div>
        )}

        {/* Article content */}
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-14">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            {post?.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post?.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post?.readTime}</span>
            </div>
            <div>•</div>
            <div>By {post?.author}</div>
          </div>

          {/* Body */}
          <article className="prose prose-lg dark:prose-invert max-w-none text-left leading-relaxed">
            {intro && <p className="text-lg mb-6 text-gray-800 dark:text-gray-200">{intro}</p>}
            {sections.length > 0 ? (
              sections.map((section, idx) => (
                <section key={idx} className="mb-10">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{section.heading}</h2>
                  <p className="text-base text-gray-700 dark:text-gray-300">{section.content}</p>
                </section>
              ))
            ) : (
              typeof post?.body === "string" && (
                <p className="text-base text-gray-700 dark:text-gray-300">{post.body}</p>
              )
            )}

            <div className="mt-8 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-md italic text-gray-700 dark:text-gray-200">
              Thanks for reading — if you found this helpful, consider sharing it!
            </div>
          </article>

          {/* Author info */}
          <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800 flex items-start gap-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
            >
              {post?.author?.[0] || "U"}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post?.author}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Frontend Developer — sharing insights, design patterns, and dev practices.
              </p>
            </div>
          </div>

          {/* Bottom Go Back button */}
          <div className="mt-12 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetailPage;