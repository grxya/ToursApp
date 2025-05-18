'use client'

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Catalog from '@/components/catalog/Catalog';
import BookingModal from '@/components/modal/BookingModal';
import { japanExcursions } from '@/data/excursions';
import { japanTours } from '@/data/tours';
import { FaFire, FaGem, FaLandmark, FaMountain, FaMapMarkerAlt, FaUtensils, FaCamera } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SakuraPetals = dynamic(() => import('@/components/models/SakuraPetals'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />
});

const SakuraModel = dynamic(() => import('@/components/models/SakuraModel'), {
  ssr: false,
  loading: () => <div className="h-40 w-40 rounded-full animate-pulse" />
});

const JapanPage = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (section) {
        const animateIn = () => {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateIn();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        observer.observe(section);
      }
    });
  }, []);

  const addToSectionRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      sectionRefs.current.push(el);
    }
  };

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen overflow-hidden relative">
      <Head>
        <title>Japan | Black Travel</title>
        <meta name="description" content="Discover the wonders of Japan" />
      </Head>

      <div className="absolute inset-0 pointer-events-none">
        <SakuraPetals />
      </div>

      <main className="container mx-auto px-4 py-12 md:py-20 relative z-10">

        <section ref={addToSectionRefs} className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
            Japan
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Where ancient traditions harmonize with cutting-edge innovation, and every season tells a story.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaLandmark className="text-3xl" />,
                title: "Rich Heritage",
                desc: "Over 5,000 temples and shrines across the country"
              },
              {
                icon: <FaGem className="text-3xl" />,
                title: "Natural Beauty",
                desc: "From cherry blossoms to snow-capped mountains"
              },
              {
                icon: <FaFire className="text-3xl" />,
                title: "Mount Fuji",
                desc: "The iconic sacred volcano"
              },
              {
                icon: <FaMountain className="text-3xl" />,
                title: "Diverse Seasons",
                desc: "Each with unique charm and traditions"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-pink-500/30 transition-all">
                <div className="text-pink-400 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section ref={addToSectionRefs} className="py-20 mb-24 bg-gradient-to-br from-pink-900/20 to-purple-900/10 rounded-3xl overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Sakura - Soul of Japan
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          The cherry blossom symbolizes the ephemeral nature of life in Japanese culture. 
          The annual hanami (flower viewing) tradition brings people together to celebrate 
          beauty and transience.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            "National symbol of renewal",
            "Featured in art and poetry",
            "Celebrated in festivals",
            "Over 200 varieties across Japan"
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="text-pink-400 mr-2">•</span>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="relative w-full h-80 md:h-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-900/30 to-purple-900/20 blur-xl" />
          <SakuraModel />
        </div>
      </div>
    </div>
  </div>
</section>

        <section ref={addToSectionRefs} className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Must-Visit Cities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Tokyo",
                desc: "The futuristic capital blending neon lights with ancient temples",
                tag: "Metropolis"
              },
              {
                name: "Kyoto",
                desc: "Cultural heart of Japan with 17 UNESCO World Heritage Sites",
                tag: "Traditional"
              },
              {
                name: "Osaka",
                desc: "Vibrant food capital with castle and modern attractions",
                tag: "Gourmet"
              }
            ].map((city, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gray-700">
                  <Image
                    src={`/japan/${city.name.toLowerCase()}.jpg`} 
                    alt={city.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="relative z-20 h-full flex flex-col justify-end p-6">
                  <span className="inline-block px-3 py-1 bg-pink-500 text-black text-sm font-bold rounded-full mb-2">
                    {city.tag}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                  <p className="text-gray-300">{city.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={addToSectionRefs} className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Unique Experiences</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMapMarkerAlt className="text-2xl" />,
                title: "Temple Tours",
                desc: "Explore ancient shrines and zen gardens with local guides"
              },
              {
                icon: <FaUtensils className="text-2xl" />,
                title: "Kaiseki Dining",
                desc: "Experience traditional multi-course Japanese haute cuisine"
              },
              {
                icon: <FaCamera className="text-2xl" />,
                title: "Photo Walks",
                desc: "Capture stunning landscapes during cherry blossom season"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/30 p-8 rounded-xl border border-gray-700 hover:border-pink-500 transition-all group">
                <div className="text-pink-400 mb-4 group-hover:text-pink-300 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
                <div className="mt-4 pt-4 border-t border-gray-700 group-hover:border-pink-500/50 transition-colors">
                  <span className="text-sm text-pink-400">Seasonal availability</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={addToSectionRefs} className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Excursions & Tours</h2>
          <Catalog tours={japanTours} excursions={japanExcursions} />
        </section>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-black font-semibold py-3 px-6 rounded-xl transition-all shadow-lg"
          >
            Buy a Tour/Excursion
          </button>
        </div>

        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          availableTours={japanTours} 
          availableExcursions={japanExcursions}
        />

      </main>
    </div>
  );
};

export default JapanPage;