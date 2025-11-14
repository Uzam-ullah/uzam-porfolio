import { useState, useEffect } from "react";

const useFetch = (url) => { 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Cloud Strapi Base URL
                const baseURL = 'https://giving-excitement-72c292e9c9.strapiapp.com';

                let fullURL = url;

                // Force replace ANY localhost URL
                if (url.includes("localhost") || url.includes("1337")) {
                    fullURL = url.replace("http://localhost:1337", baseURL);
                }
                // If relative URL like "/api/blogs"
                else if (!url.startsWith("http")) {
                    fullURL = `${baseURL}${url}`;
                }

                console.log("Fetching from:", fullURL);

                const res = await fetch(fullURL);
                const json = await res.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
