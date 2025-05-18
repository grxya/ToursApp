'use client'

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Catalog from '@/components/catalog/Catalog';
import BookingModal from '@/components/modal/BookingModal';
import { excursions } from '@/data/excursions';
import { tours } from '@/data/tours';
import { FaFire, FaGem, FaLandmark, FaMountain, FaMapMarkerAlt, FaUtensils, FaCamera } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const PomegranateModel = dynamic(() => import('@/components/models/PomegranateModel'), {
  ssr: false,
  loading: () => <div className="h-40 w-40 bg-red-900 rounded-full animate-pulse" />
});

const AzerbaijanPage = () => {
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
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <Head>
        <title>Azerbaijan | Black Travel</title>
        <meta name="description" content="Discover the wonders of Azerbaijan" />
      </Head>

      <main className="container mx-auto px-4 py-12 md:py-20">

        
        <section ref={addToSectionRefs} className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-400">
            Azerbaijan
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Where ancient history meets modern energy, and East blends seamlessly with West.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaLandmark className="text-3xl" />,
                title: "Rich History",
                desc: "Over 5,000 historical monuments across the country"
              },
              {
                icon: <FaGem className="text-3xl" />,
                title: "Natural Wealth",
                desc: "Land of oil, gas and precious minerals"
              },
              {
                icon: <FaFire className="text-3xl" />,
                title: "Yanar Dag",
                desc: "The legendary 'Burning Mountain'"
              },
              {
                icon: <FaMountain className="text-3xl" />,
                title: "Diverse Nature",
                desc: "From Caspian shores to Caucasus peaks"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-amber-500/30 transition-all">
                <div className="text-amber-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section ref={addToSectionRefs} className="py-20 mb-24 bg-gradient-to-br from-red-900/20 to-amber-900/10 rounded-3xl overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-amber-400">
                  Pomegranate - Soul of Azerbaijan
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  The pomegranate symbolizes prosperity and abundance in Azerbaijani culture. 
                  With over 200 varieties grown across the country, it represents the diversity 
                  and richness of this ancient land.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "National symbol since antiquity",
                    "Featured in art and architecture",
                    "Key ingredient in cuisine",
                    "Celebrated in festivals"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full h-80 md:h-96">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-900/30 to-amber-900/20 blur-xl" />
                  <PomegranateModel />
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
                name: "Baku",
                desc: "The cosmopolitan capital with its futuristic skyline and medieval Old City",
                tag: "Capital"
              },
              {
                name: "Sheki",
                desc: "Mountain town famous for its Khan's Palace and silk road history",
                tag: "Cultural"
              },
              {
                name: "Gabala",
                desc: "Resort town surrounded by Caucasus mountains and forests",
                tag: "Nature"
              }
            ].map((city, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gray-700">
                  <Image
                    src={`/azerbaijan/${city.name.toLowerCase()}.jpg`} 
                    alt={city.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="relative z-20 h-full flex flex-col justify-end p-6">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-black text-sm font-bold rounded-full mb-2">
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
                title: "Cultural Tours",
                desc: "Explore ancient temples, mosques and historical landmarks"
              },
              {
                icon: <FaUtensils className="text-2xl" />,
                title: "Gastronomy",
                desc: "Taste authentic Azerbaijani cuisine with local chefs"
              },
              {
                icon: <FaCamera className="text-2xl" />,
                title: "Photo Safaris",
                desc: "Capture stunning landscapes with professional guides"
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/30 p-8 rounded-xl border border-gray-700 hover:border-amber-500 transition-all group">
                <div className="text-amber-500 mb-4 group-hover:text-amber-300 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
                <div className="mt-4 pt-4 border-t border-gray-700 group-hover:border-amber-500/50 transition-colors">
                  <span className="text-sm text-amber-500">Available year-round</span>
                </div>
              </div>
            ))}
          </div>
        </section>

<section ref={addToSectionRefs} className="mb-24">
  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Excursions & Tours</h2>
  <Catalog tours={tours} excursions={excursions} />
</section>

<div className="text-center mt-12">
  <button
    onClick={() => setIsBookingOpen(true)}
    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded-xl transition-all shadow-lg"
  >
    Buy a Tour/Excursion
  </button>
</div>

<BookingModal
  isOpen={isBookingOpen}
  onClose={() => setIsBookingOpen(false)}
  availableTours={tours} 
  availableExcursions={excursions}
/>


      </main>
    </div>
  );
};

export default AzerbaijanPage;