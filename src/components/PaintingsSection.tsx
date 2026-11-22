import { ArrowRight, MoveHorizontal, Palette } from 'lucide-react';
import { useState } from 'react';
import {
  ARTWORKS,
  PAINTING_COMPARISON_IMAGE,
  formatPrice,
  type Artwork,
  type Currency,
  type PrintFormat,
} from '../data/rovingEyesData';

interface PaintingsSectionProps {
  currency: Currency;
  onCommissionClick: (artwork: Artwork, format: PrintFormat) => void;
}

const COMMISSION_STEPS = [
  {
    step: '01',
    title: 'Select Any Plate',
    detail: 'Choose any photograph across our 8 Roving Eyes collections—landscapes, rivers, or portraits.',
  },
  {
    step: '02',
    title: 'Confirm Canvas Scale',
    detail: 'Minimum 3 × 2 ft (36" × 24") or bespoke oversized dimensions, secured with a 50% studio advance.',
  },
  {
    step: '03',
    title: '3-Week Hand Creation',
    detail: 'Resident artist Anukta Mukherjee Ghosh paints each brushstroke in layered acrylic on heavy canvas.',
  },
  {
    step: '04',
    title: 'Insured Rolled Delivery',
    detail: 'Shipped in reinforced museum tubes—complimentary across India, or worldwide at actual courier cost.',
  },
];

export function PaintingsSection({ currency, onCommissionClick }: PaintingsSectionProps) {
  const [sliderPos, setSliderPos] = useState(54);

  // Sample photograph to launch directly into Painting commission modal
  const featuredPlate = ARTWORKS[0];

  return (
    <section id="paintings" className="border-b border-white/10 bg-[#141417] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Interactive Before / After Photo-to-Painting Comparison */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0B0B0D] shadow-2xl">
              <div className="relative aspect-[4/3] w-full select-none overflow-hidden">
                {/* Base Layer: Original Photograph */}
                <img
                  src={PAINTING_COMPARISON_IMAGE}
                  alt="Original Himalayan tea hills photograph"
                  className="h-full w-full object-cover"
                />

                {/* Top Clipped Layer: Painterly Acrylic Canvas Interpretation */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={PAINTING_COMPARISON_IMAGE}
                    alt="Hand-painted acrylic on canvas interpretation"
                    className="painterly-filter h-full w-full object-cover"
                  />
                  <div className="canvas-weave absolute inset-0" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#C8A96E]/10 via-transparent to-[#2D1E12]/15" />
                </div>

                {/* Labels */}
                <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-[#0B0B0D]/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#C8A96E] uppercase backdrop-blur-sm">
                  Acrylic on Canvas
                </span>
                <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-[#0B0B0D]/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#F4F0E8] uppercase backdrop-blur-sm">
                  Original Photograph
                </span>

                {/* Vertical Divider Handle */}
                <div
                  className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-[#C8A96E]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C8A96E] bg-[#0B0B0D] text-[#C8A96E] shadow-lg">
                    <MoveHorizontal className="h-4 w-4" />
                  </div>
                </div>

                {/* Accessible Range Overlay */}
                <input
                  type="range"
                  min={8}
                  max={92}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Compare original photograph and hand-painted acrylic canvas"
                  className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-[#0B0B0D] px-4 py-3 text-xs text-[#A8A298]">
                <span>Drag across the frame to compare Photograph vs. Painted Canvas</span>
                <span className="font-mono text-[#C8A96E]">Min. 3 × 2 ft</span>
              </div>
            </div>
          </div>

          {/* Editorial Narrative + 4-Step Commission Process */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-[#C8A96E] uppercase">
              <Palette className="h-4 w-4" />
              <span>Bespoke Fine-Art Commissions</span>
            </div>

            <h2 className="mt-3 font-serif text-3xl font-normal text-[#F4F0E8] sm:text-4xl">
              From Expedition Frame to Hand-Painted Acrylic
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#A8A298] sm:text-base">
              Every photograph in the Roving Eyes archive can be commissioned as an original acrylic-on-canvas painting
              by resident fine artist <strong className="font-medium text-[#F4F0E8]">Anukta Mukherjee Ghosh</strong> —
              crafted for living rooms, boutique hotels, and executive spaces.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {COMMISSION_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-white/10 bg-[#0B0B0D]/70 p-4"
                >
                  <span className="font-mono text-xs text-[#C8A96E]">{item.step}</span>
                  <h3 className="mt-1 font-serif text-lg text-[#F4F0E8]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#A8A298]">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#C8A96E]/30 bg-[#0B0B0D] p-4 sm:px-5">
              <div>
                <div className="text-[11px] tracking-[0.14em] text-[#A8A298] uppercase">
                  Commission Starting Guide (3 × 2 ft)
                </div>
                <div className="mt-0.5 font-mono text-lg font-medium text-[#C8A96E]">
                  {formatPrice(35000, 480, currency)}{' '}
                  <span className="text-xs font-normal text-[#A8A298]">• 50% Advance • 3 Weeks</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onCommissionClick(featuredPlate, 'painting-3x2')}
                className="inline-flex items-center gap-2 rounded-full bg-[#C8A96E] px-5 py-2.5 text-xs font-semibold tracking-[0.12em] text-[#0B0B0D] uppercase transition hover:bg-[#D8BE8A]"
              >
                Commission Now
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
