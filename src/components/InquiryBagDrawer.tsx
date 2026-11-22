import { CheckCircle2, MessageCircle, Minus, Plus, Send, ShoppingBag, Trash2, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import {
  FORMAT_OPTIONS,
  buildWhatsAppUrl,
  formatPrice,
  type BagItem,
  type Currency,
} from '../data/rovingEyesData';

interface InquiryBagDrawerProps {
  open: boolean;
  items: BagItem[];
  currency: Currency;
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
}

export function InquiryBagDrawer({
  open,
  items,
  currency,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}: InquiryBagDrawerProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!open) return null;

  const totals = items.reduce(
    (acc, item) => {
      const fmt = FORMAT_OPTIONS.find((f) => f.id === item.format) ?? FORMAT_OPTIONS[0];
      acc.inr += fmt.inr * item.quantity;
      acc.usd += fmt.usd * item.quantity;
      return acc;
    },
    { inr: 0, usd: 0 }
  );

  const formattedBagLines = items
    .map((item) => {
      const fmt = FORMAT_OPTIONS.find((f) => f.id === item.format) ?? FORMAT_OPTIONS[0];
      return `• ${item.quantity}x [${item.artwork.code}] "${item.artwork.title}" — ${fmt.label} (${fmt.dimensions}) — ${formatPrice(
        fmt.inr * item.quantity,
        fmt.usd * item.quantity,
        currency
      )}`;
    })
    .join('\n');

  const whatsAppText =
    items.length > 0
      ? `Hello Roving Eyes! I would like to place an inquiry for:\n${formattedBagLines}\n\nEstimated Total: ${formatPrice(
          totals.inr,
          totals.usd,
          currency
        )}${name ? `\nName: ${name}` : ''}${city ? `\nLocation: ${city}` : ''}`
      : `Hello Roving Eyes! I would like to inquire about fine-art prints or a custom acrylic painting commission.${
          name ? `\nName: ${name}` : ''
        }`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRef(`RE-2026-${randomCode}`);
    onClearBag();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-lg flex-col border-l border-white/15 bg-[#141417] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        aria-label="Collector Inquiry Bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-[#C8A96E]" />
            <h2 className="font-serif text-xl text-[#F4F0E8]">Collector Inquiry Bag</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry drawer"
            className="rounded-full p-1.5 text-[#A8A298] transition hover:bg-white/5 hover:text-[#F4F0E8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {submittedRef ? (
            <div className="rounded-2xl border border-[#C8A96E]/40 bg-[#0B0B0D] p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-[#C8A96E]" />
              <h3 className="mt-3 font-serif text-2xl text-[#F4F0E8]">Inquiry Received</h3>
              <p className="mt-1 font-mono text-xs text-[#C8A96E]">Reference: {submittedRef}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#A8A298]">
                Thank you{name ? `, ${name}` : ''}. Team Roving Eyes will confirm edition pricing, framing/shipping
                details, and delivery timelines within 24 hours via email or WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRef(null);
                  setMessage('');
                  onClose();
                }}
                className="mt-6 rounded-full bg-[#C8A96E] px-6 py-2.5 text-xs font-semibold tracking-wider text-[#0B0B0D] uppercase transition hover:bg-[#D8BE8A]"
              >
                Return to Gallery
              </button>
            </div>
          ) : (
            <>
              {/* Selected Artworks */}
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-[#0B0B0D]/60 p-6 text-center">
                  <p className="font-serif text-lg text-[#F4F0E8]">Your inquiry bag is empty</p>
                  <p className="mt-1 text-xs text-[#A8A298]">
                    Select any photograph to add a stretched canvas, paper print, or painting commission — or send a
                    custom question below.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const fmt = FORMAT_OPTIONS.find((f) => f.id === item.format) ?? FORMAT_OPTIONS[0];
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3.5 rounded-xl border border-white/10 bg-[#0B0B0D] p-3"
                      >
                        <img
                          src={item.artwork.imageUrl}
                          alt={item.artwork.title}
                          className="h-20 w-24 shrink-0 rounded-lg object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-mono text-[10px] text-[#C8A96E]">
                                Plate {item.artwork.code}
                              </span>
                              <h3 className="font-serif text-base leading-tight text-[#F4F0E8]">
                                {item.artwork.title}
                              </h3>
                              <p className="text-[11px] text-[#A8A298]">
                                {fmt.label} • {fmt.dimensions}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              aria-label={`Remove ${item.artwork.title}`}
                              className="text-[#A8A298] transition hover:text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-white/10 bg-[#141417]">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, -1)}
                                aria-label="Decrease quantity"
                                className="p-1.5 text-[#A8A298] hover:text-[#F4F0E8]"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2.5 font-mono text-xs text-[#F4F0E8]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, 1)}
                                aria-label="Increase quantity"
                                className="p-1.5 text-[#A8A298] hover:text-[#F4F0E8]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-mono text-xs font-medium text-[#C8A96E]">
                              {formatPrice(fmt.inr * item.quantity, fmt.usd * item.quantity, currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between rounded-xl border border-[#C8A96E]/30 bg-[#0B0B0D] px-4 py-3">
                    <span className="text-xs tracking-[0.12em] text-[#A8A298] uppercase">
                      Estimated Subtotal
                    </span>
                    <span className="font-mono text-base font-semibold text-[#C8A96E]">
                      {formatPrice(totals.inr, totals.usd, currency)}
                    </span>
                  </div>
                </div>
              )}

              {/* Direct Collector Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-3 border-t border-white/10 pt-5">
                <h3 className="font-serif text-xl text-[#F4F0E8]">Send Order / Commission Request</h3>
                <p className="text-xs text-[#A8A298]">
                  Prefer instant messaging? Use WhatsApp below, or submit this form for a formal email quote.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-3.5 py-2.5 text-xs text-[#F4F0E8] placeholder-[#A8A298] focus:border-[#C8A96E] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-3.5 py-2.5 text-xs text-[#F4F0E8] placeholder-[#A8A298] focus:border-[#C8A96E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone / WhatsApp"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-3.5 py-2.5 text-xs text-[#F4F0E8] placeholder-[#A8A298] focus:border-[#C8A96E] focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City & Country *"
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-3.5 py-2.5 text-xs text-[#F4F0E8] placeholder-[#A8A298] focus:border-[#C8A96E] focus:outline-none"
                  />
                </div>

                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Custom framing notes, painting dimensions, or hospitality inquiry details..."
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B0D] px-3.5 py-2.5 text-xs text-[#F4F0E8] placeholder-[#A8A298] focus:border-[#C8A96E] focus:outline-none"
                />

                <div className="flex flex-col gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A96E] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-[#0B0B0D] uppercase transition hover:bg-[#D8BE8A]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Collector Inquiry
                  </button>

                  <a
                    href={buildWhatsAppUrl(whatsAppText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#C8A96E]/50 bg-[#1B1B20] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-[#F4F0E8] uppercase transition hover:border-[#C8A96E] hover:text-[#C8A96E]"
                  >
                    <MessageCircle className="h-4 w-4 text-[#C8A96E]" />
                    Send Pre-Filled Order on WhatsApp
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
