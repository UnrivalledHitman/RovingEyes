import { Eye, Maximize2, ShieldCheck, ShoppingBag } from 'lucide-react';
import {
  ARTWORKS,
  COLLECTIONS,
  FORMAT_OPTIONS,
  formatPrice,
  type Artwork,
  type CollectionCategory,
  type Currency,
  type PrintFormat,
  type WatermarkMode,
} from '../data/rovingEyesData';
import { WatermarkOverlay } from './WatermarkOverlay';

interface GallerySectionProps {
  selectedCategory: 'All' | CollectionCategory;
  onSelectCategory: (cat: 'All' | CollectionCategory) => void;
  watermarkMode: WatermarkMode;
  onWatermarkModeChange: (mode: WatermarkMode) => void;
  currency: Currency;
  onInspectArtwork: (artwork: Artwork, initialFormat?: PrintFormat) => void;
  onQuickAcquire: (artwork: Artwork, format: PrintFormat) => void;
}

export function GallerySection({
  selectedCategory,
  onSelectCategory,
  watermarkMode,
  onWatermarkModeChange,
  currency,
  onInspectArtwork,
  onQuickAcquire,
}: GallerySectionProps) {
  const filtered =
    selectedCategory === 'All'
      ? ARTWORKS
      : ARTWORKS.filter((item) => item.collection === selectedCategory);

  const entryCanvas = FORMAT_OPTIONS[0]; // 24x16 Stretched Canvas

  return (
    <section id="collections" className="border-b border-white/10 bg-[#0B0B0D] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Watermark Pitch Comparison Control */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-[0.2em] text-[#C8A96E] uppercase">
              Curated Exhibitions
            </span>
            <h2 className="mt-2 font-serif text-3xl font-normal text-[#F4F0E8] sm:text-4xl lg:text-5xl">
              Explore the Archive
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A8A298] sm:text-base">
              Click any photograph to preview its true scale on a living-room wall, choose stretched canvas or archival
              paper, or commission a bespoke hand-painted acrylic canvas.
            </p>
          </div>

          {/* Interactive Watermark Comparison Toggle */}
          <div className="rounded-2xl border border-white/10 bg-[#141417] p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.12em] text-[#C8A96E] uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Watermark Presentation Mode</span>
              </div>
              <span className="font-mono text-[10px] text-[#A8A298]">Client Comparison</span>
            </div>
            <div className="inline-flex flex-wrap gap-1 rounded-xl bg-[#0B0B0D] p-1">
              {(
                [
                  { id: 'clean', label: 'Clean View' },
                  { id: 'corner', label: 'Subtle Corner Signature' },
                  { id: 'legacy', label: 'Old Center Band' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onWatermarkModeChange(opt.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    watermarkMode === opt.id
                      ? 'bg-[#C8A96E] text-[#0B0B0D]'
                      : 'text-[#A8A298] hover:text-[#F4F0E8]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-[#A8A298]">
              {watermarkMode === 'clean' &&
                'Museum-clean display lets your light and texture sell prints directly.'}
              {watermarkMode === 'corner' &&
                'Protects copyright discreetly without cutting through the composition.'}
              {watermarkMode === 'legacy' &&
                'Simulates the current SmugMug center band that obscures faces and horizons.'}
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="mt-9 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter artwork by collection"
        >
          {COLLECTIONS.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(category)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.08em] transition ${
                  active
                    ? 'border-[#C8A96E] bg-[#C8A96E] text-[#0B0B0D]'
                    : 'border-white/10 bg-[#141417] text-[#A8A298] hover:border-[#C8A96E]/50 hover:text-[#F4F0E8]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Editorial Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((artwork) => (
            <article
              key={artwork.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141417] transition duration-300 hover:border-[#C8A96E]/50"
            >
              {/* Image Container */}
              <div
                onClick={() => onInspectArtwork(artwork)}
                className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-[#1B1B20]"
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <WatermarkOverlay mode={watermarkMode} compact />

                {/* Top Badges */}
                <div className="pointer-events-none absolute left-3 right-3 top-3 z-20 flex items-center justify-between">
                  <span className="rounded-md bg-[#0B0B0D]/80 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider text-[#C8A96E] backdrop-blur-sm">
                    {artwork.code}
                  </span>
                  <span className="rounded-md bg-[#0B0B0D]/75 px-2.5 py-1 text-[10px] tracking-[0.14em] text-[#F4F0E8] uppercase backdrop-blur-sm">
                    {artwork.collection}
                  </span>
                </div>

                {/* Hover Overlay CTA */}
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#C8A96E] bg-[#0B0B0D]/90 px-4 py-2 text-xs font-medium tracking-wider text-[#F4F0E8] uppercase">
                    <Maximize2 className="h-3.5 w-3.5 text-[#C8A96E]" />
                    Inspect &amp; Wall Preview
                  </span>
                </div>
              </div>

              {/* Card Metadata */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#F4F0E8]">{artwork.title}</h3>
                  <p className="mt-1 text-xs text-[#A8A298]">{artwork.location}</p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                  <div>
                    <div className="text-[10px] tracking-[0.14em] text-[#A8A298] uppercase">
                      Stretched Canvas from
                    </div>
                    <div className="font-mono text-sm font-medium text-[#C8A96E]">
                      {formatPrice(entryCanvas.inr, entryCanvas.usd, currency)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectArtwork(artwork)}
                      title="Inspect & configure print"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Frame</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAcquire(artwork, 'canvas-24x16')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#C8A96E] px-3.5 py-1.5 text-xs font-semibold text-[#0B0B0D] transition hover:bg-[#D8BE8A]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
