'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147415.profitablecpmratenetwork.com/25/08/f0/2508f05581aa5b3b8f58311239eb0bed.js", "https://pl29147418.profitablecpmratenetwork.com/0c/93/ee/0c93eedbee019649d6ea0d6c9aba0ec9.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
