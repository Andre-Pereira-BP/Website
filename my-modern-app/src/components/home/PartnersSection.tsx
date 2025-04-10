import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PartnersSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Partners logos - update paths to match your project structure
  const partners = [
    "img/logo_benteler.png",
    "img/logo_BorgWarner.png",
    "img/logo_embraer.png",
    "img/logo_exercito.png",
    "img/logo_hanon.png", 
    "img/logo_incm.png",
    "img/logo_jdeus.png",
    "img/logo_kemet.png",
    "img/logo_lnec.png",
    "img/logo_lP.png",
    "img/logo_lPQ.png",
    "img/logo_lSQ.png",
    "img/logo_siemens.png",
    "img/logo_te.png",
    "img/logo_Vishay.png",
    "img/logo_visteon.png",
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet
      } else {
        setItemsPerSlide(4); // Desktop
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total number of slides
  const totalSlides = Math.ceil(partners.length / itemsPerSlide);

  // Auto-rotation for carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % totalSlides);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPaused, totalSlides, itemsPerSlide]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };
  
  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setActiveSlide((current) => (current === 0 ? totalSlides - 1 : current - 1));
  };

  // Create slides based on partners and itemsPerSlide
  const slides = Array.from({ length: totalSlides }, (_, i) => {
    const start = i * itemsPerSlide;
    return partners.slice(start, start + itemsPerSlide);
  });

  // Animation variants for fade in
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <section 
      className="py-16 bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Customers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading companies across industries
          </p>
        </motion.div>
        
        {/* Main carousel container */}
        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div 
                key={slideIndex} 
                className="min-w-full flex justify-center items-center gap-6"
              >
                {slide.map((logo, logoIndex) => (
                  <motion.div 
                    key={logoIndex} 
                    className="flex-1 flex justify-center p-6 bg-white rounded-lg shadow-lg mx-2 h-36"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={logo} 
                      alt={`Partner ${slideIndex * itemsPerSlide + logoIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-white transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-white transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeSlide ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;