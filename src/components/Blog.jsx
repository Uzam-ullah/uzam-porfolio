import React, { useState } from "react";

/**
 * Portfolio Blog section
 * - Shows 3 cards by default (desktop) and reveals the rest on "View all posts" click
 * - Posts are realistic, structured entries related to the user's projects (Ideal Trip, Brainwave UI, etc.)
 * - No external links or images included
 */

const posts = [
  {
    id: 1,
    date: "October 28, 2025",
    title: "Building My Portfolio: Showcasing My Journey as a Developer",
    author: "Uzam",
    readTime: "5 min",
    category: "Portfolio",
    tags: ["React", "Tailwind", "Portfolio"],
    excerpt:
      "After completing several projects, I finally built my portfolio website to showcase my work. Here's how I designed and developed it from scratch.",
    body:
      "Building my portfolio was something I kept postponing, but after completing Ideal Trip and Brainwave AI, I knew it was time to create a proper showcase for my work. I wanted a clean, modern design that highlights my projects without being too flashy. I used React for the component structure and Tailwind CSS for styling because I was now comfortable with both. The hero section took the most time—I went through countless iterations trying to get the right balance between professional and personal. I created separate sections for projects, skills, and a blog to share my learning experiences. Each project card shows a screenshot, description, tech stack, and links to live demo and GitHub. The contact form uses Formspree so I didn't need a backend. The responsive design was easier this time since I learned from Brainwave AI—mobile-first approach from the start. I deployed it on Vercel which was incredibly smooth. Looking at the final result, I'm proud to see how far I've come from my first React project back in November 2024.",
  },
  {
    id: 2,
    date: "September 25, 2025",
    title: "Creating Brainwave AI: Building a Modern Responsive Interface",
    author: "Uzam",
    readTime: "6 min",
    category: "UI Design",
    tags: ["React", "Tailwind", "Responsive"],
    excerpt:
      "Brainwave AI needed a sleek, modern interface that works perfectly across all devices. Here's how I built it with React and Tailwind CSS.",
    body:
      "The Brainwave AI project was exciting because it gave me a chance to focus purely on creating a beautiful, responsive UI. I wanted something that looked professional and modern—inspired by current AI chat interfaces but with my own touch. I used React for component architecture and Tailwind CSS for all the styling. The main challenge was the layout: a sidebar for navigation on desktop that transforms into a bottom nav on mobile, and a chat interface that feels smooth and natural. I spent a lot of time on the gradient backgrounds, smooth transitions, and making sure every element responds perfectly to different screen sizes. The chat bubbles, message animations, and the typing indicator were particularly fun to implement. I learned so much about Tailwind's responsive utilities (sm:, md:, lg:, xl:) and how to think mobile-first. Testing on my actual phone revealed issues I never caught in Chrome DevTools—buttons too small, spacing off, text hard to read. I also added dark mode using Tailwind's dark: prefix which was easier than I expected. This project really leveled up my UI/UX skills and confidence in building responsive interfaces.",
  },
  {
    id: 3,
    date: "August 12, 2025",
    title: "Building a Weather Dashboard: Working with External APIs",
    author: "Uzam",
    readTime: "4 min",
    category: "Side Project",
    tags: ["React", "API", "JavaScript"],
    excerpt:
      "I built a weather dashboard to practice working with external APIs. Here's what I learned about fetch, async/await, and handling API responses.",
    body:
      "After Ideal Trip, I wanted to practice working with external APIs in a simpler project. I built a weather dashboard that fetches real-time weather data and displays it with nice visuals. I used the OpenWeather API which has good free tier. The main challenge was understanding how to properly fetch data in React—I learned about useEffect and how to handle loading states and errors. At first, I was making API calls on every render which was terrible. Then I learned about the dependency array in useEffect. Handling the JSON response and extracting the data I needed took some trial and error. I also added a search feature where users can type any city name and get weather info. Error handling was important—what if the API is down or the city name is wrong? I used try-catch blocks and showed user-friendly error messages. The UI shows temperature, humidity, wind speed, and a 5-day forecast with icons. Styling was done with Tailwind and I made sure it's fully responsive. This project taught me a lot about working with external data, managing async operations, and thinking about edge cases.",
  },
  {
    id: 4,
    date: "July 05, 2025",
    title: "Adding Real-Time Features to Ideal Trip: WebSockets and Notifications",
    author: "Uzam",
    readTime: "5 min",
    category: "Feature Development",
    tags: ["Node.js", "WebSockets", "Real-time"],
    excerpt:
      "I added real-time booking notifications and live availability updates to Ideal Trip using WebSockets. Here's how I implemented it.",
    body:
      "After submitting Ideal Trip as our final year project in May, I kept working on it to add more features. One major addition was real-time notifications—hosts should know immediately when someone books their property. I researched and decided to use Socket.io for WebSockets. Setting up the server-side was new territory for me. I had to create a socket server alongside my Express API and handle connections, disconnections, and broadcasting messages. On the frontend, I used the socket.io-client library to connect and listen for events. When a booking is created, the server emits an event that the host's browser receives instantly, showing a notification. I also added live availability updates—if someone is viewing a property and another user books it, the first user sees the availability change in real-time. The hardest part was managing socket connections properly and avoiding memory leaks. I learned about useEffect cleanup functions to disconnect sockets when components unmount. Testing was tricky—I had to open multiple browser windows and test different scenarios. This feature made Ideal Trip feel much more professional and responsive.",
  },
  {
    id: 5,
    date: "June 10, 2025",
    title: "Improving Ideal Trip: Search Filters and User Experience",
    author: "Uzam",
    readTime: "5 min",
    category: "Project Journey",
    tags: ["React", "MongoDB", "UX"],
    excerpt:
      "After our project submission, I spent time refining Ideal Trip—adding better search filters, improving UI, and fixing bugs based on user feedback.",
    body:
      "Our final year project was submitted in May, but I wasn't done with Ideal Trip. I had a list of improvements I wanted to make. First was the search functionality—users needed to filter listings by price range, location, number of guests, and amenities like WiFi or parking. I added filter dropdowns in the search bar and connected them to MongoDB queries. Learning MongoDB's query operators ($gte, $lte, $in, $regex) was important. Combining multiple filters into one efficient query took some experimentation. I also improved the UI based on feedback—made the booking button more prominent, added clearer pricing information, and improved the image gallery for listings. The loading states were janky before, so I added proper skeleton screens and loading spinners. I fixed several bugs: date validation to prevent booking past dates, better error messages, and preventing double submissions on the booking form. I also added pagination for search results because loading everything at once was slow. Working on this after submission, without deadline pressure, helped me focus on quality and user experience. It taught me that building the initial version is just the beginning—refinement and iteration are where the real learning happens.",
  },
  {
    id: 6,
    date: "November 20, 2024",
    title: "My React Journey: Starting from Scratch in Late 2024",
    author: "Uzam",
    readTime: "5 min",
    category: "Learning",
    tags: ["React", "JavaScript", "Learning"],
    excerpt:
      "I started learning React in November 2024 with no prior experience. Here's how I went from complete confusion to building real projects.",
    body:
      "November 2024 was when I decided to seriously learn React. I had basic JavaScript knowledge but React felt like a completely different world. Components, props, state, hooks—everything was new and overwhelming. I started with YouTube tutorials and online courses, building small projects like todo lists and calculators. The concept of components made sense quickly, but state management confused me for weeks. I remember spending hours debugging why my counter wasn't updating, only to realize I was mutating state directly instead of using setState. Understanding when and why to use useState, useEffect, and other hooks took time and lots of practice. I made every beginner mistake possible—infinite loops in useEffect, forgetting dependency arrays, props vs state confusion. But each bug taught me something valuable. By December, I was comfortable enough to start thinking about a bigger project. That's when we began planning Ideal Trip for our final year project. Looking back, those early confusing days were crucial. They taught me to read documentation, debug systematically, and not give up when things don't work. React seemed impossible at first, but consistent practice and building real projects made it click. If you're starting out, be patient with yourself and keep building—it gets easier.",
  },
];

const Tag = ({ children }) => (
  <span className="inline-block text-xs font-medium px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-400 dark:text-blue-400">
    {children}
  </span>
);

const BlogCard = ({ post }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.date} • {post.readTime}</p>
            <p className="text-xs uppercase tracking-wider mt-1 text-gray-400 dark:text-gray-500">{post.category}</p>
          </div>

          <div className="flex gap-2 flex-wrap justify-end">
            {post.tags.slice(0, 3).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{post.excerpt}</p>

        {/* expandable body */}
        <div
          className={`prose max-w-none text-gray-700 dark:text-gray-300 text-sm leading-relaxed transition-[max-height] duration-300 overflow-hidden ${open ? "max-h-[2000px] mt-2" : "max-h-0"}`}
          aria-hidden={!open}
        >
          <p>{post.body}</p>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setOpen((s) => !s)}
            className="text-white bg-blue-400 hover:bg-blue-500 font-medium  text-sm outline-none focus:outline-none active:outline-none px-3 py-1.5 rounded-md transition-colors"
            aria-expanded={open}
          >
            {open ? "Read less" : "Read more"}
          </button>

          <span className="text-xs text-gray-400 dark:text-gray-500">By {post.author}</span>
        </div>
      </div>
    </article>
  );
};

const Blog = () => {
  const [showAll, setShowAll] = useState(false);

  // By default show first 3 posts (desktop expectation). "View all" reveals the rest.
  const displayedPosts = showAll ? posts : posts.slice(0, 3);

  return (
    <section id="blog" className="w-full py-20 md:py-28 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        {/* header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            From My <span className="text-blue-400 dark:text-blue-400">{'{dev}'} Blog</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Practical write-ups and lessons learned from building production apps—focused on frontend engineering, product and design.
          </p>
        </div>

        {/* grid: 1 column on very small, 2 on sm, 3 on lg */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* view all button */}
        {!showAll && posts.length > 3 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="text-blue-400 dark:text-blue-400 font-medium text-sm hover:text-blue-500 dark:hover:text-blue-500 transition-colors bg-transparent border-none outline-none underline underline-offset-4 focus:outline-none active:outline-none"
              aria-label={`View all posts (${posts.length - 3} more)`}
            >
              View all posts ({posts.length - 3} more) →
            </button>
          </div>
        )}

        {/* collapse button when showing all */}
        {showAll && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="text-blue-400 dark:text-blue-400 font-medium text-sm hover:text-blue-500 dark:hover:text-blue-500 transition-colors bg-transparent border-none outline-none underline underline-offset-4 focus:outline-none active:outline-none"
              aria-label="Show fewer posts"
            >
              Show fewer posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;