import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import type { Currency } from '../data/rovingEyesData';

interface NavbarProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  bagCount: number;
  onOpenBag: () => void;
}

const NAV_LINKS = [
  { label: 'Collections', href: '#collections' },
  { label: 'Paintings', href: '#paintings' },
  { label: 'Story', href: '#story' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ currency, onCurrencyChange, bagCount, onOpenBag }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0B0D]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Lockup */}
        <a href="#top" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A96E]/40 bg-[#141417] transition group-hover:border-[#C8A96E]">
            {/* Minimalist Mountain-Aperture SVG Mark */}
            <svg
              viewBox="0 0 36 36"
              fill="none"
              className="h-6 w-6 text-[#C8A96E]"
              aria-hidden="true"
            >
              <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
              <path
                d="M8.5 23.5L15 13.5L19.2 19.8L22.4 15.8L27.5 23.5H8.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="23.5" cy="11.5" r="1.4" fill="currentColor" />
            </svg>
          </div>
          <div>
            <div className="font-serif text-xl tracking-[0.14em] text-[#F4F0E8] uppercase leading-none">
              Roving Eyes
            </div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.22em] text-[#A8A298] uppercase">
              Explore • Expose
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium tracking-[0.16em] text-[#A8A298] uppercase transition hover:text-[#C8A96E]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions: Currency Toggle + Inquiry Bag */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="inline-flex items-center rounded-full border border-white/10 bg-[#141417] p-0.5 text-[11px] font-medium"
            role="group"
            aria-label="Currency selector"
          >
            <button
              type="button"
              onClick={() => onCurrencyChange('INR')}
              className={`rounded-full px-2.5 py-1 transition ${
                currency === 'INR'
                  ? 'bg-[#C8A96E] text-[#0B0B0D]'
                  : 'text-[#A8A298] hover:text-[#F4F0E8]'
              }`}
            >
              INR ₹
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange('USD')}
              className={`rounded-full px-2.5 py-1 transition ${
                currency === 'USD'
                  ? 'bg-[#C8A96E] text-[#0B0B0D]'
                  : 'text-[#A8A298] hover:text-[#F4F0E8]'
              }`}
            >
              USD $
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenBag}
            className="relative inline-flex items-center gap-2 rounded-full border border-[#C8A96E]/40 bg-[#141417] px-3.5 py-1.5 text-xs font-medium text-[#F4F0E8] transition hover:border-[#C8A96E] hover:bg-[#1B1B20]"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-[#C8A96E]" />
            <span className="hidden sm:inline">Inquiry Bag</span>
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C8A96E] px-1 font-mono text-[10px] font-semibold text-[#0B0B0D]">
              {bagCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-[#F4F0E8] md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0D] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-2 text-sm tracking-[0.14em] text-[#F4F0E8] uppercase transition hover:bg-white/5 hover:text-[#C8A96E]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
