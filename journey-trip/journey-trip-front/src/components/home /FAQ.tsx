"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiGlobe, FiMap, FiCalendar, FiDollarSign } from 'react-icons/fi';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I buy a tour/excursion?",
      answer: "Booking is simple! Select your desired tour/excursion, choose dates and number of participants, then complete the secure online payment. You'll receive confirmation via email with all details.",
      icon: <FiMap className="text-amber-400" />
    },
    {
      question: "What's included in the tour price?",
      answer: "All our tours include professional guide services, entrance fees to attractions mentioned in itinerary, and transportation during the tour. Meals and accommodations are included only when specified.",
      icon: <FiDollarSign className="text-blue-400" />
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule up to 48 hours before the tour for a full refund. Late cancellations may incur a fee. Please check specific tour conditions as some premium experiences have different policies.",
      icon: <FiCalendar className="text-emerald-400" />
    },
    {
      question: "Do you offer tours in languages other than English?",
      answer: "We provide tours in English, Japanese, and Russian. Some Azerbaijan tours also offer Azerbaijani language guides. Please specify your language preference when booking.",
      icon: <FiGlobe className="text-purple-400" />
    },
    {
      question: "What should I bring on the tour?",
      answer: "We recommend comfortable walking shoes, weather-appropriate clothing, sunscreen, water bottle, and your camera! For specific tours (like hiking), we'll send a detailed packing list after booking."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="py-20 bg-gradient-to-b from-gray-900 to-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-blue-400">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
  Everything you need to know about our tours. Can&apos;t find an answer? Contact our support team.
</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex items-center justify-between p-6 text-left rounded-xl transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-800/50 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  {faq.icon && (
                    <div className="p-2 rounded-lg bg-gray-700">
                      {faq.icon}
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400"
                >
                  <FiChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-2 text-gray-300 bg-gray-800/30 rounded-b-xl border-t border-gray-700">
                      {faq.answer}
                      {index === 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <button className="px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white font-medium">
                            Buy Now
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
  Still have questions? We&apos;re happy to help!
</p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-white font-medium hover:opacity-90 transition-opacity shadow-lg">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;