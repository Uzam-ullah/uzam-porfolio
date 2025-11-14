import { useState, useEffect } from "react";

const useFetch = (url) => { 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use environment variable for base URL
        const baseURL = import.meta.env.VITE_STRAPI_URL;
        const fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;
        
        console.log('Fetching from:', fullURL); // DEBUG

        const res = await fetch(fullURL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch error:', err); // DEBUG
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
