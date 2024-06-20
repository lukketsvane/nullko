// app/page.tsx
'use client';
import { Nav } from '@/components/nav';
import { HeroSection } from '@/components/hero-section';
import { TransformSection } from '@/components/transform-section';
import { SegmentSection } from '@/components/segment-section';
import { QueueSection } from '@/components/queue-section';
import { InspirationSection } from '@/components/inspiration-section';
import { StylishWaitSection } from '@/components/stylish-wait-section';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <HeroSection />
      <TransformSection />
      <SegmentSection />
      <QueueSection />
      <InspirationSection />
      <StylishWaitSection />
      <Footer />
    </div>
  );
}
