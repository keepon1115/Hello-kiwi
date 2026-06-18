'use client';
import { useEffect } from 'react';

// スクロールで .reveal を一度だけ .in にする。CSS 側でふわっと表示。
// prefers-reduced-motion の人にはアニメを無効化し、即座に表示する（globals.css 側で担保）。
export function useReveal(refreshKey?: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');

    // モーション削減環境では監視せず全部出す（チラつき・酔いを防ぐ）。
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [refreshKey]);
}
