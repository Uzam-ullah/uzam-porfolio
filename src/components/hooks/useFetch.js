import { useState, useEffect } from "react";

const useFetch = (url) => { 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const envBase = (import.meta.env.VITE_STRAPI_URL || "").trim();
    const base = (envBase || "https://giving-excitement-72c292e9c9.strapiapp.com").replace(/\/+$/, "");
    const isAbsolute = /^https?:\/\//i.test(url);

    // Ensure exactly one slash between base and path
    const path = isAbsolute ? "" : `/${String(url).replace(/^\/+/, "")}`;
    const finalUrl = isAbsolute ? url : `${base}${path}`;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000); // 10s timeout

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(finalUrl, { headers: { Accept: "application/json" }, signal: ctrl.signal });

        const ct = res.headers.get("content-type") || "";
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} for ${finalUrl}: ${text.slice(0,120)}`);
        }
        if (!ct.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Non-JSON from ${finalUrl}: ${text.slice(0,120)}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("useFetch error:", finalUrl, err);
        setError(err);
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    };

    fetchData();
    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [url]);

  return { data, loading, error };
};
export default useFetch;