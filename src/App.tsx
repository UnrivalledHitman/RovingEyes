import { useMemo, useState } from 'react';
import { ArtworkModal } from './components/ArtworkModal';
import { ConceptBanner } from './components/ConceptBanner';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Hero } from './components/Hero';
import { InquiryBagDrawer } from './components/InquiryBagDrawer';
import { Navbar } from './components/Navbar';
import { PaintingsSection } from './components/PaintingsSection';
import { PricingSection } from './components/PricingSection';
import { TeamSection } from './components/TeamSection';
import {
  ARTWORKS,
  type Artwork,
  type BagItem,
  type CollectionCategory,
  type Currency,
  type PrintFormat,
  type WatermarkMode,
} from './data/rovingEyesData';

export function App() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CollectionCategory>('All');
  const [watermarkMode, setWatermarkMode] = useState<WatermarkMode>('clean');
  const [modalState, setModalState] = useState<{ artwork: Artwork | null; format: PrintFormat }>({
    artwork: null,
    format: 'canvas-36x24',
  });
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visibleArtworks = useMemo(
    () =>
      selectedCategory === 'All'
        ? ARTWORKS
        : ARTWORKS.filter((item) => item.collection === selectedCategory),
    [selectedCategory]
  );

  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleInspectArtwork = (artwork: Artwork, initialFormat: PrintFormat = 'canvas-36x24') => {
    setModalState({ artwork, format: initialFormat });
  };

  const handleStepModal = (direction: -1 | 1) => {
    if (!modalState.artwork) return;
    const list = visibleArtworks.length > 0 ? visibleArtworks : ARTWORKS;
    const idx = list.findIndex((a) => a.id === modalState.artwork?.id);
    const nextIndex = idx === -1 ? 0 : (idx + direction + list.length) % list.length;
    setModalState({ artwork: list[nextIndex], format: modalState.format });
  };

  const handleAddToBag = (artwork: Artwork, format: PrintFormat) => {
    const key = `${artwork.id}:${format}`;
    setBagItems((prev) => {
      const existing = prev.find((item) => item.id === key);
      if (existing) {
        return prev.map((item) =>
          item.id === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: key, artwork, format, quantity: 1 }];
    });
  };

  const handleQuickAcquire = (artwork: Artwork, format: PrintFormat) => {
    handleAddToBag(artwork, format);
    setDrawerOpen(true);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F4F0E8]">
      <ConceptBanner />
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        bagCount={bagCount}
        onOpenBag={() => setDrawerOpen(true)}
      />

      <main>
        <Hero
          onExploreCollections={() => scrollToSection('collections')}
          onCommissionPainting={() => scrollToSection('paintings')}
        />

        <GallerySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          watermarkMode={watermarkMode}
          onWatermarkModeChange={setWatermarkMode}
          currency={currency}
          onInspectArtwork={handleInspectArtwork}
          onQuickAcquire={handleQuickAcquire}
        />

        <PaintingsSection
          currency={currency}
          onCommissionClick={handleInspectArtwork}
        />

        <TeamSection />

        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          onBrowseGallery={() => scrollToSection('collections')}
          onOpenInquiryDrawer={() => setDrawerOpen(true)}
        />
      </main>

      <Footer
        onSelectCollection={setSelectedCategory}
        onOpenInquiryDrawer={() => setDrawerOpen(true)}
      />

      <ArtworkModal
        artwork={modalState.artwork}
        initialFormat={modalState.format}
        currency={currency}
        watermarkMode={watermarkMode}
        onClose={() => setModalState((prev) => ({ ...prev, artwork: null }))}
        onPrev={() => handleStepModal(-1)}
        onNext={() => handleStepModal(1)}
        onAddToBag={handleAddToBag}
      />

      <InquiryBagDrawer
        open={drawerOpen}
        items={bagItems}
        currency={currency}
        onClose={() => setDrawerOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setBagItems([])}
      />
    </div>
  );
}

export default App;
