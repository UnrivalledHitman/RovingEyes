import { ArrowRight, Building, Check, MessageCircle, Shield } from 'lucide-react';
import {
  FORMAT_OPTIONS,
  buildWhatsAppUrl,
  formatPrice,
  type Currency,
} from '../data/rovingEyesData';

interface PricingSectionProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onBrowseGallery: () => void;
  onOpenInquiryDrawer: () => void;
}

export function PricingSection({
  currency,
  onCurrencyChange,
  onBrowseGallery,
  onOpenInquiryDrawer,
}: PricingSectionProps) {
  return (
    <section id="pricing" className="border-b border-white/10 bg-[#141417] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Currency Control */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-[0.2em] text-[#C8A96E] uppercase">
              Collector Investment Guide
            </span>
            <h2 className="mt-2 font-serif text-3xl font-normal text-[#F4F0E8] sm:text-4xl lg:text-5xl">
              Transparent Edition Pricing
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A8A298] sm:text-base">
              Standard canvas and archival prints include complimentary insured delivery across India.
              International shipments are dispatched via tracked air courier at actual cost.
            </p>
          </div>

          <div className="inline-flex self-start rounded-full border border-white/10 bg-[#0B0B0D] p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => onCurrencyChange('INR')}
              className={`rounded-full px-4 py-2 transition ${
                currency === 'INR' ? 'bg-[#C8A96E] text-[#0B0B0D]' : 'text-[#A8A298] hover:text-[#F4F0E8]'
              }`}
            >
              India (INR ₹)
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange('USD')}
              className={`rounded-full px-4 py-2 transition ${
                currency === 'USD' ? 'bg-[#C8A96E] text-[#0B0B0D]' : 'text-[#A8A298] hover:text-[#F4F0E8]'
              }`}
            >
              International (USD $)
            </button>
          </div>
        </div>

        {/* Standard Editions Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Stretched Canvas 24x16 */}
          <PricingCard
            title="Stretched Canvas"
            size='24" × 16"'
            price={formatPrice(FORMAT_OPTIONS[0].inr, FORMAT_OPTIONS[0].usd, currency)}
            subtitle="Ready-to-hang gallery wrap for studies, bedrooms & intimate walls."
            features={[
              'Museum-grade archival inks on cotton canvas',
              'Kiln-dried pine inner stretcher frame',
              currency === 'INR' ? 'Free insured delivery across India' : 'International courier billed at actuals',
            ]}
            ctaLabel="Choose Artwork"
            onAction={onBrowseGallery}
          />

          {/* Stretched Canvas 36x24 (Featured) */}
          <PricingCard
            featured
            badge="Most Popular"
            title="Statement Canvas"
            size='36" × 24"'
            price={formatPrice(FORMAT_OPTIONS[1].inr, FORMAT_OPTIONS[1].usd, currency)}
            subtitle="Commanding centerpiece scale for living spaces and executive suites."
            features={[
              'Deep-edge museum wrap, ready to hang',
              'High-resolution archival pigment finish',
              currency === 'INR' ? 'Free insured delivery across India' : 'International courier billed at actuals',
            ]}
            ctaLabel="Select 36×24 Plate"
            onAction={onBrowseGallery}
          />

          {/* Archival Paper & Bespoke Painting */}
          <PricingCard
            title="Bespoke Acrylic Painting"
            size="Min. 3 × 2 ft (36×24 in)"
            price={`From ${formatPrice(FORMAT_OPTIONS[4].inr, FORMAT_OPTIONS[4].usd, currency)}`}
            subtitle="Hand-painted in acrylic from any gallery photograph by Anukta Mukherjee Ghosh."
            features={[
              'Original 1-of-1 painting • 3-week turnaround',
              'Archival Paper Prints also available from ' + formatPrice(9500, 165, currency),
              '50% advance to initiate • Rolled worldwide shipping',
            ]}
            ctaLabel="Request Commission"
            onAction={onOpenInquiryDrawer}
          />
        </div>

        {/* Panoramas, Merchandising & Hospitality Custom Strip */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 lg:col-span-7 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8A96E]/15 text-[#C8A96E]">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#F4F0E8]">
                  Panoramas, Hospitality Curation &amp; Custom Merchandising
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#A8A298]">
                  Custom panoramic aspect ratios, hotel suite editions, corporate gifting, or curated gallery walls?
                  Receive a tailored quote within 24 hours.
                </p>
              </div>
            </div>

            <div className="mt-4 flex shrink-0 items-center gap-2.5 sm:mt-0">
              <a
                href={buildWhatsAppUrl(
                  'Hello Roving Eyes! I would like a custom quote for Panoramas / Hospitality curation.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#C8A96E]/45 px-4 py-2 text-xs font-medium text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#C8A96E]" />
                WhatsApp Quote
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#0B0B0D] p-6 lg:col-span-5">
            <Shield className="h-5 w-5 shrink-0 text-[#C8A96E]" />
            <div className="text-xs leading-relaxed text-[#A8A298]">
              <span className="font-medium text-[#F4F0E8]">Archival Quality Guarantee:</span> Every edition is
              inspected, color-checked, and packed in moisture-sealed protective layers before dispatch.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  title: string;
  size: string;
  price: string;
  subtitle: string;
  features: string[];
  ctaLabel: string;
  onAction: () => void;
  featured?: boolean;
  badge?: string;
}

function PricingCard({
  title,
  size,
  price,
  subtitle,
  features,
  ctaLabel,
  onAction,
  featured = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-7 ${
        featured
          ? 'border-[#C8A96E] bg-gradient-to-b from-[#1B1B20] to-[#0B0B0D] shadow-xl'
          : 'border-white/10 bg-[#0B0B0D]'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-[#C8A96E] uppercase">{size}</span>
          {badge && (
            <span className="rounded-full bg-[#C8A96E] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#0B0B0D] uppercase">
              {badge}
            </span>
          )}
        </div>
        <h3 className="mt-2 font-serif text-2xl text-[#F4F0E8]">{title}</h3>
        <div className="mt-3 font-mono text-3xl font-semibold text-[#F4F0E8]">{price}</div>
        <p className="mt-2 text-xs leading-relaxed text-[#A8A298]">{subtitle}</p>

        <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs text-[#D8D2C5]">
          {features.map((feat) => (
            <li key={feat} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C8A96E]" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onAction}
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase transition ${
          featured
            ? 'bg-[#C8A96E] text-[#0B0B0D] hover:bg-[#D8BE8A]'
            : 'border border-white/15 bg-[#141417] text-[#F4F0E8] hover:border-[#C8A96E] hover:text-[#C8A96E]'
        }`}
      >
        {ctaLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
