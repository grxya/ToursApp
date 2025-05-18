"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Megrim, Lato } from 'next/font/google';

const megrim = Megrim({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const smallTextRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const text = textRef.current;
    const smallText = smallTextRef.current;
    const social = socialRef.current;
  
    const tl = gsap.timeline();
  
    gsap.set(title, { y: 0 });
    gsap.set(text, { y: 0 });
    gsap.set(smallText, { y: 0 });
    gsap.set(social, { opacity: 0 });
  
    if (title) {
      const letters = title.querySelectorAll('span');
      gsap.set(letters, { y: 30, opacity: 0 });
  
      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.5)"
      });
    }
    tl.from(text, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");
  
    tl.from(smallText, {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: "power1.out"
    }, "-=0.2");
  
    tl.to(social, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.8
    });
  
    if (title) {
      gsap.to(title, {
        y: 8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  
    return () => {
      gsap.killTweensOf([title, text, smallText, social]);
    };
  }, []);
  

  const renderAnimatedText = (text: string) => {
    return text.split('').map((letter, i) => (
      <span key={i} className="inline-block">
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto object-cover"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className={`text-4xl md:text-8xl font-bold mb-6 leading-tight ${megrim.className}`}
        >
          <span className="text-white">
            {renderAnimatedText('Journey Trips')}
          </span>
        </h1>
        
        <p 
          ref={textRef}
          className={`text-base md:text-lg text-slate-100 mb-1 ${lato.className}`}
        >
          Plan your adventures with our service
        </p>

        <p 
          ref={smallTextRef}
          className={`text-[9px] md:text-[10px] text-slate-300/90 mb-1 mt-9 ${lato.className} max-w-2xl tracking-tight leading-3`}
        >
          *All trips include 24/7 support, local guides, and customizable options to suit your travel style.
          Travel to the best corners of the world, discovering new cultures, stunning landscapes, and unique experiences. Our personalized itineraries will make every journey unforgettable. Start your adventure now!
        </p>
      </div>

      <div 
        ref={socialRef}
        className="fixed right-6 bottom-24 flex flex-col space-y-3 items-center z-50"
      >
        <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2"/>
            <path d="M16 8V5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="2"/>
          </svg>
        </a>
        
        <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94358 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        
        <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}