import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Code2, Layers } from "lucide-react";
import BlogDetailPage from "../components/BlogDetailPage.jsx";

/* ---------- Helper: category icon ---------- */
export const getCategoryIcon = (category) => {
  switch (category) {
    case "Portfolio":
      return <Layers className="w-4 h-4" />;
    case "UI Design":
      return <Code2 className="w-4 h-4" />;
    case "Feature Development":
      return <ArrowRight className="w-4 h-4" />;
    default:
      return <Code2 className="w-4 h-4" />;
  }
};

/* ---------- BlogCard (STYLES UPDATED) ---------- */
const BlogCard = ({ post, onRead }) => (
  <article
    onClick={() => onRead(post)}
    // 1. Added "group" here
    className="group flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
    aria-labelledby={`post-${post.id}-title`}
  >
    <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-xl">
      <img
        src={post.coverImage}
        alt={post.title}
        // 2. Changed "hover:scale-105" to "group-hover:scale-105"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-400 text-white text-sm font-medium">
          {getCategoryIcon(post.category)}
          {post.category}
        </span>
      </div>
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <div className="flex items-center gap-3 mb-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {post.date}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </span>
      </div>

      <h3
        id={`post-${post.id}-title`}
        className="mt-2 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2"
      >
        {post.title}
      </h3>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex-grow line-clamp-3">
        {post.excerpt}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          By {post.author}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRead(post);
          }}
          className="text-blue-400 border-none hover:border-none font-semibold text-sm hover:text-blue-500 transition-colors bg-transparent outline-none focus:outline-none underline underline-offset-4 flex items-center gap-1"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </article>
);

/* ---------- Main Blog Component (UNCHANGED) ---------- */
const Blog = ({ data }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

 // Get base URL from environment variable
const baseURL = import.meta.env.VITE_STRAPI_URL || 'https://giving-excitement-72c292e9c9.strapiapp.com';


  /* ---------- Helper: Convert rich text blocks to plain text ---------- */
  const getPlainText = (blocks) => {
    if (!blocks) return "";
    if (typeof blocks === "string") return blocks;
    if (!Array.isArray(blocks)) return "";
    return blocks
      .map((block) => block.children?.map((child) => child.text).join("") || "")
      .join("\n");
  };

  /* ---------- Normalize Strapi posts ---------- */
  const sourcePosts = Array.isArray(data?.data)
    ? data.data.map((item) => {
        const attr = item?.attributes ?? item ?? {};

        const rawBody =
          attr.body ||
          attr.Section ||
          attr.section ||
          attr.content ||
          attr.sections ||
          [];

        const strapiBase = (import.meta.env.VITE_STRAPI_URL || "https://giving-excitement-72c292e9c9.strapiapp.com").replace(/\/$/, "");
        const cover =
          attr?.coverImage?.data?.attributes?.url ||
          attr?.coverImage?.url ||
          attr?.image?.data?.attributes?.url;

        let coverImageUrl = "https://via.placeholder.com/400x250?text=No+Image";
        if (typeof cover === "string") {
          coverImageUrl = cover.startsWith("http") ? cover : `${strapiBase}${cover}`;
        }

        return {
          id: item.id,
          title: typeof attr.title === "string" ? attr.title : "Untitled Post",
          excerpt: typeof attr.excerpt === "string" ? attr.excerpt : getPlainText(attr.excerpt),
          category: typeof attr.category === "string" ? attr.category : "General",
          author: typeof attr.author === "string" ? attr.author : "Unknown",
          date: attr.date || "Unknown",
          readTime: attr.readTime || "3 min read",
          coverImage: coverImageUrl,
          body: rawBody,
          Section: rawBody,
        };
      })
    : [];

  const categories = ["All", ...new Set(sourcePosts.map((p) => p.category))];
  const filteredPosts =
    activeCategory === "All"
      ? sourcePosts
      : sourcePosts.filter((p) => p.category === activeCategory);
  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 3);

  const slugify = (text) =>
    String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  /* ---------- Open modal if URL contains slug ---------- */
  useEffect(() => {
    try {
      const match = location.pathname.match(/^\/blog\/(.+)$/);
      if (match && match[1]) {
        const slug = match[1];
        const found = sourcePosts.find((p) => slugify(p.title) === slug);
        if (found) setSelectedPost(found);
      }
    } catch (e) {}
  }, [location.pathname]);

  useEffect(() => {
    if (selectedPost) window.scrollTo(0, 0);
  }, [selectedPost]);

  return (
    <section id="blog" className="w-full py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white">
            Stories From My <span className="text-blue-400">Dev Journey</span>
          </h2>
          <p className="text-lg text-black/80 dark:text-white/80">
            Real projects, real challenges, real solutions. Deep dives into web
            development, UI/UX, and everything I'm learning along the way.
          </p>
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              className={`px-5 py-2.5 rounded-full font-medium   ${
                activeCategory === category
                  ? "bg-blue-400 text-white shadow-sm"
                  : "bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:text-blue-400"
              } focus:outline-none active:outline-none`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {displayedPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onRead={(p) => {
                setSelectedPost(p);
                try {
                  navigate(`/blog/${slugify(p.title)}`);
                } catch {}
              }}
            />
          ))}
        </div>

        {/* Show more button */}
        {filteredPosts.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 text-sm sm:text-base rounded-full bg-blue-400 text-white font-medium shadow hover:bg-blue-500 outline-none active:outline-none hover:text-white focus:outline-none gap-2 group"
              aria-expanded={showAll}
            >
              {showAll
                ? "Show Less"
                : `See More `}
              <ArrowRight
                className={`w-5 h-5  transition-transform ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPost && (
        <BlogDetailPage
          post={selectedPost}
          onClose={() => {
            setSelectedPost(null);
            try {
              navigate("/blog");
            } catch {}
          }}
        />
      )}
    </section>
  );
};

export default Blog;