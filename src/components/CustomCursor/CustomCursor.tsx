import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/**
 * Global Custom Cursor
 *  - Default: hollow circle (28-36px) lagging behind
 *  - On [data-cursor="image"]: collapses to small filled circle with "VIEW"
 *  - On [data-cursor="text"]:  text-input style I
 *  - On [data-cursor="link"]:  ring expands with subtle tint
 *  - Inverse: ring + dot flip to white when the page sets
 *    <html data-cursor-theme="inverse">. Pages opt in on mount and restore
 *    on unmount so only that detail page gets the light cursor.
 *  - Hidden on touch / coarse pointers
 */

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'image' | 'text' | 'link'>('default');
  const [label, setLabel] = useState<string>('');
  const [inverse, setInverse] = useState(false);

  // Watch the document-level cursor theme flag.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const sync = () => setInverse(root.dataset.cursorTheme === 'inverse');
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['data-cursor-theme'] });
    return () => obs.disconnect();
  }, []);

  // Detect coarse pointer (touch)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(!mq.matches && !reduced.matches);
    const onChange = () => setEnabled(!mq.matches && !reduced.matches);
    mq.addEventListener('change', onChange);
    reduced.addEventListener('change', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      reduced.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // Find the nearest data-cursor, but never escape past the document root.
      const root = (target.getRootNode && target.getRootNode()) as Node | null;
      let host: Element | null = target;
      if (root && root instanceof ShadowRoot) {
        // For shadow DOM, fall back to composedPath to find the data-cursor host.
        const path = (e.composedPath?.() ?? []) as Element[];
        for (const n of path) {
          if (!(n instanceof Element)) continue;
          if (n.closest) {
            const found = n.closest('[data-cursor]');
            if (found) {
              host = found;
              break;
            }
          }
        }
      }
      const el = host?.closest<HTMLElement>('[data-cursor]') ?? null;
      const type = (el?.dataset.cursor as 'image' | 'text' | 'link' | undefined) ?? null;
      const txt = el?.dataset.cursorText ?? '';
      if (type === 'image') {
        setVariant('image');
        setLabel(txt || 'VIEW');
      } else if (type === 'text') {
        setVariant('text');
        setLabel('');
      } else if (type === 'link') {
        setVariant('link');
        setLabel('');
      } else {
        setVariant('default');
        setLabel('');
      }
    };

    const tick = () => {
      // Smooth follow for the ring (slight lag)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const themeClass = inverse ? 'theme-inverse' : '';

  return (
    <>
      <div ref={ringRef} className={`cursor-ring variant-${variant} ${themeClass}`} aria-hidden="true">
        {variant === 'image' && label && <span className="cursor-ring-label">{label}</span>}
      </div>
      <div ref={dotRef} className={`cursor-dot variant-${variant} ${themeClass}`} aria-hidden="true" />
    </>
  );
}