"use client";

import React, { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { reviews } from "@/data/reviews";

const Reviews = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-500"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="reviews" ref={ref} className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 via-black to-amber-900/20 z-0"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              } 
            }
          }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-blue-400 to-amber-300">
            Voices of Journey
          </h2>
          <p className="text-center text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover authentic experiences through the eyes of fellow travelers in Azerbaijan and Japan
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-20">
          <motion.div
            custom={0}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            className="lg:col-span-3 backdrop-blur-sm bg-white/10 p-6 md:p-8 rounded-2xl border border-amber-400/30 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <FaUserCircle className="text-4xl md:text-5xl text-amber-400" />
                  <div>
                    <h4 className="font-bold text-lg md:text-xl text-white">{reviews[0].name}</h4>
                    <p className="text-gray-400 text-sm">{reviews[0].origin}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-900/30 text-amber-300">
                    {reviews[0].country}
                  </span>
                  <span className="text-xs text-gray-500">{reviews[0].date}</span>
                </div>
                <h5 className="text-base md:text-lg font-semibold text-amber-200 mb-2">{reviews[0].tour}</h5>
                {renderStars(reviews[0].rating)}
              </div>
              <p className="text-gray-300 text-base md:text-lg italic mb-6 flex-grow">&quot;{reviews[0].comment}&quot;</p>
              <div className="border-t border-amber-400/20 pt-4">
                <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.slice(1).map((review, index) => (
              <motion.div
                key={review.id}
                custom={index + 1}
                initial="hidden"
                animate={controls}
                variants={cardVariants}
                className={`backdrop-blur-sm bg-white/10 p-5 md:p-6 rounded-xl border ${
                  review.country === "Azerbaijan" 
                    ? "border-amber-400/30" 
                    : "border-red-400/30"
                } hover:bg-white/15 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <FaUserCircle className={`text-3xl md:text-4xl ${
                      review.country === "Azerbaijan" 
                        ? "text-amber-400" 
                        : "text-red-400"
                    }`} />
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 14 14"
                      className="absolute -bottom-1 -right-1"
                    >
                      <circle 
                        cx="7" 
                        cy="7" 
                        r="6" 
                        fill={review.country === "Azerbaijan" ? "#F59E0B" : "#EF4444"} 
                        stroke="#111827" 
                        strokeWidth="1" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-base md:text-lg">{review.name}</h4>
                    <p className="text-gray-400 text-xs md:text-sm">{review.origin}</p>
                  </div>
                </div>
                <h5 className="font-medium text-gray-200 mb-2 text-sm md:text-base">{review.tour}</h5>
                <div className="flex justify-between items-center mb-3">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-300 italic text-sm md:text-base">&quot;{review.comment}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
          className="relative"
        >
          <div className="backdrop-blur-lg bg-gray-900/80 p-6 md:p-8 rounded-2xl border border-blue-400/30 shadow-lg">
            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-cyan-400 p-2 md:p-3 rounded-full">
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-xl md:text-2xl text-white">Journeys Team</h4>
                <p className="text-blue-300 text-sm md:text-base">Creating bridges between cultures</p>
              </div>
            </div>
            <p className="text-gray-300 text-base md:text-lg mb-6 pl-2 md:pl-4 border-l-2 border-blue-400/50">
              From the fire mountains of Azerbaijan to the tranquil tea houses of Japan - each journey is a unique story. 
              We&rsquo;re honored to be part of yours. Your experiences inspire us to craft even more memorable adventures.
            </p>
            <div className="flex justify-end">
              <button className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white text-sm md:text-base font-medium hover:opacity-90 transition-opacity">
                Share Your Story
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;