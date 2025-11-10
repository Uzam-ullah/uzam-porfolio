import profileBlog from "../assets/images/blogPng/profileBlog.png";
import brainwaveBlog from "../assets/images/blogPng/brainwaveblog.png";
import weatherBlog from "../assets/images/blogPng/weatherBlog.png";
import websocketsBlog from "../assets/images/blogPng/websocketsBlog.png";
import searchBlog from "../assets/images/blogPng/searchBlog.png";
import learningBlog from "../assets/images/blogPng/learningBlog.jpeg"; 
// Add local images by replacing coverImage URLs with imports/requires if you want.

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
    body: {
      intro: "Building my portfolio was something I kept postponing, but after completing Ideal Trip and Brainwave AI, I knew it was time to create a proper showcase for my work. I wanted a clean, modern design that highlights my projects without being too flashy.",
      sections: [
        {
          heading: "Choosing the Tech Stack",
          content: "I used React for the component structure and Tailwind CSS for styling because I was now comfortable with both. React's component-based architecture allowed me to build reusable pieces, while Tailwind's utility classes made styling fast and consistent."
        },
        {
          heading: "Design Iterations",
          content: "The hero section took the most time—I went through countless iterations trying to get the right balance between professional and personal. I wanted visitors to immediately understand who I am and what I do, while also getting a sense of my personality."
        },
        {
          heading: "Key Sections",
          content: "I created separate sections for projects, skills, and a blog to share my learning experiences. Each project card shows a screenshot, description, tech stack, and links to live demo and GitHub. The contact form uses Formspree so I didn't need a backend."
        },
        {
          heading: "Responsive Design",
          content: "The responsive design was easier this time since I learned from Brainwave AI—mobile-first approach from the start. I tested on multiple devices and screen sizes to ensure everything looked perfect."
        },
        {
          heading: "Deployment",
          content: "I deployed it on Vercel which was incredibly smooth. The automatic deployments from GitHub made iterating on the design effortless. Looking at the final result, I'm proud to see how far I've come from my first React project back in November 2024."
        }
      ]
    },
    coverImage:profileBlog ,
    featured: true,
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
    body: {
      intro: "The Brainwave AI project was exciting because it gave me a chance to focus purely on creating a beautiful, responsive UI. I wanted something that looked professional and modern—inspired by current AI chat interfaces but with my own touch.",
      sections: [
        {
          heading: "Layout Challenges",
          content: "The main challenge was the layout: a sidebar for navigation on desktop that transforms into a bottom nav on mobile, and a chat interface that feels smooth and natural. I spent a lot of time on the gradient backgrounds and smooth transitions."
        },
        {
          heading: "Animation Details",
          content: "The chat bubbles, message animations, and the typing indicator were particularly fun to implement. I used CSS animations and React transitions to create a fluid experience that feels responsive and alive."
        },
        {
          heading: "Learning Responsive Design",
          content: "I learned so much about Tailwind's responsive utilities (sm:, md:, lg:, xl:) and how to think mobile-first. Testing on my actual phone revealed issues I never caught in Chrome DevTools—buttons too small, spacing off, text hard to read."
        },
        {
          heading: "Dark Mode Implementation",
          content: "I also added dark mode using Tailwind's dark: prefix which was easier than I expected. This project really leveled up my UI/UX skills and confidence in building responsive interfaces."
        }
      ]
    },
    coverImage: brainwaveBlog ,
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
    body: {
      intro: "After Ideal Trip, I wanted to practice working with external APIs in a simpler project. I built a weather dashboard that fetches real-time weather data and displays it with nice visuals.",
      sections: [
        {
          heading: "API Integration",
          content: "I used the OpenWeather API which has good free tier. The main challenge was understanding how to properly fetch data in React—I learned about useEffect and how to handle loading states and errors."
        },
        {
          heading: "Common Mistakes",
          content: "At first, I was making API calls on every render which was terrible. Then I learned about the dependency array in useEffect. Handling the JSON response and extracting the data I needed took some trial and error."
        },
        {
          heading: "Error Handling",
          content: "Error handling was important—what if the API is down or the city name is wrong? I used try-catch blocks and showed user-friendly error messages. This made the app feel much more professional."
        },
        {
          heading: "UI Features",
          content: "The UI shows temperature, humidity, wind speed, and a 5-day forecast with icons. Styling was done with Tailwind and I made sure it's fully responsive. This project taught me a lot about working with external data and managing async operations."
        }
      ]
    },
    coverImage: weatherBlog ,
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
    body: {
      intro: "After submitting Ideal Trip as our final year project in May, I kept working on it to add more features. One major addition was real-time notifications—hosts should know immediately when someone books their property.",
      sections: [
        {
          heading: "Choosing Socket.io",
          content: "I researched and decided to use Socket.io for WebSockets. Setting up the server-side was new territory for me. I had to create a socket server alongside my Express API and handle connections, disconnections, and broadcasting messages."
        },
        {
          heading: "Frontend Implementation",
          content: "On the frontend, I used the socket.io-client library to connect and listen for events. When a booking is created, the server emits an event that the host's browser receives instantly, showing a notification."
        },
        {
          heading: "Live Updates",
          content: "I also added live availability updates—if someone is viewing a property and another user books it, the first user sees the availability change in real-time. This required careful state management and synchronization."
        },
        {
          heading: "Memory Management",
          content: "The hardest part was managing socket connections properly and avoiding memory leaks. I learned about useEffect cleanup functions to disconnect sockets when components unmount. Testing was tricky—I had to open multiple browser windows and test different scenarios."
        }
      ]
    },
    coverImage: websocketsBlog ,
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
    body: {
      intro: "Our final year project was submitted in May, but I wasn't done with Ideal Trip. I had a list of improvements I wanted to make based on user feedback and my own observations.",
      sections: [
        {
          heading: "Search Functionality",
          content: "First was the search functionality—users needed to filter listings by price range, location, number of guests, and amenities like WiFi or parking. I added filter dropdowns in the search bar and connected them to MongoDB queries."
        },
        {
          heading: "Database Queries",
          content: "Learning MongoDB's query operators ($gte, $lte, $in, $regex) was important. Combining multiple filters into one efficient query took some experimentation. I had to balance query performance with flexibility."
        },
        {
          heading: "UI Improvements",
          content: "I also improved the UI based on feedback—made the booking button more prominent, added clearer pricing information, and improved the image gallery for listings. The loading states were janky before, so I added proper skeleton screens and loading spinners."
        },
        {
          heading: "Bug Fixes",
          content: "I fixed several bugs: date validation to prevent booking past dates, better error messages, and preventing double submissions on the booking form. I also added pagination for search results because loading everything at once was slow."
        },
        {
          heading: "Lessons Learned",
          content: "Working on this after submission, without deadline pressure, helped me focus on quality and user experience. It taught me that building the initial version is just the beginning—refinement and iteration are where the real learning happens."
        }
      ]
    },
    coverImage: searchBlog ,
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
    body: {
      intro: "November 2024 was when I decided to seriously learn React. I had basic JavaScript knowledge but React felt like a completely different world. Components, props, state, hooks—everything was new and overwhelming.",
      sections: [
        {
          heading: "Starting Out",
          content: "I started with YouTube tutorials and online courses, building small projects like todo lists and calculators. The concept of components made sense quickly, but state management confused me for weeks."
        },
        {
          heading: "Common Struggles",
          content: "I remember spending hours debugging why my counter wasn't updating, only to realize I was mutating state directly instead of using setState. Understanding when and why to use useState, useEffect, and other hooks took time and lots of practice."
        },
        {
          heading: "Learning from Mistakes",
          content: "I made every beginner mistake possible—infinite loops in useEffect, forgetting dependency arrays, props vs state confusion. But each bug taught me something valuable. The frustration was real, but so was the learning."
        },
        {
          heading: "First Big Project",
          content: "By December, I was comfortable enough to start thinking about a bigger project. That's when we began planning Ideal Trip for our final year project. Moving from small tutorials to a real application was a huge leap."
        },
        {
          heading: "Advice for Beginners",
          content: "Looking back, those early confusing days were crucial. They taught me to read documentation, debug systematically, and not give up when things don't work. React seemed impossible at first, but consistent practice and building real projects made it click. If you're starting out, be patient with yourself and keep building—it gets easier."
        }
      ]
    },
    coverImage: learningBlog ,
  },
];

export default posts;
