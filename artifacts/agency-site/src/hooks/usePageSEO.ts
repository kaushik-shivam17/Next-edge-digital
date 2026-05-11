import { useEffect } from "react";

interface PageSEOOptions {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const defaults = {
  title: "Core Elite Digital | AI-Powered Digital Agency",
  description: "Core Elite Digital is an elite AI-powered digital agency delivering market-leading websites, AI automation, and growth strategies for ambitious brands.",
  keywords: "AI digital agency, AI automation, website design, SEO, Core Elite Digital",
};

export function usePageSEO({ title, description, keywords, ogImage }: PageSEOOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    if (keywords) setMeta('meta[name="keywords"]', "content", keywords);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    if (ogImage) setMeta('meta[property="og:image"]', "content", ogImage);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    return () => {
      document.title = defaults.title;
      setMeta('meta[name="description"]', "content", defaults.description);
      setMeta('meta[property="og:title"]', "content", defaults.title);
      setMeta('meta[property="og:description"]', "content", defaults.description);
      setMeta('meta[name="twitter:title"]', "content", defaults.title);
      setMeta('meta[name="twitter:description"]', "content", defaults.description);
    };
  }, [title, description, keywords, ogImage]);
}
