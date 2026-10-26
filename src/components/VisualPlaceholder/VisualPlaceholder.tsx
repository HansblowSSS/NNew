/**
 * Visual placeholder for missing / mismatched image.
 *
 * Designed to feel like an extension of the page's dark cinematic
 * style rather than a development debug rectangle.
 *
 * Variants control the silhouette / glow position so the page
 * still has a "subject" in the composition even when no real
 * image is available.
 */

import './VisualPlaceholder.css';

export type PlaceholderVariant =
  | 'product' // centered product silhouette with warm halo
  | 'portrait' // vertical product portrait, off-centre
  | 'wide' // wide landscape scene, low warm glow
  | 'closeup'; // macro warm light area, asymmetric

interface VisualPlaceholderProps {
  variant?: PlaceholderVariant;
  ratio?: string; // CSS aspect-ratio, e.g. '4 / 3'
  label?: string; // dev-only hint, very faint
  fullBleed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function VisualPlaceholder({
  variant = 'product',
  ratio,
  label = 'VISUAL PLACEHOLDER',
  fullBleed = false,
  className = '',
  style,
}: VisualPlaceholderProps) {
  return (
    <div
      className={`vp vp--${variant}${fullBleed ? ' vp--full' : ''}${className ? ' ' + className : ''}`}
      style={{ ...(ratio ? { aspectRatio: ratio } : {}), ...style }}
      role="img"
      aria-label="占位图区域"
    >
      <div className="vp-glow" aria-hidden="true" />
      <div className="vp-silhouette" aria-hidden="true" />
      <div className="vp-veil-top" aria-hidden="true" />
      <div className="vp-veil-bottom" aria-hidden="true" />
      {label && <span className="vp-label font-en">{label}</span>}
    </div>
  );
}
