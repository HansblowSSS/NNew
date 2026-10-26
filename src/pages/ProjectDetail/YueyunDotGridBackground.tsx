import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import DotGrid from '../../components/DotGrid/DotGrid';
import './YueyunDotGridBackground.css';

/**
 * Page-wide WebGL dot grid that sits fixed behind every section
 * below the hero (Culture / Design / Collection / Series / Closing).
 *
 * The hero keeps its own photographic background; this layer is
 * intentionally a calm, slow gesture — warm-brown dots that only
 * light up under the cursor and on click. Reduced-motion users
 * see a static flat dot grid (no physics, no mouse reaction).
 *
 * Rendered through a portal to <body> because the surrounding
 * <PageTransition> wrapper uses `will-change: transform`, which
 * promotes itself to a containing block and would otherwise
 * demote our `position: fixed` to absolute against the page
 * height (15174px) — making the canvas effectively invisible.
 */
export default function YueyunDotGridBackground() {
  const ready = useRef(false);
  useEffect(() => {
    ready.current = true;
  }, []);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div className="yy-dotgrid-bg" aria-hidden="true">
      <DotGrid
        baseColor="#7A6A4A"
        activeColor="#E8C580"
        shape="circle"
        dotSize={5}
        gap={20}
        proximity={170}
        strength={1}
        bounce={0.55}
        tension={0.35}
        returnDuration={0.9}
        shockRadius={280}
        shockStrength={5}
        swell={0.8}
        stretch={0.5}
        glow={0.7}
        fade={0.3}
        intro
        opacity={1}
        mouseInteraction
        clickShock
      />
    </div>,
    document.body,
  );
}
