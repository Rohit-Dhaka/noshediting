import { useEffect, useRef, useState } from "react";


const optimize = (url, width = 400) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;


const makePoster = (url, width = 400) =>
  url?.includes("/upload/")
    ? url
        .replace("/upload/", `/upload/so_0,f_auto,q_auto,w_${width}/`)
        .replace(/\.(mp4|mov|webm)$/i, ".jpg")
    : undefined;

export default function LazyVideo({ src, className = "", width = 400 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      src={inView ? optimize(src, width) : undefined}
      poster={makePoster(src, width)}
      className={className}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}