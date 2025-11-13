import React, { useEffect } from "react";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getCategoryIcon } from "./Blog";

const BlogDetailPage = ({ post, onClose }) => {
  // Lock scroll when modal is open
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

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ----- Normalize Strapi body blocks and Section component data -----
  const getBodyContent = (post) => {
    // Recursively extract text from many possible nested shapes used by Strapi
    const extractTextRecursive = (node) => {
      if (node == null) return "";
      if (typeof node === "string") return node;
      if (typeof node === "number" || typeof node === "boolean") return String(node);
      if (typeof node.text === "string") return node.text;

      // If node has children/content/blocks arrays, recurse into them
      const arrays = ["children", "content", "blocks", "data"];
      for (const key of arrays) {
        if (Array.isArray(node[key])) {
          return node[key].map((ch) => extractTextRecursive(ch)).filter(Boolean).join("\n");
        }
      }

      // If node itself is an array
      if (Array.isArray(node)) return node.map((n) => extractTextRecursive(n)).filter(Boolean).join("\n");

      // If node has attributes (Strapi v4 shape), try that
      if (node.attributes) return extractTextRecursive(node.attributes);

      return "";
    };

    // --- START OF CORRECTION ---

    // 1. Get the intro from the 'excerpt' field.
    // Your screenshots and JSON data show the intro paragraph is in 'post.excerpt'.
    const intro = extractTextRecursive(post?.excerpt).trim();

    // 2. Initialize sections array
    const sections = [];

    // List of candidate paths where repeatable Section components may be stored
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
        // This post uses the 'Section' component structure.
        const mappedSections = cand.map((section) => {
          const heading = section.heading || section.title || section.name || extractTextRecursive(section.label) || "";
          
          // This will extract all text from the 'content' field, joining paragraphs with \n
          const content = extractTextRecursive(section.content || section || section.children || "");

          return { heading: heading.trim(), content: content.trim() };
        });
        
        sections.push(...mappedSections);
        break; // Found the sections, no need to check other candidates
      }
    }

    // 3. Return BOTH the intro and the sections.
    // Your original code was returning an empty intro.
    return { intro, sections };
    
    // --- END OF CORRECTION ---
  };

  const { intro, sections } = getBodyContent(post);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 text-black dark:text-white transition-all duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-white dark:bg-slate-950"
        aria-hidden="true"
      />

      {/* --- START OF IMAGE STYLING CORRECTION --- */}

      {/* Scrollable content (with subtle pt-2) */}
      <div className="relative z-10 w-full h-full overflow-y-auto bg-white dark:bg-slate-950 pt-2">
        {/* Cover image and back button */}
        {post?.coverImage && (
          // 1. Image container is transparent
          // Added px-4 for horizontal padding so shadow isn't cut off
          <div className="relative w-full overflow-hidden px-4">
            <img
              src={post.coverImage}
              alt={post.title}
              // 2. Image styling:
              // - object-contain: "proper fit"
              // - shadow-md: "small shadow"
              // - border: "add border"
              // - rounded-lg: to make shadow/border look good
              className="w-full h-auto max-h-80 object-contain object-center shadow-md rounded-lg "
            />

            {/* 3. Tag moved to BOTTOM-CENTER */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-white bg-blue-400 shadow-md">
                {getCategoryIcon(post?.category)}
                {post?.category}
              </span>
            </div>

            {/* 4. "Back" button remains at TOP-LEFT */}
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
      {/* --- END OF IMAGE STYLING CORRECTION --- */}


        {/* Article content */}
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-14">
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

          {/* --- START OF RENDER CORRECTION --- */}
          <article className="prose prose-lg dark:prose-invert max-w-none text-left leading-relaxed">
            {/* This block now splits your intro text into separate <p> tags */}
            {intro && (
              <div className="mb-12">
                {intro
                  .split(/\r?\n{1,}/) // Split by newlines
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i} className="text-lg mb-6 text-gray-800 dark:text-gray-200 leading-relaxed">
                      {para}
                    </p>
                  ))}
              </div>
            )}

            {/* This block now renders sections and splits their content into separate <p> tags */}
            {sections.length > 0 && sections.map((section, idx) => (
              <section key={idx} className="mb-12">
                {/* Using styles that match your screenshot better */}
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {section.heading}
                </h2>

                <div className="space-y-4">
                  {(section.content || "")
                    .split(/\r?\n{1,}/) // Split by newlines
                    .filter(Boolean)
                    .map((para, pIdx) => (
                      <p key={pIdx} className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                        {para}
                      </p>
                    ))}
                </div>
              </section>
            ))}

            {/* Fallback for simple string body */}
            {intro.length === 0 && sections.length === 0 && typeof post?.body === "string" && (
              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{post.body}</p>
            )}

            <div className="mt-12 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-md italic text-gray-700 dark:text-gray-200">
              Thanks for reading — if you found this helpful, consider sharing it!
            </div>
          </article>
          {/* --- END OF RENDER CORRECTION --- */}


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
              {/* STRAY TAG REMOVED FROM HERE */}
              </p>
            </div>
          </div>

          {/* Bottom Go Back button */}
          <div className="mt-12 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow-lg transition-all duration-300 outline-none focus:outline-none active:outl"
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