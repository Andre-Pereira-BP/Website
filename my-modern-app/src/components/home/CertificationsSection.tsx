import { useState } from 'react';

const CertificationsSection = () => {
  
  const certifications = [
    {
      image: "img/certifications/iso9001.png",
      alt: "ISO Certification"
    },
    {
      image: "img/certifications/Alliance-Partner-NI.jpeg",
      alt: "Alliance Partner NI Certification"
    },
    {
      image: "img/certifications/LabView_cert.png",
      alt: "LabView Certification"
    },
    {
      image: "img/certifications/topscoring5.png",
      alt: "Top Scoring 5% 2022 Certification"
    },
    {
      image: "img/certifications/pmelider24.png",
      alt: "PME Lider 2024 Certification"
    }
  ];

  const [currentCert, setCurrentCert] = useState(0);

  const nextCert = () => {
    setCurrentCert((prev) => (prev + 1) % certifications.length);
  };

  const prevCert = () => {
    setCurrentCert((prev) => (prev === 0 ? certifications.length - 1 : prev - 1));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-yellow-500"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          <div className="relative w-full max-w-md">
            <button 
              onClick={prevCert}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="overflow-hidden px-12">
              <div className="flex justify-center">
                <img 
                  src={certifications[currentCert].image}
                  alt={certifications[currentCert].alt}
                  className="max-h-48 object-contain"
                />
              </div>
            </div>
            
            <button 
              onClick={nextCert}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCert(index)}
                className={`w-2 h-2 rounded-full ${index === currentCert ? 'bg-primary' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;