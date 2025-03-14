import { useState, useRef, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernLayout from '../components/layout/Layout';

interface ExpertiseArea {
  id: string;
  title: string;
  icon: JSX.Element;
  image: string;
  description: string;
  details: string;
  keyPoints?: string[];
  technologies?: string[];
  caseStudies?: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

const Expertise = () => {
  const [activeArea, setActiveArea] = useState<ExpertiseArea | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setActiveArea(null);
    }
  };

  // Expertise areas data
  const expertiseAreas: ExpertiseArea[] = [
    {
      id: 'software-development',
      title: "Software Development",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      image: "http://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_607045343.jpg",
      description: "Software development for test systems, data acquisition and signal processing.",
      details: "Our software development expertise covers the entire software lifecycle, from requirements gathering to deployment and maintenance. We specialize in creating robust, scalable solutions for test automation, data acquisition, and signal processing applications.",
      keyPoints: [
        "Development using standard platforms: TestStand, LabVIEW, Python and C#",
        "Integration with webservices, databases and automation protocols",
        "Custom test sequences and procedures",
        "Real-time measurement and control systems",
        "Data processing and analysis algorithms"
      ],
      technologies: [
        "LabVIEW", "TestStand", "Python", "C#", ".NET", "SQL Databases", "RESTful APIs", "MQTT", "OPC UA"
      ],
      caseStudies: [
        {
          title: "Automotive ECU Testing Platform",
          description: "Developed a comprehensive software platform for testing electronic control units in automotive applications, with automated test sequences and detailed reporting capabilities.",
          image: "https://images.unsplash.com/photo-1545171709-49f14d8a8b55?q=80&w=2070&auto=format&fit=crop"
        },
        {
          title: "Data Acquisition System for Environmental Monitoring",
          description: "Created a scalable data acquisition system for environmental parameter monitoring, with real-time data visualization and analytics.",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 'hardware-development',
      title: "Hardware Development",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      image: "http://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_79645170.jpg",
      description: "Customized hardware development, electronics and PCB design.",
      details: "Our hardware development team designs and implements customized electronic solutions for testing and measurement applications. We specialize in creating reliable, precision hardware interfaces that meet the specific needs of our clients' test environments.",
      keyPoints: [
        "DUT interfaces and power electronics for high voltage tests",
        "PCB design and manufacturing",
        "Custom measurement and signal conditioning circuits",
        "Capacitor charge/discharge systems",
        "Capacitor short circuit testers",
        "Multiplexers for instrumentation/DUT interfaces"
      ],
      technologies: [
        "Altium Designer", "PSpice", "EAGLE", "High Voltage Systems", "Mixed Signal Design", "EMC/EMI Considerations"
      ],
      caseStudies: [
        {
          title: "High Voltage Test Interface",
          description: "Designed and implemented a high voltage test interface for automotive battery systems, capable of safely handling up to 1000V DC with precision measurement capabilities.",
          image: "https://images.unsplash.com/photo-1565140405258-b7aea9e48a21?q=80&w=2070&auto=format&fit=crop"
        },
        {
          title: "Custom Multiplexer System",
          description: "Developed a custom 256-channel multiplexer system for automated testing of complex electronic assemblies, with minimal crosstalk and high signal integrity.",
          image: "https://images.unsplash.com/photo-1563770775-4a163585bc0d?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 'real-time-control',
      title: "Real-time Control",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: "http://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_133580537.jpg",
      description: "Development of real-time control systems using LabVIEW real-time and FPGA technologies.",
      details: "BridgePoint specializes in developing high-performance real-time control systems that require deterministic operation and rapid response times. Our solutions leverage the power of LabVIEW Real-Time and FPGA technologies to deliver precise control for demanding applications.",
      keyPoints: [
        "Deterministic control loop implementation",
        "FPGA-based hardware acceleration",
        "Seismic 3D test platforms",
        "Hardware-in-the-loop (HIL) testers",
        "Motor control systems",
        "Rapid prototyping of control algorithms"
      ],
      technologies: [
        "LabVIEW Real-Time", "LabVIEW FPGA", "CompactRIO", "PXI Systems", "EtherCAT", "NI Linux Real-Time"
      ],
      caseStudies: [
        {
          title: "Vibration Test Control System",
          description: "Implemented a real-time control system for a multi-axis vibration test platform, with precise synchronization and complex waveform generation capabilities.",
          image: "https://images.unsplash.com/photo-1599507410193-eb308dc5c9f2?q=80&w=2069&auto=format&fit=crop"
        },
        {
          title: "Power Electronics HIL Tester",
          description: "Developed a hardware-in-the-loop test system for power electronics controllers, featuring sub-microsecond response times and accurate power system simulation.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 'robotics-automation',
      title: "Robotics & Automation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      image: "http://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_624383402.jpg",
      description: "Automation and robotics development for complete testers integration in assembly lines.",
      details: "Our robotics and automation expertise enables us to create integrated testing solutions that seamlessly fit into production environments. We design and implement robotic systems that enhance testing efficiency, reliability, and throughput in manufacturing settings.",
      keyPoints: [
        "Robot integration for automated testing",
        "Vision-guided robotics",
        "Collaborative robot (cobot) applications",
        "Production line integration",
        "Custom end-effector design",
        "Safety system implementation"
      ],
      technologies: [
        "ABB Robotics", "KUKA", "Universal Robots", "Machine Vision", "PLC Integration", "Safety PLCs", "Industrial IoT"
      ],
      caseStudies: [
        {
          title: "Automated Display Testing Cell",
          description: "Designed and implemented a robotic testing cell for automotive displays, combining precision handling with machine vision inspection in a production environment.",
          image: "https://images.unsplash.com/photo-1581093458791-9f3c3abffe46?q=80&w=2070&auto=format&fit=crop"
        },
        {
          title: "Collaborative Assembly Verification",
          description: "Developed a collaborative robot solution for final assembly verification in an electronics manufacturing facility, working alongside human operators.",
          image: "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?q=80&w=2069&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 'data-acquisition',
      title: "Data Acquisition & Signal Processing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      image: "http://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_670713727.jpg",
      description: "Data acquisition systems and digital signal processing development.",
      details: "BridgePoint specializes in designing and implementing sophisticated data acquisition and signal processing systems. Our solutions capture, analyze, and interpret complex measurement data with high precision and reliability.",
      keyPoints: [
        "High-speed and precision data acquisition",
        "Multi-channel synchronous measurements",
        "Digital signal processing algorithms",
        "Structural monitoring systems",
        "Modal analysis applications",
        "Noise, vibration, and harshness (NVH) testing",
        "Custom filtering and analysis techniques"
      ],
      technologies: [
        "NI DAQ Hardware", "HBM Systems", "Digital Signal Processing", "Fast Fourier Transform (FFT)", "Wavelets", "Time-Series Analysis", "MATLAB Integration"
      ],
      caseStudies: [
        {
          title: "Structural Health Monitoring System",
          description: "Implemented a distributed data acquisition system for long-term monitoring of structural integrity in critical infrastructure, with advanced signal processing for early fault detection.",
          image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=2070&auto=format&fit=crop"
        },
        {
          title: "Acoustic Analysis Platform",
          description: "Developed a high-fidelity acoustic measurement and analysis system for automotive NVH testing, with real-time visualization and classification of noise sources.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 'vision-systems',
      title: "Vision Systems & Inspection",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      image: "http://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/AdobeStock_213435580.jpg",
      description: "Automated Vision Systems for quality control.",
      details: "Our vision systems expertise enables us to create sophisticated inspection solutions that detect defects, verify assemblies, and ensure product quality. We combine advanced imaging technologies with machine learning to deliver reliable, accurate visual inspection systems.",
      keyPoints: [
        "Automated optical inspection",
        "Multi-camera systems",
        "Machine learning for defect classification",
        "Infotainment display inspection and calibration",
        "Parts dimensional control",
        "Surface defect detection",
        "Color verification and measurement"
      ],
      technologies: [
        "Machine Vision", "Deep Learning", "COGNEX", "NI Vision", "OpenCV", "Image Processing", "Structured Light"
      ],
      caseStudies: [
        {
          title: "Automotive Display Quality Control",
          description: "Developed an automated inspection system for automotive displays, capable of detecting pixel defects, brightness variations, and color accuracy issues at production line speeds.",
          image: "https://images.unsplash.com/photo-1611174797134-83576e0de4e0?q=80&w=1974&auto=format&fit=crop"
        },
        {
          title: "Surface Defect Detection System",
          description: "Implemented a machine learning-based vision system for detecting and classifying surface defects on painted automotive components with high accuracy.",
          image: "https://images.unsplash.com/photo-1563770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    }
  ];

  // Detail Modal Component
  const ExpertiseModal = ({ expertise }: { expertise: ExpertiseArea }) => {
    return (
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div 
          ref={modalRef}
          className="bg-white rounded-xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={expertise.image} 
              alt={expertise.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full mr-4">
                    {expertise.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{expertise.title}</h2>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setActiveArea(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg">{expertise.details}</p>
              
              {expertise.keyPoints && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-primary">Key Capabilities</h3>
                  <ul className="mt-4 space-y-2">
                    {expertise.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {expertise.technologies && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-primary">Technologies</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {expertise.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {expertise.caseStudies && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-primary mb-6">Case Studies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {expertise.caseStudies.map((study, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={study.image} 
                            alt={study.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-lg mb-2">{study.title}</h4>
                          <p className="text-gray-600 text-sm">{study.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
              <button
                onClick={() => setActiveArea(null)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Expertise Card Component
  const ExpertiseCard = ({ expertise }: { expertise: ExpertiseArea }) => {
    const isHovered = hoveredArea === expertise.id;
    
    return (
      <motion.div 
        className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
          isHovered ? 'shadow-xl transform scale-[1.02]' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveArea(expertise)}
        onMouseEnter={() => setHoveredArea(expertise.id)}
        onMouseLeave={() => setHoveredArea(null)}
      >
        <div className="relative h-56 overflow-hidden">
          <img 
            src={expertise.image} 
            alt={expertise.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-6">
              <div className={`flex items-center transition-transform duration-300 ${
                isHovered ? 'transform -translate-y-2' : ''
              }`}>
                <div className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full mr-3">
                  {expertise.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{expertise.title}</h3>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${
                isHovered ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-white/90 text-sm">{expertise.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">{expertise.description}</p>
          <div className="flex items-center text-primary font-medium">
            <span>Learn more</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <ModernLayout title="Our Expertise">
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
              At BridgePoint, we combine deep technical expertise with industry knowledge to 
              deliver innovative test solutions. Our multidisciplinary approach enables us to 
              tackle complex testing challenges across various domains.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Expertise Grid */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                variants={scaleIn}
              >
                <ExpertiseCard expertise={area} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Expertise Modal */}
      <AnimatePresence>
        {activeArea && (
          <ExpertiseModal expertise={activeArea} />
        )}
      </AnimatePresence>
      
      {/* Technology Partners Section */}
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
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Technology Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading technology providers to deliver cutting-edge solutions
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            {/* Partner Logos - Replace with actual partner logos */}
            <div className="w-32 h-16 bg-gray-100 flex items-center justify-center p-2 rounded">
              <img src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/Alliance-Partner-NI.jpeg" alt="National Instruments" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 h-16 bg-gray-100 flex items-center justify-center p-2 rounded">
              <img src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/03/logo_Vishay-300x176.png" alt="Vishay" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 h-16 bg-gray-100 flex items-center justify-center p-2 rounded">
              <img src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/03/logo_kemet-1-300x192.png" alt="Kemet" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 h-16 bg-gray-100 flex items-center justify-center p-2 rounded">
              <img src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/03/logo_siemens-300x176.png" alt="Siemens" className="max-w-full max-h-full" />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Banner */}
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
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat">Ready to Solve Your Testing Challenges?</h2>
              <p className="text-white/90 max-w-2xl">
                Our team of experts is ready to help you develop the optimal testing solution for your specific needs. 
                Contact us today to discuss how our expertise can benefit your project.
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

export default Expertise;