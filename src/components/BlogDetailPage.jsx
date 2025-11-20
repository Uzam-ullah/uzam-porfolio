import React, { useEffect } from "react";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getCategoryIcon } from "./Blog";
import { useNavigate, useLocation } from "react-router-dom";

// Added HeaderComponent prop (already there)
const BlogDetailPage = ({ post, onClose, HeaderComponent }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lock scroll when modal is open
  useEffect(() => {
    const scrollY = window.scrollY || 0;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0)
      document.body.style.paddingRight = `${scrollbarWidth}px`;

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
      document.documentElement.style.scrollBehavior =
        prevScrollBehavior || "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ----- Normalize Strapi body blocks and Section component data -----
  const getBodyContent = (post) => {
    const extractTextRecursive = (node) => {
      if (node == null) return "";
      if (typeof node === "string") return node;
      if (typeof node === "number" || typeof node === "boolean")
        return String(node);
      if (typeof node.text === "string") return node.text;

      const arrays = ["children", "content", "blocks", "data"];
      for (const key of arrays) {
        if (Array.isArray(node[key])) {
          return node[key]
            .map((ch) => extractTextRecursive(ch))
            .filter(Boolean)
            .join("\n");
        }
      }

      if (Array.isArray(node))
        return node
          .map((n) => extractTextRecursive(n))
          .filter(Boolean)
          .join("\n");

      if (node.attributes) return extractTextRecursive(node.attributes);

      return "";
    };

    const intro = extractTextRecursive(post?.excerpt).trim();

    const sections = [];
    const candidates = [
      post?.Section,
      post?.section,
      post?.sections,
      post?.Sections,
      post?.attributes?.Section,
      post?.attributes?.section,
      post?.attributes?.sections,
      post?.data?.attributes?.Section,
      post?.data?.attributes?.sections,
      post?.data?.attributes?.section,
    ];

    for (const cand of candidates) {
      if (Array.isArray(cand) && cand.length > 0) {
        const mappedSections = cand.map((section) => {
          const heading =
            section.heading ||
            section.title ||
            section.name ||
            extractTextRecursive(section.label) ||
            "";

          const content = extractTextRecursive(
            section.content || section || section.children || ""
          );

          return { heading: heading.trim(), content: content.trim() };
        });

        sections.push(...mappedSections);
        break;
      }
    }

    return { intro, sections };
  };

  const { intro, sections } = getBodyContent(post);

  // Auto-close on browser Back/Forward when leaving /blog/:slug
  useEffect(() => {
    if (!location.pathname.startsWith("/blog/")) {
      // If user went back to /blog (list) or elsewhere, close modal
      onClose?.({ viaHistory: true });
    }
  }, [location.pathname, onClose]);

  const handleHeaderNavigate = (targetPath, id) => {
    try { onClose?.({ viaHeader: true }); } catch {}
    setTimeout(() => {
      navigate(targetPath); // push, not replace
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }, 0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 text-black dark:text-white transition-all duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-white dark:bg-slate-950" aria-hidden="true" />

      <div className="relative z-10 w-full h-full overflow-y-auto bg-white dark:bg-slate-950 pt-2">
        {/* STICKY HEADER */}
        {HeaderComponent ? (
          <>
            <div className="sticky top-0 z-50 bg-white dark:bg-slate-950 shadow-sm">
              <HeaderComponent neutral onNavigate={handleHeaderNavigate} />
            </div>
            {/* Spacer to ensure page content renders below the fixed header */}
            <div aria-hidden="true" className="h-16" />
          </>
        ) : null}

        {/* Cover image */}
        {post?.coverImage && (
          <div className="relative w-full overflow-hidden px-4">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto max-h-80 object-contain object-center shadow-md rounded-lg "
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-blue-400 shadow-md">
                {getCategoryIcon(post?.category)}
                {post?.category}
              </span>
            </div>
            <div className="absolute top-4 left-4">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-none bg-blue-400 hover:bg-blue-500 transition text-white shadow-sm outline-none focus:outline-none active:outline-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </button>
            </div>
          </div>
        )}

        {/* Article content */}
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            {post?.title}
          </h1>

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

          <article className="prose prose-lg dark:prose-invert max-w-none text-left leading-relaxed">
            {intro && (
              <div className="mb-12">
                {intro
                  .split(/\r?\n{1,}/)
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      className="text-lg mb-6 text-gray-800 dark:text-gray-200 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            )}

            {sections.length > 0 &&
              sections.map((section, idx) => (
                <section key={idx} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    {section.heading}
                  </h2>

                  <div className="space-y-4">
                    {(section.content || "")
                      .split(/\r?\n{1,}/)
                      .filter(Boolean)
                      .map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                        >
                          {para}
                        </p>
                      ))}
                  </div>
                </section>
              ))}

            {intro.length === 0 &&
              sections.length === 0 &&
              typeof post?.body === "string" && (
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {post.body}
                </p>
              )}

            <div className="mt-12 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-md italic text-gray-700 dark:text-gray-200">
              Thanks for reading — if you found this helpful, consider sharing it!
            </div>
          </article>

          <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800 flex items-start gap-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold"
              style={{
                background: "linear-gradient(135deg,#3b82f6,#6366f1)",
              }}
            >
              {post?.author?.[0] || "U"}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post?.author}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Frontend Developer — sharing insights, design patterns, and dev
                practices.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow-lg transition-all duration-300 outline-none"
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
