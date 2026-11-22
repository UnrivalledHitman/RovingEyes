import { ArrowRight, Award, Globe2, Layers, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HERO_SLIDES } from '../data/rovingEyesData';

interface HeroProps {
  onExploreCollections: () => void;
  onCommissionPainting: () => void;
}

export function Hero({ onExploreCollections, onCommissionPainting }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[activeSlide];

  return (
    <section id="top" className="relative overflow-hidden border-b border-white/10">
      {/* Full-bleed Hero Stage — visible immediately above the fold on mobile & desktop */}
      <div className="relative flex min-h-[540px] w-full items-end overflow-hidden sm:min-h-[620px] lg:min-h-[700px]">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.code}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
              idx === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className={`h-full w-full object-cover ${idx === activeSlide ? 'animate-ken-burns' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/55 to-[#0B0B0D]/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/85 via-[#0B0B0D]/35 to-transparent" />
          </div>
        ))}

        {/* Hero Copy Overlay */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-[#C8A96E]/35 bg-[#0B0B0D]/70 px-3.5 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96E]" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#C8A96E] uppercase">
                Himalayas • Bengal • Bay Coast
              </span>
            </div>

            <h1 className="font-serif text-4xl font-normal leading-[1.08] tracking-tight text-[#F4F0E8] sm:text-5xl lg:text-6xl">
              Museum-Grade Travel Photography &amp;{' '}
              <span className="italic text-[#C8A96E]">Bespoke Canvas Art</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#D8D2C5] sm:text-base">
              Curated editions from the high Himalayas, coastal India, and Bengal’s quiet rivers — printed on
              archival stretched canvas or transformed into one-of-one hand-painted acrylics for collectors worldwide.
            </p>

            {/* Primary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onExploreCollections}
                className="inline-flex items-center gap-2 rounded-full bg-[#C8A96E] px-6 py-3 text-xs font-semibold tracking-[0.14em] text-[#0B0B0D] uppercase transition hover:bg-[#D8BE8A]"
              >
                Explore Collections
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={onCommissionPainting}
                className="inline-flex items-center gap-2 rounded-full border border-[#F4F0E8]/25 bg-[#0B0B0D]/60 px-6 py-3 text-xs font-semibold tracking-[0.14em] text-[#F4F0E8] uppercase backdrop-blur-sm transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                Commission a Painting
              </button>
            </div>
          </div>

          {/* Slide Metadata & Controls */}
          <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-5">
            <div>
              <span className="font-mono text-[11px] tracking-[0.18em] text-[#C8A96E] uppercase">
                Plate {current.code}
              </span>
              <p className="font-serif text-lg text-[#F4F0E8]">{current.title}</p>
              <p className="text-xs text-[#A8A298]">{current.location}</p>
            </div>

            <div className="flex items-center gap-2" role="tablist" aria-label="Hero artwork slides">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.code}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Show slide ${slide.code}: ${slide.title}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeSlide ? 'w-8 bg-[#C8A96E]' : 'w-2.5 bg-white/30 hover:bg-white/55'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collector Trust Bar */}
      <div className="relative z-10 border-t border-white/10 bg-[#141417]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 px-4 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-4 sm:pr-5">
            <Award className="h-4 w-4 shrink-0 text-[#C8A96E]" />
            <div className="text-xs">
              <div className="font-medium text-[#F4F0E8]">Hospitality &amp; Corporate Placements</div>
              <div className="text-[#A8A298]">Including ITC Ltd. – Hotels Division &amp; London</div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-4 sm:px-5">
            <Globe2 className="h-4 w-4 shrink-0 text-[#C8A96E]" />
            <div className="text-xs">
              <div className="font-medium text-[#F4F0E8]">Worldwide Collector Shipping</div>
              <div className="text-[#A8A298]">Free in India • US, UK, Dubai &amp; NZ</div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-4 sm:pr-5 lg:px-5">
            <Layers className="h-4 w-4 shrink-0 text-[#C8A96E]" />
            <div className="text-xs">
              <div className="font-medium text-[#F4F0E8]">Archival Stretched Canvas</div>
              <div className="text-[#A8A298]">Ready-to-hang gallery prints from ₹15,000</div>
            </div>
          </div>
          <div className="flex items-center gap-3 py-4 sm:pl-5">
            <Palette className="h-4 w-4 shrink-0 text-[#C8A96E]" />
            <div className="text-xs">
              <div className="font-medium text-[#F4F0E8]">Photo-to-Acrylic Commissions</div>
              <div className="text-[#A8A298]">Hand-painted 3×2 ft+ canvases in 3 weeks</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
