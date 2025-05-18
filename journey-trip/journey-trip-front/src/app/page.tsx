import Hero from '@/components/home /Hero';
import Features from '@/components/home /Features';
import SectionNavbar from '@/components/home /SectionNavbar';
import HowItWorks from '@/components/home /HowItWorks';
import Reviews from '@/components/home /Reviews';
import FAQ from '@/components/home /FAQ';

export default function HomePage() {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <Hero />
      <SectionNavbar />
      <Features />
      <HowItWorks />
      <Reviews />
      <FAQ />
    </main>
  );
}
