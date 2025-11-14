import { useState, useEffect } from "react";

const useFetch = (url) => { 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Hardcode for testing
                const baseURL = 'https://giving-excitement-72c292e9c9.strapiapp.com';
                const fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;
                
                console.log('Fetching from:', fullURL); // DEBUG
                
                const res = await fetch(fullURL);
                const json = await res.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err); // DEBUG
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;