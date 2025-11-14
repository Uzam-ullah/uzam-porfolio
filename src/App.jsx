import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from './components/Header';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import useFetch from './components/hooks/useFetch';
import LoadingScreen from "./components/LoadingScreen";
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Only this line is changed
  const { data, loading, error } = useFetch('/api/blogs?populate=*');

  useEffect(() => {
    const map = {
      '/': 'home',
      '/home': 'home',
      '/about': 'about',
      '/portfolio': 'portfolio',
      '/blog': 'blog',
      '/contact': 'contact',
    };

    const hash = (location.hash || '').replace('#', '');
    let id = hash || map[location.pathname];

    if (!id && location.pathname.startsWith('/blog')) {
      id = 'blog';
    }
    if (!id) id = 'home';

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setTimeout(() => {
        const delayed = document.getElementById(id);
        if (delayed) delayed.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }

    if (location.pathname.startsWith('/blog/')) {
      // Keep blog slug URL
    } else {
      const newPath = id === 'home' ? '/' : `/${id}`;
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: true });
      }
    }

    if (location.pathname.startsWith('/blog/') && id === 'blog') {
      const slug = location.pathname.split('/').pop();
      const formattedSlug = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      document.title = formattedSlug;
    } else {
      document.title = id.charAt(0).toUpperCase() + id.slice(1);
    }
  }, [location.pathname, location.hash, navigate]);

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <>
      <Header />
      <main>
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="portfolio"><Portfolio /></section>
        <section id="blog"><Blog data={data} /></section>
        <section id="contact"><Contact /></section>
      </main>
    </>
  );
}

export default App;
