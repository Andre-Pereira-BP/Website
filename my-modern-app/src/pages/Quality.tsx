import { useState } from 'react';
import { motion } from 'framer-motion';
import ModernLayout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

interface CertificationProps {
  id: string;
  name: string;
  image: string;
  description: string;
  achievements: string[];
}

const Quality = () => {
  // State for expanded certification details
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  //const fadeIn = {
  //  hidden: { opacity: 0 },
  //  visible: { opacity: 1 }
  //};
  
  // Toggle certification details
  const toggleCertification = (id: string) => {
    if (expandedCert === id) {
      setExpandedCert(null);
    } else {
      setExpandedCert(id);
    }
  };
  
  // Certifications data
  const certifications: CertificationProps[] = [
    {
      id: 'iso9001',
      name: 'ISO 9001:2015',
      image: 'img/iso9001.png',
      description: 'Our ISO 9001:2015 certification demonstrates our commitment to consistent quality management systems across all operations. This internationally recognized standard ensures that our test systems and solutions meet the highest quality benchmarks.',
      achievements: [
        'Successfully recertified in February 2024',
        'Comprehensive documentation system for all processes',
        'Regular internal and external audits',
        'Continuous improvement framework',
        'Customer feedback integration into processes'
      ]
    },
    {
      id: 'alliance-partner',
      name: 'NI Alliance Partner',
      image: 'img/Alliance-Partner-NI.jpeg',
      description: 'As a National Instruments Alliance Partner, BridgePoint has demonstrated exceptional expertise in developing test systems using NI technologies. This partnership ensures we remain at the forefront of test and measurement technology.',
      achievements: [
        'Exclusive access to advanced NI technologies',
        'Specialized training and certifications for our engineers',
        'Collaborative development with NI technical resources',
        'Early access to new testing technologies',
        'Participation in industry-specific focus groups'
      ]
    },
    {
      id: 'pme-lider',
      name: 'PME Líder 24',
      image: 'img/pmelider24.png',
      description: 'The PME Líder status recognizes BridgePoint as a leading small and medium enterprise in Portugal with excellent performance and growth profile. This distinction acknowledges our financial stability and business excellence.',
      achievements: [
        'Recognition of superior financial performance',
        'Demonstration of sustainable business growth',
        'Enhanced credibility with clients and partners',
        'Access to specialized funding and resources',
        'Network of business excellence and best practices'
      ]
    },
    {
      id: 'top-sme-2022',
      name: '2022 Top 5% Portuguese SMEs',
      image: 'img/topscoring5.png',
      description: 'Our company ranks among the top 5% of Portuguese SMEs in 2022, demonstrating excellence in financial performance, innovation, and sustainable business practices. This achievement reflects our commitment to quality and growth in the Portuguese business landscape.',
      achievements: [
        'Recognized among elite Portuguese small and medium enterprises',
        'Superior financial performance metrics',
        'Demonstrated business sustainability and resilience',
        'Contribution to local economy and job creation',
        'Recognition of innovation and market adaptability'
      ]
    }
  ];
  
  // Quality metrics
  const qualityMetrics = [
    {
      metric: '99.8%',
      description: 'On-time delivery for customer projects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      metric: '<0.5%',
      description: 'Test system defect rate in production',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      metric: '90+',
      description: 'Net Promoter Score from client feedback',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      metric: '4000+',
      description: 'Hours of quality assurance per year',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ];
  
  // Quality pillars
  const qualityPillars = [
    {
      title: "Process Excellence",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: "Our structured development methodology ensures consistent quality across all projects. We implement detailed documentation, standardized procedures, and regular process audits to maintain excellence."
    },
    {
      title: "Continuous Improvement",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description: "We embrace the kaizen philosophy of continuous improvement. Through regular reviews, feedback analysis, and implementation of lessons learned, we constantly enhance our systems and processes."
    },
    {
      title: "Rigorous Testing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Every system we develop undergoes comprehensive testing protocols. Our multi-stage verification process includes unit testing, integration testing, system validation, and environmental stress testing."
    },
    {
      title: "Customer Focus",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: "Our quality systems are built around customer requirements and expectations. Regular feedback collection, satisfaction surveys, and collaborative review sessions ensure our solutions meet and exceed client needs."
    }
  ];

  // Quality milestones
  const qualityMilestones = [
    {
      year: 2011,
      title: "BridgePoint Foundation",
      description: "Established with quality as a core principle of our business model."
    },
    {
      year: 2013,
      title: "First ISO 9001 Certification",
      description: "Achieved our initial ISO 9001 certification, demonstrating commitment to quality management."
    },
    {
      year: 2015,
      title: "Quality Management System Expansion",
      description: "Extended our quality management system to cover all operational areas."
    },
    {
      year: 2018,
      title: "NI Alliance Partnership",
      description: "Became a National Instruments Alliance Partner, recognizing our expertise in test systems."
    },
    {
      year: 2020,
      title: "TÜV Rheinland Certification",
      description: "Achieved specialized certification for high-voltage testing capabilities."
    },
    {
      year: 2023,
      title: "PME Líder Recognition",
      description: "Recognized as a leading SME for business excellence and growth."
    }
  ];

  return (
    <ModernLayout title="Quality">
      {/* Introduction Section */}
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
              At BridgePoint, quality is not just a department—it's a mindset embedded in every aspect of our organization. 
              From design and development to delivery and support, we maintain rigorous standards to ensure our test systems 
              meet the highest specifications for reliability, accuracy, and performance.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Quality Metrics Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Quality By Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality is reflected in measurable results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityMetrics.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-primary font-montserrat">{item.metric}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quality Pillars Section */}
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
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Quality Pillars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Four key principles that guide our approach to quality
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualityPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold font-montserrat">{pillar.title}</h3>
                </div>
                <p className="text-gray-600 ml-14">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
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
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Certifications & Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our quality standards are recognized by leading industry organizations
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                variants={fadeInUp}
              >
                <div 
                  className="p-6 flex flex-col md:flex-row items-center cursor-pointer"
                  onClick={() => toggleCertification(cert.id)}
                >
                  <div className="w-32 h-32 bg-white flex items-center justify-center p-4 rounded-md shadow-sm mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <img src={cert.image} alt={cert.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold font-montserrat">{cert.name}</h3>
                      <button className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform transition-transform ${expandedCert === cert.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 mt-2">{cert.description}</p>
                  </div>
                </div>
                
                {/* Expanded details */}
                {expandedCert === cert.id && (
                  <motion.div 
                    className="px-6 pb-6 pt-2 border-t border-gray-200 mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-bold mb-3 text-primary">Key Achievements</h4>
                    <ul className="space-y-2">
                      {cert.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quality Journey Timeline */}
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
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Quality Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones in our commitment to excellence
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {qualityMilestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeInUp}
                >
                  <div className={`flex items-center justify-${index % 2 === 0 ? 'end' : 'start'} md:justify-${index % 2 === 0 ? 'end' : 'start'} w-1/2 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} pr-4`}>
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-sm font-bold mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold mb-2 font-montserrat">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Quality Approach with Image */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUp}
            >
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="img/cientist.jpg" 
                  alt="Quality Assurance at BridgePoint" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute top-1/2 -right-6 -bottom-6 left-1/2 bg-primary/10 rounded-lg -z-10"></div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-6 font-montserrat">
                Our Approach to <span className="text-primary">Quality</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Quality at BridgePoint is an integral part of our DNA, not an afterthought. Our quality management system is designed to proactively identify and address potential issues before they impact our deliverables.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Through systematic review processes, comprehensive documentation, and regular validation activities, we ensure that each test system we develop meets the highest standards of reliability and accuracy.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Detailed quality planning for every project</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprehensive testing at every development stage</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated validation procedures to ensure consistency</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ongoing monitoring of delivered systems</span>
                </li>
              </ul>
            </motion.div>
          </div>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat text-white">Experience the BridgePoint Quality Difference</h2>
              <p className="text-white/90 max-w-2xl">
                Ready to see how our commitment to quality translates into superior test systems for your business? Contact our team today to discuss your testing requirements and discover the BridgePoint advantage.
              </p>
            </div>
            <div>
              <Link 
                to="/contact" 
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ModernLayout>
  );
};

export default Quality;