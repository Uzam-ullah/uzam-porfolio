import { useState, useEffect } from "react";

const useFetch = (url) => { 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const envBase = (import.meta.env.VITE_STRAPI_URL || "").trim();
        const base = (envBase ? envBase : "https://giving-excitement-72c292e9c9.strapiapp.com").replace(/\/$/, "");
        const isAbsolute = /^https?:\/\//i.test(url);
        const finalUrl = isAbsolute ? url : `${base}${url}`;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(finalUrl, { headers: { Accept: "application/json" } });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}
export default useFetch;