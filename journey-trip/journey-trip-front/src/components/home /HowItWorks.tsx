"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { steps } from "@/data/howItWorksSteps";
import { Star } from "@/types";
import generateStars from "@/utils/generateStars";

const HowItWorks = () => {

  const [stars, setStars] = useState<Star[]>([]);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const generatedStars = generateStars(100); 
    setStars(generatedStars);
  }, []);

  const setStarRef = (el: HTMLDivElement | null, id: number) => {
    if (el) {
      starsRef.current[id] = el;
    }
  };

  return (
    <section id="how-it-works" className="bg-black text-gray-100 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            ref={(el) => setStarRef(el, star.id)}
            className="absolute rounded-full bg-white"
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255, 255, 255, 0.3)`
            }}
          />
        ))}
      </div>

      {/* Градиент для контраста */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/5 to-black z-0"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Travel with Ease – <span className="text-gray-300 relative inline-block">
              <span className="relative z-10">Just 3 Steps</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 -rotate-1 z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-lg relative inline-block">
            Discover unforgettable experiences
            <motion.span
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </p>
        </motion.div>

        <div className="relative min-h-[700px] sm:min-h-[600px]">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`backdrop-blur-sm bg-gray-950 p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:-translate-y-3 absolute w-full sm:w-4/5 md:w-2/3 lg:w-1/2 group ${index % 2 === 0 ? 'left-0' : 'right-0'}`}
              style={{
                top: `${index * 220 + 20}px`,
                boxShadow: '0 10px 30px -15px rgba(0,0,0,0.7)'
              }}
            >
              <div className="flex items-start gap-6 mb-6 relative">
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 bg-gray-900 text-gray-200 rounded-full flex items-center justify-center text-xl font-bold relative overflow-hidden group-hover:bg-gray-800 transition-colors duration-500 border border-gray-700">
                    <span className="relative z-10">{step.number}</span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/70"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: [0.7, 0.9, 0.7] }}
                      transition={{ duration: 3 + index, repeat: Infinity }}
                    />
                  </div>
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-4 text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.3 }}
                    >
                      <FiArrowRight className="w-6 h-6 animate-bounce" />
                    </motion.div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-3 flex items-center gap-3">
                    {step.title}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                      className="text-gray-400 hidden group-hover:inline-block"
                    >
                      <FiCheckCircle />
                    </motion.span>
                  </h3>
                  <p className="text-gray-300 text-base relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
                    {step.description}
                  </p>
                </div>
              </div>
              
              <motion.div 
                className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gray-500/10 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;