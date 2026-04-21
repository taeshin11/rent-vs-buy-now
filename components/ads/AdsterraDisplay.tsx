'use client';
import { useEffect, useRef } from 'react';

export function AdsterraDisplay() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const opt = document.createElement('script');
    opt.textContent = `atOptions = { 'key': '76983b0387a11886d65bdf68b282f0b5', 'format': 'iframe', 'height': 90, 'width': 728, 'params': {} };`;
    ref.current.appendChild(opt);
    const invoke = document.createElement('script');
    invoke.src = 'https://www.highperformanceformat.com/76983b0387a11886d65bdf68b282f0b5/invoke.js';
    ref.current.appendChild(invoke);
  }, []);
  return <div ref={ref} style={{ textAlign: 'center', overflow: 'hidden', margin: '1rem auto' }} />;
}
