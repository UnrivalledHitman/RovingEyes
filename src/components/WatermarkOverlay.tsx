import type { WatermarkMode } from '../data/rovingEyesData';

interface WatermarkOverlayProps {
  mode: WatermarkMode;
  compact?: boolean;
}

export function WatermarkOverlay({ mode, compact = false }: WatermarkOverlayProps) {
  if (mode === 'clean') return null;

  if (mode === 'corner') {
    return (
      <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded bg-black/45 px-2.5 py-1 backdrop-blur-[2px]">
        <span className="font-serif text-[11px] tracking-[0.18em] text-[#F4F0E8]/75 uppercase">
          © Roving Eyes
        </span>
      </div>
    );
  }

  // Legacy heavy center band (recreating the old SmugMug overlay for live pitch comparison)
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div
        className={`w-full bg-neutral-400/55 text-center backdrop-blur-[0.5px] ${
          compact ? 'py-2' : 'py-3.5'
        }`}
      >
        <span
          className={`font-sans font-semibold tracking-[0.28em] text-white/85 uppercase ${
            compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
          }`}
        >
          © ROVING EYES
        </span>
      </div>
    </div>
  );
}
