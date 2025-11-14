import { useState, useEffect } from "react";

const useFetch = (url) => { 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Get the base URL from environment variable
                const baseURL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
                
                // Combine base URL with the endpoint
                const fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;
                
                const res = await fetch(fullURL);
                const json = await res.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;