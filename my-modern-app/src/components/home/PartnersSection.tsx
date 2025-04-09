import { useState, useEffect } from 'react';

const PartnersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Função para paginar para frente ou para trás
  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex((current) => (current === 0 ? partners.length - 1 : current - 1));
    } else {
      setActiveIndex((current) => (current === partners.length - 1 ? 0 : current + 1));
    }
  };

  // Auto-rotação do carousel
  useEffect(() => {
    const interval = setInterval(() => {
      navigate('next');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calcular quais logos mostrar baseado no índice ativo
  // Em telas maiores, mostrar 5 logos; em telas menores, mostrar menos
  const visiblePartners = () => {
    const result = [];
    const count = 5; // Número de logos visíveis de uma vez
    
    for (let i = 0; i < count; i++) {
      const index = (activeIndex + i) % partners.length;
      result.push(partners[index]);
    }
    
    return result;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 border-l-4 border-secondary pl-4">
          Our Customers
        </h2>
        
        <div className="relative">
          {/* Navegação */}
          <button 
            onClick={() => navigate('prev')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="overflow-hidden px-12">
            <div className="flex justify-center items-center space-x-8 py-4">
              {visiblePartners().map((partner, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm w-32 h-24"
                >
                  <img 
                    src={partner} 
                    alt={`Partner ${activeIndex + index}`} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => navigate('next')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center mt-6 space-x-2">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;