import { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernLayout from '../components/layout/Layout';

interface TestSystemCardProps {
  id: string;
  title: string;
  icon: JSX.Element;
  image: string;
  description: string;
  examples: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

const TestSystems = () => {
  const [selectedSystem, setSelectedSystem] = useState<TestSystemCardProps | null>(null);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Systems data - reordered as requested
  const systems: TestSystemCardProps[] = [
    {
      id: "development",
      title: "Product Development",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      image: "img/prod_dev.jpg",
      description: "Test systems for product development, measuring product parameters for performance, durability and innovation.",
      examples: [
        {
          title: "HVAC Testing System",
          description: "Advanced testing system for HVAC components with temperature, pressure, and flow measurements in controlled environments.",
          image: "img/hvac.jpg"
        },
        {
          title: "Battery Test Bench",
          description: "High-precision test bench for electric vehicle battery development with voltage, current, and temperature monitoring.",
          image: "img/ev_chargers-crop.jpg"
        },
        {
          title: "Prototype Validation System",
          description: "Comprehensive validation system for early-stage prototypes with multiple sensor inputs and data analysis.",
          image: "img/tech_car-scaled.jpeg"
        }
      ]
    },
    {
      id: "production",
      title: "Production",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      image: "img/prod.jpg",
      description: "EOL testers and test benches. Integration of vision, data acquisition and instrumentation, DMM, RF test, protocol analyzers, RDS, Wi-Fi, Bluetooth, DoIP, Ethernet. Communication CAN, LIN, I2C. Programmable power supplies LV and HV test.",
      examples: [
        {
          title: "End-of-Line Tester",
          description: "Fully automated EOL tester for automotive electronics with comprehensive test coverage and high throughput.",
          image: "img/prod.jpg"
        },
        {
          title: "Display Testing System",
          description: "Vision-based system for testing and calibrating automotive displays with automated evaluation of brightness, color, and pixel defects.",
          image: "img/fabrica.jpg"
        },
        {
          title: "Robotic Assembly Tester",
          description: "Integrated robotic system for testing components during the assembly process with real-time feedback.",
          image: "img/chip.jpg"
        }
      ]
    },
    {
      id: "quality",
      title: "Quality",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      image: "img/cientist.jpg",
      description: "Test systems for product quality control, audit stations, test benches, Burn-In/Run-In and Vibration testers (NVH).",
      examples: [
        {
          title: "Burn-In Test System",
          description: "Temperature-controlled burn-in system for electronics with continuous monitoring and failure detection.",
          image: "img/cientist.jpg"
        },
        {
          title: "NVH Analysis System",
          description: "Advanced vibration and acoustic testing system for automotive components with FFT analysis and reporting.",
          image: "img/flow.jpg"
        },
        {
          title: "Quality Audit Station",
          description: "Comprehensive audit station for final quality verification with multiple inspection points and automated reporting.",
          image: "img/tech_touch.jpg"
        }
      ]
    }
  ];

  // Detail Modal
  const DetailModal = ({ system, onClose }: { system: TestSystemCardProps, onClose: () => void }) => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={system.image} 
              alt={system.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mb-4">
                  {system.icon}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{system.title}</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-8">{system.description}</p>
            
            <h3 className="text-xl font-bold mb-4 text-primary">Example Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {system.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={example.image} 
                      alt={example.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">{example.title}</h4>
                    <p className="text-gray-600 text-sm">{example.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Card Component
  const TestSystemCard = ({ system }: { system: TestSystemCardProps }) => {
    return (
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-full flex flex-col"
        onClick={() => setSelectedSystem(system)}
      >
        <div className="h-56 overflow-hidden relative">
          <img 
            src={system.image} 
            alt={system.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white mb-2">
              {system.icon}
            </div>
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-3 font-montserrat">{system.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{system.description}</p>
          <button 
            className="mt-auto inline-flex items-center text-primary font-medium hover:text-primary-dark"
          >
            View Examples
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <ModernLayout title="Test Systems">
      {/* Intro Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <p className="text-lg text-gray-600 mb-8">
              BridgePoint provides custom test systems for various stages of your product lifecycle, 
              from development to production and quality assurance. Our specialized solutions help you 
              test faster, improve quality control, and reduce costs.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Systems Grid */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {systems.map((system, index) => (
              <motion.div
                key={system.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                variants={fadeInUp}
              >
                <TestSystemCard system={system} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSystem && (
          <DetailModal 
            system={selectedSystem} 
            onClose={() => setSelectedSystem(null)}
          />
        )}
      </AnimatePresence>
      
      {/* CTA Banner */}
      <section className="py-16 bg-primary relative overflow-hidden">
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
          <div className="flex flex-col md:flex-row items-center justify-between text-white">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat text-white">Need a Custom Test Solution?</h2>
              <p className="text-white/90 max-w-2xl">
                Our engineering team is ready to design and develop a testing system 
                tailored to your specific requirements.
              </p>
            </div>
            <div>
              <a 
                href="/contact" 
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </ModernLayout>
  );
};

export default TestSystems;