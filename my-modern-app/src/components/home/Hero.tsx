import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Automotive Industry",
      subtitle: "We Test for Your Success",
      image: "https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_305628495-scaled.jpeg",
      buttonText: "Learn More"
    },
    {
      title: "Quality Control",
      subtitle: "We Test for Your Success",
      image: "https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_402991030.jpg",
      buttonText: "Learn More"
    },
    {
      title: "High Voltage Test ⚡",
      subtitle: "We Test for Your Success",
      image: "https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_437936229.jpg",
      buttonText: "Learn More"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
          <img 
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 relative z-10 text-white">
            <h2 className="text-lg md:text-xl font-medium italic mb-2">{slide.subtitle}</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-2xl">{slide.title}</h1>
            <button className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-md flex items-center transition-colors">
              {slide.buttonText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-primary' : 'bg-white opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;