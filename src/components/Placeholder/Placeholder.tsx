import { useEffect, useState } from 'react';
import './Placeholder.css';

interface PlaceholderProps {
  /** Path that would have been used, shown as a hint */
  path: string | undefined;
  /** Short human label, e.g. "项圈正视图" */
  label: string;
  /** Optional aspect ratio for the box (defaults to 4/3) */
  aspect?: string;
  /** Visual treatment */
  variant?: 'image' | 'video';
  /** Optional caption */
  caption?: string;
  /** Show the small "file not found" status */
  showPath?: boolean;
}

/**
 * Single source of truth for missing assets. The page is wired to
 * real paths via data/copaw.ts, so to activate a real asset the
 * user just drops the file at the right path — no code change.
 *
 * Until then, this component renders a calm, well-spaced card that
 * communicates the missing filename and the recommended file.
 */
export default function Placeholder({
  path,
  label,
  aspect = '4 / 3',
  variant = 'image',
  caption,
  showPath = true,
}: PlaceholderProps) {
  // Check whether the asset actually resolves. Using HEAD through
  // a no-op img so we get a reliable load/error signal and don't
  // depend on the network for already-known-missing files.
  const [exists, setExists] = useState<boolean | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (variant === 'video') {
      // For video we don't probe (would be expensive); always show
      // the placeholder.
      setExists(false);
      return () => {
        cancelled = true;
      };
    }
    const probe = new Image();
    probe.onload = () => !cancelled && setExists(true);
    probe.onerror = () => !cancelled && setExists(false);
    if (path) probe.src = path;
    return () => {
      cancelled = true;
    };
  }, [path, variant]);

  // If the file truly exists, just render the image — no placeholder
  // decoration, no layout shift.
  if (exists === true && path && variant === 'image') {
    return (
      <div
        className="cpaw-asset cpaw-asset--real"
        style={{ aspectRatio: aspect }}
      >
        <img
          src={path}
          alt={label}
          loading="lazy"
          decoding="async"
          data-cursor="image"
          data-cursor-text="VIEW"
        />
      </div>
    );
  }

  // File is missing or video — render the placeholder card.
  const filename = path ? path.split('/').pop() ?? path : `${label}.missing`;
  return (
    <figure
      className={`cpaw-asset cpaw-asset--placeholder cpaw-asset--${variant}`}
      style={{ aspectRatio: aspect }}
      data-missing
    >
      <div className="cpaw-asset-inner" aria-hidden="true">
        <span className="cpaw-asset-icon" />
        <span className="cpaw-asset-tag">{variant === 'video' ? '视频' : '图片'}</span>
      </div>
      <figcaption className="cpaw-asset-caption">
        <span className="cpaw-asset-label">{label}</span>
        {showPath && <span className="cpaw-asset-path">{filename}</span>}
        {caption && <span className="cpaw-asset-note">{caption}</span>}
      </figcaption>
    </figure>
  );
}
