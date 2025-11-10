import React, { useEffect, useState } from "react";
import { Calendar, Clock, ArrowRight, Code2, Layers, ArrowLeft } from "lucide-react";
import posts from "../components/Posts.jsx";
import BlogDetailPage from "../components/BlogDetailPage.jsx";
/* ---------- posts (your data kept intact) ---------- */


/* ---------- helper ---------- */
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



/* ---------- BlogCard (keeps grid behavior) ---------- */
const BlogCard = ({ post, onRead }) => {
  return (
    <article
      onClick={() => onRead(post)}
      className="rounded-2xl overflow-hidden transition-all duration-300 transform group border border-gray-200 dark:border-gray-800 bg-transparent flex flex-col h-full cursor-pointer hover:shadow-xl hover:-translate-y-1"
      aria-labelledby={`post-${post.id}-title`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70 mb-2">
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
          className="text-lg font-bold mb-2 text-black dark:text-white transition-colors line-clamp-2"
        >
          {post.title}
        </h3>

        <p className="text-sm mb-4 leading-relaxed text-black/85 dark:text-white/85 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="text-sm text-black/70 dark:text-white/70">By {post.author}</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent outer onClick duplication
              onRead(post);
            }}
            className="text-blue-400 font-semibold text-sm hover:text-blue-500 transition-colors bg-transparent outline-none focus:outline-none hover:outline-none underline underline-offset-4 border-none hover:border-none active:outline-none flex items-center gap-1"
            aria-label={`Read more about ${post.title}`}
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

/* ---------- Main Blog component ---------- */
const Blog = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filteredPosts = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 3);

  // make sure background content cannot be tabbed into when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.documentElement.style.scrollBehavior = "auto";
    } else {
      document.documentElement.style.removeProperty("scroll-behavior");
    }
  }, [selectedPost]);

  return (
    <section id="blog" className="w-full py-20 md:py-28 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white">
            Stories From My <span className="text-blue-400">Dev Journey</span>
          </h2>

          <p className="text-lg text-black/80 dark:text-white/80">
            Real projects, real challenges, real solutions. Deep dives into web development, UI/UX, and everything I'm learning along the way.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-400 text-white shadow-sm"
                  : "bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-400"
              } focus:outline-none focus:ring-0`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {displayedPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onRead={(p) => setSelectedPost(p)}
            />
          ))}
        </div>

        {filteredPosts.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 text-sm sm:text-base rounded-full bg-blue-400 text-white font-medium shadow hover:bg-blue-500 hover:text-white focus:outline-none gap-2 group"
              aria-expanded={showAll}
            >
              {showAll ? "Show Less" : `See More (${filteredPosts.length - 3} more)`}
              <ArrowRight className={`w-5 h-5 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}
      </div>

      {/* Modal: only render when a post is selected */}
      {selectedPost && (
        <BlogDetailPage
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
};

export default Blog;