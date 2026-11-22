import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export function ConceptBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-50 border-b border-[#C8A96E]/25 bg-[#141417] px-4 py-2 text-xs text-[#E4DEC9]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#C8A96E]" />
          <p className="leading-snug">
            <span className="font-medium text-[#C8A96E]">Concept Redesign Preview for Roving Eyes</span>
            <span className="hidden sm:inline text-[#A8A298]">
              {' '}
              — Sample high-res Himalayan &amp; Indian photography shown clean (replaced with your unwatermarked originals at launch).
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss concept preview banner"
          className="rounded p-1 text-[#A8A298] transition hover:bg-white/5 hover:text-[#F4F0E8]"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
