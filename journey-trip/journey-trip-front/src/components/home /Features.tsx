"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Star } from "@/types";
import generateStars from "@/utils/generateStars";


export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const generatedStars = generateStars(100);
    setStars(generatedStars);
    setIsReady(true);
  }, []);  

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
      });

      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.2)",
      });

      starsRef.current.forEach((star) => {
        if (!star) return;

        gsap.set(star, { opacity: 0.3 });
        gsap.to(star, {
          opacity: 1,
          scale: 1.5,
          duration: 0.8 + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative features pt-20 pb-32 bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            ref={(el) => {
              starsRef.current[star.id] = el;
            }}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Features
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Everything you need for perfect journeys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Travel Gear",
              desc: "Premium equipment for your journey",
              iconColor: "bg-amber-100 text-amber-600",
              svg: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              ),
            },
            {
              title: "Smart Routing",
              desc: "Optimized travel routes to save your time",
              iconColor: "bg-blue-100 text-blue-600",
              svg: (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </>
              ),
            },
            {
              title: "Local Guides",
              desc: "Authentic experiences with our local experts",
              iconColor: "bg-emerald-100 text-emerald-600",
              svg: (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                  <circle cx="12" cy="10" r="2" fill="currentColor" />
                  <circle cx="18" cy="15" r="2" fill="currentColor" />
                </>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 mb-5 rounded-full flex items-center justify-center">
                <div
                  className={`w-full h-full ${feature.iconColor} rounded-full flex items-center justify-center`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.svg}
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
