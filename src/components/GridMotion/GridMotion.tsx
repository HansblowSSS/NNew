import { useEffect, useRef, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

/**
 * React-Bits style Grid Motion
 * - Renders an N x M grid of items that move toward
 *   pointer position with inertia. - `gradientColor` paints
 *   a soft inner+outer radial mask (default black).
 */
interface GridMotionProps {
  items: (string | ReactNode)[];
  gradientColor?: string;
  /** Number of rows. Auto-detected on small screens when omitted. */
  rows?: number;
  /** Number of cols. Defaults to 7. */
  cols?: number;
}

export default function GridMotion({
  items,
  gradientColor = '#08090C',
  rows,
  cols = 7,
}: GridMotionProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const xToRefs = useRef<Array<gsap.QuickToFunc | null>>([]);
  const yToRefs = useRef<Array<gsap.QuickToFunc | null>>([]);
  const reducedMotion = useRef(false);

  const detectRows = (): number => {
    if (rows) return rows;
    if (typeof window === 'undefined') return 5;
    const w = window.innerWidth;
    if (w < 520) return 4;
    if (w < 900) return 4;
    if (w < 1280) return 4;
    return 5;
  };

  const detectCols = (): number => {
    if (typeof window === 'undefined') return cols;
    const w = window.innerWidth;
    if (w < 520) return 4;
    if (w < 900) return 5;
    if (w < 1280) return 6;
    return cols;
  };

  const [renderedCols, setRenderedCols] = useState<number>(detectCols());
  const [renderedRows, setRenderedRows] = useState<number>(detectRows());

  useEffect(() => {
    const onResize = () => {
      setRenderedRows(detectRows());
      setRenderedCols(detectCols());
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;

    // Build quickTo helpers for each row
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      xToRefs.current[i] = gsap.quickTo(row, 'x', { duration: 1, ease: 'power3.out' });
      yToRefs.current[i] = gsap.quickTo(row, 'y', { duration: 1, ease: 'power3.out' });
    });

    const onPointerMove = (ev: PointerEvent) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const localX = ev.clientX - rect.left;
      const localY = ev.clientY - rect.top;
      const xPercentage = (localX / rect.width) * 100;
      const yPercentage = (localY / rect.height) * 100;

      const max = 12; // px offset at nearest row
      const strength = (i: number) =>
        1 - Math.abs(i - (renderedRows - 1) / 2) / renderedRows;

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const xShift = ((xPercentage - 50) / 50) * max * (0.4 + strength(i));
        const yShift = ((yPercentage - 50) / 50) * max * (0.4 + strength(i));
        xToRefs.current[i]?.(xShift);
        yToRefs.current[i]?.(yShift);
      });
    };

    const el = wrapperRef.current;
    el?.addEventListener('pointermove', onPointerMove);
    return () => el?.removeEventListener('pointermove', onPointerMove);
  }, [renderedRows]);

  // Build grid items
  const total = renderedRows * renderedCols;
  const list: (string | ReactNode)[] = [];
  for (let i = 0; i < total; i++) {
    list.push(items[i % items.length]);
  }

  return (
    <div
      ref={wrapperRef}
      className="grid-motion"
      style={{
        ['--gm-gradient-color' as string]: gradientColor,
      } as React.CSSProperties}
    >
      <div
        className="grid-motion-grid"
        style={{
          gridTemplateRows: `repeat(${renderedRows}, 1fr)`,
          gridTemplateColumns: `repeat(${renderedCols}, 1fr)`,
        }}
      >
        {Array.from({ length: renderedRows }).map((_, rowI) => (
          <div
            key={`row-${rowI}`}
            ref={(el) => {
              rowRefs.current[rowI] = el;
            }}
            className="grid-motion-row"
            style={{
              gridColumn: `1 / span ${renderedCols}`,
            }}
          >
            {list
              .slice(rowI * renderedCols, rowI * renderedCols + renderedCols)
              .map((cell, cellI) => {
                const absoluteIdx = rowI * renderedCols + cellI;
                const key = `cell-${absoluteIdx}`;
                if (typeof cell === 'string') {
                  return (
                    <div key={key} className="grid-motion-cell">
                      <img src={cell} alt="" loading="lazy" decoding="async" />
                    </div>
                  );
                }
                return (
                  <div key={key} className="grid-motion-cell">
                    {cell}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}