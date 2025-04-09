import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernLayout from '../components/layout/Layout';

const Home = () => {
  // Hero slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Hero slider data
  const heroSlides = [
    {
      title: "Testing Excellence for Automotive Industry",
      subtitle: "We Test for Your Success",
      description: "Advanced testing solutions for automotive components and systems",
      image: "img/tech_car.jpeg",
      buttonText: "Explore Solutions",
      buttonLink: "/test-systems"
    },
    {
      title: "Quality Control Systems",
      subtitle: "We Test for Your Success",
      description: "Ensuring product quality through innovative testing approaches",
      image: "img/tech_touch.jpg",
      buttonText: "Our Expertise",
      buttonLink: "/expertise"
    },
    {
      title: "High Voltage Test Solutions ⚡",
      subtitle: "We Test for Your Success",
      description: "Advanced testing for electric vehicle components and power systems",
      image: "img/car_charging.jpg",
      buttonText: "Discover More",
      buttonLink: "/expertise/data-acquisition"
    }
  ];

  // Services data
  const services = [
    {
      title: "Automotive",
      icon: "🚗",
      image: "img/car_interior-scaled.jpeg",
      description: "Comprehensive testing solutions for the automotive industry",
      items: [
        "Infotainment Systems",
        "Instrument Clusters",
        "Display Systems",
        "Compressors",
        "Intercoolers"
      ],
      link: "/test-systems"
    },
    {
      title: "Electric Vehicles",
      icon: "⚡",
      image: "img/ev_chargers-crop.jpg",
      description: "Specialized testing for EV components and systems",
      items: [
        "E-Motors",
        "Inverters",
        "Battery Management Systems",
        "Electronic Control Units",
        "Battery Coolers"
      ],
      link: "/expertise"
    },
    {
      title: "Electronic Components",
      icon: "🔌",
      image: "img/chip.jpg",
      description: "Precision testing for electronic devices and components",
      items: [
        "Capacitors",
        "Relays",
        "PCBs",
        "Sensors",
        "Actuators"
      ],
      link: "/expertise"
    }
  ];

  // Partners data
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

  // Certifications data
  const certifications = [
    {
      image: "img/iso9001.png",
      alt: "ISO Certification"
    },
    {
      image: "img/Alliance-Partner-NI.jpeg",
      alt: "Alliance Partner NI Certification"
    },
    {
      image: "img/LabView_cert.png",
      alt: "LabView Certification"
    },
    {
      image: "img/topscoring5.png",
      alt: "Top Scoring 5% 2022 Certification"
    },
    {
      image: "img/pmelider24.png",
      alt: "PME Lider 2024 Certification"
    }
  ];

  // Auto-play for hero slider
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, heroSlides.length]);

  // Navigation functions for hero slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsAutoPlaying(true);
  };

  // Animation variants for slides
  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <ModernLayout>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Slides */}
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div 
                key={`slide-${index}`}
                className="absolute inset-0"
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1 }}
                variants={slideVariants}
              >
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                  <div className="max-w-2xl text-white">
                  <motion.p 
                    className="text-lg md:text-xl font-medium opacity-90 mb-2 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                    <motion.h1 
                      className="text-4xl md:text-6xl font-bold mb-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      className="text-lg md:text-xl opacity-90 mb-8 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Link 
                        to={slide.buttonLink} 
                        className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-md flex items-center inline-flex transition-colors font-medium"
                      >
                        {slide.buttonText}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
                Testing Excellence Since <span className="text-primary">2011</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                BridgePoint is a systems engineering company specialized in developing test systems 
                for development, production and quality control. With a focus on innovation and 
                precision, we help our clients achieve better quality and efficiency.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                Our competences in software & hardware development make the difference solving 
                challenges for test and measurement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/about" 
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors font-medium"
                >
                  About Us
                </Link>
                <Link 
                  to="/expertise" 
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Our Expertise
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="img/bp_team_bw.jpeg" 
                  alt="BridgePoint Team" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute top-1/2 -right-6 -bottom-6 left-1/2 bg-primary/10 rounded-lg -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive testing solutions across multiple industries
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUp}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center font-montserrat">
                    <span className="mr-2 text-2xl">{service.icon}</span>
                    {service.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{service.description}</p>
                  <ul className="space-y-1 mb-4">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="font-medium flex items-center text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={service.link} 
                    className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors"
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Video Showcase Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <video 
                className="w-full h-full object-cover" 
                controls 
                poster="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_305628495-scaled.jpeg"
              >
                <source src="http://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/Siroco-Robot-v1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Customers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by leading companies across industries
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={fadeIn}
          >
            {partners.map((logo, index) => (
              <div 
                key={index} 
                className="w-32 h-20 bg-white flex items-center justify-center p-4 rounded-md shadow-sm"
              >
                <img 
                  src={logo} 
                  alt={`Partner ${index + 1}`} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Certifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality and industry standards
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-6 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={fadeIn}
          >
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="w-32 h-32 bg-white flex items-center justify-center p-4 rounded-md shadow-md"
              >
                <img 
                  src={cert.image} 
                  alt={cert.alt} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 font-montserrat text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Testing Process?
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Contact us today to discuss how our testing solutions can help you improve quality, 
              reduce costs, and accelerate your development and production cycles.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                to="/contact" 
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-2 md:mb-0 font-montserrat">Latest News</h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              variants={fadeInUp}
            >
              <Link 
                to="/news" 
                className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors"
              >
                View All News
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeInUp}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559570278-eb8d71d06403?q=80&w=2046&auto=format&fit=crop" 
                  alt="News" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-2">March 10, 2024</div>
                <h3 className="text-xl font-bold mb-3 font-montserrat">BridgePoint Announces New Automotive Testing Partnership</h3>
                <p className="text-gray-600 mb-4">BridgePoint has partnered with a leading European automotive manufacturer to develop next-generation testing solutions...</p>
                <Link 
                  to="/news" 
                  className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {/* News Card 2 */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              variants={fadeInUp}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                  alt="News" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-2">February 15, 2024</div>
                <h3 className="text-xl font-bold mb-3 font-montserrat">BridgePoint Achieves ISO 9001:2015 Recertification</h3>
                <p className="text-gray-600 mb-4">We are pleased to announce that BridgePoint has successfully completed the ISO 9001:2015 recertification process...</p>
                <Link 
                  to="/news" 
                  className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            
            {/* News Card 3 */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeInUp}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                  alt="News" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-sm mb-2">January 20, 2024</div>
                <h3 className="text-xl font-bold mb-3 font-montserrat">New High-Voltage Testing Capabilities Unveiled</h3>
                <p className="text-gray-600 mb-4">BridgePoint expands its testing capabilities with new high-voltage test equipment for EV battery systems up to 1500V...</p>
                <Link 
                  to="/news" 
                  className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </ModernLayout>
  );
};

export default Home;