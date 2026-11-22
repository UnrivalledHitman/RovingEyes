import {
  Check,
  ChevronLeft,
  ChevronRight,
  Frame,
  Image as ImageIcon,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  FORMAT_OPTIONS,
  buildWhatsAppUrl,
  formatPrice,
  type Artwork,
  type Currency,
  type PrintFormat,
  type WatermarkMode,
} from '../data/rovingEyesData';
import { WatermarkOverlay } from './WatermarkOverlay';

interface ArtworkModalProps {
  artwork: Artwork | null;
  initialFormat?: PrintFormat;
  currency: Currency;
  watermarkMode: WatermarkMode;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAddToBag: (artwork: Artwork, format: PrintFormat) => void;
}

export function ArtworkModal({
  artwork,
  initialFormat = 'canvas-36x24',
  currency,
  watermarkMode,
  onClose,
  onPrev,
  onNext,
  onAddToBag,
}: ArtworkModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<PrintFormat>(initialFormat);
  const [viewMode, setViewMode] = useState<'artwork' | 'wall'>('artwork');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSelectedFormat(initialFormat);
    setJustAdded(false);
  }, [artwork?.id, initialFormat]);

  useEffect(() => {
    if (!artwork) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [artwork, onClose, onPrev, onNext]);

  if (!artwork) return null;

  const activeFormat = FORMAT_OPTIONS.find((f) => f.id === selectedFormat) ?? FORMAT_OPTIONS[1];
  const activePrice = formatPrice(activeFormat.inr, activeFormat.usd, currency);

  const whatsAppMsg = `Hello Roving Eyes! I would like to acquire artwork ${artwork.code} ("${artwork.title}") in ${activeFormat.label} — ${activeFormat.dimensions} (${activePrice}). Please share availability and delivery timeline.`;

  const handleAdd = () => {
    onAddToBag(artwork, selectedFormat);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Artwork details for ${artwork.title}`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#141417] shadow-2xl lg:grid lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* High-Contrast Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close artwork modal"
          className="absolute right-3.5 top-3.5 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#0B0B0D]/85 text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Pane: Artwork / Wall Scale Preview */}
        <div className="relative flex flex-col justify-between bg-[#0B0B0D] p-4 sm:p-6 lg:col-span-7">
          {/* Top Mode Bar */}
          <div className="mb-4 flex items-center justify-between pr-12">
            <div className="inline-flex rounded-full border border-white/10 bg-[#141417] p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('artwork')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                  viewMode === 'artwork'
                    ? 'bg-[#C8A96E] font-medium text-[#0B0B0D]'
                    : 'text-[#A8A298] hover:text-[#F4F0E8]'
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                Artwork View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('wall')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                  viewMode === 'wall'
                    ? 'bg-[#C8A96E] font-medium text-[#0B0B0D]'
                    : 'text-[#A8A298] hover:text-[#F4F0E8]'
                }`}
              >
                <Frame className="h-3.5 w-3.5" />
                Wall Scale Preview
              </button>
            </div>

            <span className="hidden font-mono text-[11px] text-[#A8A298] sm:inline">
              {artwork.capturedOn} • {artwork.photographer}
            </span>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#111115] sm:min-h-[420px]">
            {viewMode === 'artwork' ? (
              <div className="relative flex h-full w-full items-center justify-center p-2">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className={`max-h-[440px] w-full rounded-lg object-contain ${
                    selectedFormat === 'painting-3x2' ? 'painterly-filter' : ''
                  }`}
                />
                <WatermarkOverlay mode={watermarkMode} />
              </div>
            ) : (
              /* Wall Scale Preview: Framed art proportional to selected dimensions above minimalist gallery sofa */
              <div className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#232220] via-[#1C1B19] to-[#121214] px-6 py-8">
                <div className="text-center font-mono text-[10px] tracking-[0.2em] text-[#A8A298] uppercase">
                  True-to-scale wall preview • {activeFormat.dimensions} above 7ft gallery sofa
                </div>

                {/* Framed Artwork */}
                <div className="my-4 flex w-full flex-col items-center">
                  <div
                    style={{ width: `${activeFormat.wallWidthPct}%` }}
                    className={`relative overflow-hidden border-[6px] border-[#2C261F] bg-[#0B0B0D] shadow-[0_24px_45px_rgba(0,0,0,0.75)] transition-all duration-300 ${
                      selectedFormat.startsWith('paper') ? 'p-2.5 bg-[#EFECE6]' : ''
                    }`}
                  >
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className={`aspect-[3/2] w-full object-cover ${
                        selectedFormat === 'painting-3x2' ? 'painterly-filter' : ''
                      }`}
                    />
                  </div>
                  <div className="mt-2 font-mono text-[10px] text-[#C8A96E]">{activeFormat.dimensions}</div>
                </div>

                {/* Minimalist Sofa Silhouette */}
                <div className="flex w-full max-w-md flex-col items-center">
                  <div className="h-12 w-full rounded-t-xl border border-white/10 bg-[#272523] shadow-inner" />
                  <div className="h-7 w-[104%] rounded-md border border-white/10 bg-[#1F1D1B]" />
                  <div className="flex w-[92%] justify-between">
                    <div className="h-2.5 w-3 bg-[#151413]" />
                    <div className="h-2.5 w-3 bg-[#151413]" />
                  </div>
                </div>
              </div>
            )}

            {/* High-Contrast Prev / Next Buttons */}
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous artwork"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0B0B0D]/80 text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next artwork"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0B0B0D]/80 text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Pane: Story + Print/Painting Configurator */}
        <div className="flex flex-col justify-between overflow-y-auto p-5 sm:p-7 lg:col-span-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded bg-[#C8A96E]/15 px-2.5 py-1 font-mono text-xs font-medium text-[#C8A96E]">
                Plate {artwork.code}
              </span>
              <span className="text-xs tracking-[0.14em] text-[#A8A298] uppercase">
                {artwork.collection}
              </span>
            </div>

            <h2 className="mt-3 font-serif text-2xl font-normal text-[#F4F0E8] sm:text-3xl">
              {artwork.title}
            </h2>
            <p className="mt-1 text-xs font-medium text-[#C8A96E]">{artwork.location}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#A8A298]">{artwork.story}</p>

            {/* Format / Size Selector */}
            <div className="mt-6">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.14em] text-[#F4F0E8] uppercase">
                  Select Edition &amp; Format
                </span>
                <span className="font-mono text-[11px] text-[#A8A298]">
                  Currency: {currency}
                </span>
              </div>

              <div className="space-y-2">
                {FORMAT_OPTIONS.map((opt) => {
                  const selected = opt.id === selectedFormat;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedFormat(opt.id)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        selected
                          ? 'border-[#C8A96E] bg-[#C8A96E]/10'
                          : 'border-white/10 bg-[#0B0B0D]/60 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#F4F0E8]">{opt.label}</span>
                            {opt.badge && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#C8A96E]/20 px-2 py-0.5 text-[10px] font-medium text-[#C8A96E]">
                                <Sparkles className="h-2.5 w-2.5" />
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 font-mono text-xs text-[#A8A298]">
                            {opt.dimensions}
                          </div>
                        </div>
                        <div className="font-mono text-sm font-semibold text-[#C8A96E]">
                          {formatPrice(opt.inr, opt.usd, currency)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shipping / Medium Detail Box */}
            <div className="mt-4 rounded-xl border border-white/10 bg-[#0B0B0D]/60 p-3.5 text-xs text-[#A8A298]">
              <div className="font-medium text-[#F4F0E8]">{activeFormat.medium}</div>
              <div className="mt-1">
                {currency === 'INR' ? activeFormat.shippingIndia : activeFormat.shippingIntl}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8A96E] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-[#0B0B0D] uppercase transition hover:bg-[#D8BE8A]"
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to Inquiry Bag
                  </>
                )}
              </button>

              <a
                href={buildWhatsAppUrl(whatsAppMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C8A96E]/50 bg-[#1B1B20] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-[#F4F0E8] uppercase transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                <MessageCircle className="h-4 w-4 text-[#C8A96E]" />
                Order on WhatsApp
              </a>
            </div>
            <p className="text-center text-[11px] text-[#A8A298]">
              Every inquiry includes plate code <span className="font-mono text-[#F4F0E8]">{artwork.code}</span>{' '}
              automatically — no manual code lookup required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
