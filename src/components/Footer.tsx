import { Facebook, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { COLLECTIONS, CONTACT_INFO, buildWhatsAppUrl, type CollectionCategory } from '../data/rovingEyesData';

interface FooterProps {
  onSelectCollection: (cat: 'All' | CollectionCategory) => void;
  onOpenInquiryDrawer: () => void;
}

export function Footer({ onSelectCollection, onOpenInquiryDrawer }: FooterProps) {
  const galleryCollections = COLLECTIONS.filter((c) => c !== 'All');

  return (
    <footer id="contact" className="bg-[#0B0B0D] pt-16 pb-10 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="font-serif text-2xl tracking-[0.14em] text-[#F4F0E8] uppercase">
              Roving Eyes
            </div>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-[#C8A96E] uppercase">
              Explore • Expose
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-[#A8A298]">
              A fine-art travel photography and bespoke acrylic painting collective based in West Bengal and the
              Himalayas. Archival canvas prints and hand-painted commissions shipped across India and worldwide.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Roving Eyes on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#141417] text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Roving Eyes on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#141417] text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={onOpenInquiryDrawer}
                className="rounded-full border border-[#C8A96E]/45 bg-[#141417] px-4 py-2 text-xs font-medium text-[#F4F0E8] transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                Open Collector Inquiry Form
              </button>
            </div>
          </div>

          {/* Direct Collection Links */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs tracking-[0.18em] text-[#C8A96E] uppercase">
              Collections
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-[#A8A298] md:grid-cols-1">
              {galleryCollections.map((cat) => (
                <li key={cat}>
                  <a
                    href="#collections"
                    onClick={() => onSelectCollection(cat)}
                    className="transition hover:text-[#F4F0E8]"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Clickable Contact Concierge */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs tracking-[0.18em] text-[#C8A96E] uppercase">
              Collector Concierge
            </h3>
            <div className="mt-4 space-y-3 text-xs">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 text-[#F4F0E8] transition hover:text-[#C8A96E]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#C8A96E]" />
                <span>{CONTACT_INFO.email}</span>
              </a>

              <div className="rounded-xl border border-white/10 bg-[#141417] p-3">
                <div className="text-[11px] text-[#A8A298]">{CONTACT_INFO.whatsappPrimary.city}</div>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:+${CONTACT_INFO.whatsappPrimary.digits}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[#F4F0E8] hover:text-[#C8A96E]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#C8A96E]" />
                    {CONTACT_INFO.whatsappPrimary.display}
                  </a>
                  <a
                    href={buildWhatsAppUrl('Hello Roving Eyes! I have an inquiry regarding your fine-art prints.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-[#C8A96E]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0B0B0D]"
                  >
                    <MessageCircle className="h-3 w-3" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#141417] p-3">
                <div className="text-[11px] text-[#A8A298]">{CONTACT_INFO.whatsappSecondary.city}</div>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:+${CONTACT_INFO.whatsappSecondary.digits}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[#F4F0E8] hover:text-[#C8A96E]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#C8A96E]" />
                    {CONTACT_INFO.whatsappSecondary.display}
                  </a>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsappSecondary.digits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-[#C8A96E]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0B0B0D]"
                  >
                    <MessageCircle className="h-3 w-3" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-[#A8A298] sm:flex-row">
          <p>© 2026 Roving Eyes Collective. All rights reserved.</p>
          <p>Kolkata • North Bengal • Himalayas • Worldwide Collector Shipping</p>
        </div>
      </div>
    </footer>
  );
}
