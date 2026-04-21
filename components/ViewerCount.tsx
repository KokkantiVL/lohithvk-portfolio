"use client";

import { useState, useEffect } from "react";

const NAMESPACE = "vlk-portfolio-2025";
const KEY = "page-views";
const LAST_VISIT_KEY = "vlk_last_visit";
const SESSION_MS = 30 * 60 * 1000; // 30 min session window

export default function ViewerCount() {
  const [count, setCount] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    const isNewVisit = !lastVisit || now - Number(lastVisit) > SESSION_MS;

    if (isNewVisit) localStorage.setItem(LAST_VISIT_KEY, String(now));

    const url = isNewVisit
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`;

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const n = typeof d?.count === "number" ? d.count : null;
        if (n !== null) setCount(n);
      })
      .catch(() => {});
  }, []);

  /* Animated count-up when number arrives */
  useEffect(() => {
    if (count === null) return;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(eased * count));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [count]);

  if (count === null) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-bold text-primary tracking-tight">
        {displayed.toLocaleString()}
      </span>
      <span className="text-xs font-mono text-secondary tracking-widest uppercase">
        Visitors
      </span>
    </div>
  );
}
