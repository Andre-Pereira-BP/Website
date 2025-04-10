import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Monitor scroll position to add shadow/background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'Company' },
    { path: '/test-systems', label: 'Test Systems' },
    { path: '/expertise', label: 'Expertise' },
    { path: '/quality', label: 'Quality' },
    { path: '/news', label: 'News' },
    { path: '/careers', label: 'Join Us' },
    { path: '/contact', label: 'Contact' }
  ];
  
  // Language toggle
  const [language, setLanguage] = useState('en'); // Default to English
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
        <motion.img 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src="img/Logo_Bridgepoint_Header.png" 
          alt="BridgePoint" 
          className="h-14" // Alterado de h-10 para h-14
        />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <nav className="flex items-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <div key={item.path} className="relative px-1">
                  <Link 
                    to={item.path}
                    className={`font-montserrat text-sm font-medium px-4 py-2 rounded-full transition-colors relative z-10 ${
                      isActive ? 'text-white' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Animated background pill for active item */}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </div>
              );
            })}
            
            {/* Language Toggle */}
            <div className="ml-6 flex space-x-2 items-center">
              <button 
                onClick={toggleLanguage} 
                className={`w-8 h-8 flex items-center justify-center rounded-full overflow-hidden border-2 transition-all ${language === 'en' ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src="img/icons/gb.png" alt="English" className="w-full h-full object-cover" />
              </button>
              
              <button 
                onClick={toggleLanguage} 
                className={`w-8 h-8 flex items-center justify-center rounded-full overflow-hidden border-2 transition-all ${language === 'pt' ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src="img/icons/pt.png" alt="Portuguese" className="w-full h-full object-cover" />
              </button>
            </div>
          </nav>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          {/* Language Toggle - Mobile */}
          <div className="mr-4 flex space-x-2">
            <button 
              onClick={toggleLanguage} 
              className={`w-7 h-7 flex items-center justify-center rounded-full overflow-hidden border-2 transition-all ${language === 'en' ? 'border-primary' : 'border-transparent opacity-60'}`}
            >
              <img src="img/icons/gb.png" alt="English" className="w-full h-full object-cover" />
            </button>
            
            <button 
              onClick={toggleLanguage} 
              className={`w-7 h-7 flex items-center justify-center rounded-full overflow-hidden border-2 transition-all ${language === 'pt' ? 'border-primary' : 'border-transparent opacity-60'}`}
            >
              <img src="img/icons/pt.png" alt="Portuguese" className="w-full h-full object-cover" />
            </button>
          </div>
        
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-800 block transition-all transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 block transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 block transition-all transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 bg-white z-40 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="h-full flex flex-col pt-24 px-6">
          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
                
              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-montserrat font-medium py-2 border-b ${
                    isActive 
                      ? 'text-primary border-primary' 
                      : 'text-gray-700 border-gray-200'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;