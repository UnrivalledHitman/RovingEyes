import { Building2, MapPin } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/rovingEyesData';

export function TeamSection() {
  return (
    <section id="story" className="border-b border-white/10 bg-[#0B0B0D] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-[#C8A96E] uppercase">
            The Collective — Team RE
          </span>
          <h2 className="mt-2 font-serif text-3xl font-normal text-[#F4F0E8] sm:text-4xl lg:text-5xl">
            Physicians, Mountaineers &amp; Painters Behind the Lens
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#A8A298] sm:text-base">
            Born from journeys across rural Bengal, coastal fishing villages, and high Himalayan passes, Roving Eyes
            unites documentary storytelling with tactile studio craftsmanship.
          </p>
        </div>

        {/* 3-Column Team Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141417]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#1B1B20]">
                <img
                  src={member.portraitUrl}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#C8A96E]">
                    <MapPin className="h-3 w-3" />
                    <span>{member.region}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-normal text-[#F4F0E8]">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-medium tracking-wide text-[#A8A298] uppercase">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#D8D2C5]">{member.bio}</p>
                </div>

                <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4 text-xs text-[#A8A298]">
                  {member.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[#C8A96E]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Hospitality & Global Collector Credibility Strip */}
        <div className="mt-12 rounded-2xl border border-[#C8A96E]/25 bg-[#141417] p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8A96E]/15 text-[#C8A96E]">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#F4F0E8]">
                  Trusted by Private Collectors &amp; Iconic Hospitality Spaces
                </h3>
                <p className="mt-1 text-sm text-[#A8A298]">
                  Past installations include <span className="text-[#F4F0E8]">ITC Ltd. – Hotels Division</span>,
                  a premier London restaurant chain, and private residences across India, the US, UK, Dubai &amp; New Zealand.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['India', 'United Kingdom', 'United States', 'Dubai', 'New Zealand'].map((country) => (
                <span
                  key={country}
                  className="rounded-full border border-white/10 bg-[#0B0B0D] px-3 py-1 font-mono text-[11px] text-[#A8A298]"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
