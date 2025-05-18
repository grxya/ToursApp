'use client';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SectionNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', target: 'hero'},
    { name: 'Features', target: 'features' },
    { name: 'How It Works', target: 'how-it-works' },
    { name: 'Reviews', target: 'reviews'},
    { name: 'FAQ', target: 'FAQ'},
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        delay: 0.2
      }}
      className={`sticky top-0 z-50 bg-black border-b ${
        scrolled ? 'border-gray-800' : 'border-transparent'
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.target}
              to={item.target}
              smooth={true}
              duration={500}
              offset={-70}  
              spy={true}
              onSetActive={(to) => setActiveLink(to)}
              className="cursor-pointer px-4 py-3 relative"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className={`text-base font-medium tracking-wide ${
                  activeLink === item.target ? 'text-white' : 'text-gray-400'
                } hover:text-white transition-colors`}
              >
                {item.name}
                {activeLink === item.target && (
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-0.5 bg-white"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}