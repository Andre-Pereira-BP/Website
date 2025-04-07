import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from '../../components/ui/Modal';
import { PrivacyPolicyContent, TermsContent } from '../../components/LegalContent';

const Footer = () => {
  // State for modal visibility
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Navigation columns
  const navColumns = [
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about", isExternal: false },
        { label: "Expertise", path: "/expertise", isExternal: false },
        { label: "Test Systems", path: "/test-systems", isExternal: false },
        { label: "Quality", path: "/quality", isExternal: false },
        { label: "News", path: "/news", isExternal: false },
        { label: "Careers", path: "/careers", isExternal: false }
      ]
    },
    {
      title: "Contact",
      links: [
        { label: "Sales", path: "/contact#sales", isExternal: false },
        { label: "Engineering", path: "/contact#engineering", isExternal: false },
        { label: "Support", path: "/contact#support", isExternal: false },
        { label: "LinkedIn", path: "https://pt.linkedin.com/company/bridgepoint-test-systems", isExternal: true }
      ]
    }
  ];
  
  // Certification logos
  const certifications = [
    { 
      name: "ISO 9001", 
      logo: "https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/03/Home_Certifications_1.png" 
    },
    { 
      name: "PME Líder", 
      logo: "https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/03/Home_Certifications.png" 
    }
  ];
  
  return (
    <>
      <footer className="bg-primary/95 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"></rect>
            </svg>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Logo and About */}
            <motion.div 
              className="col-span-1 lg:col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeInUp}
            >
              <img 
                src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/02/logotipo_BridgePoint_branco-site-1.png" 
                alt="BridgePoint" 
                className="h-10 mb-6"
              />
              <p className="text-sm text-gray-200 mb-6 leading-relaxed max-w-xs">
                BridgePoint is a systems engineering company specializing in the development of custom test and measurement systems, monitoring and data acquisition, digital signal processing, control, and artificial vision.
              </p>
              
              {/* Certifications */}
              <div className="mt-6">
                <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-white">Certifications</h4>
                <div className="flex space-x-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-white p-2 rounded-md w-20 h-20 flex items-center justify-center">
                      <img src={cert.logo} alt={cert.name} className="max-w-full max-h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Navigation Columns */}
            {navColumns.map((column, colIndex) => (
              <motion.div 
                key={colIndex}
                className="col-span-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * colIndex }}
                variants={fadeInUp}
              >
                <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-white">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.isExternal ? (
                        <a 
                          href={link.path} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-200 hover:text-white transition-colors flex items-center group"
                        >
                          <span className="mr-2 w-0 group-hover:w-2 transition-all bg-secondary h-0.5 opacity-0 group-hover:opacity-100"></span>
                          {link.label}
                        </a>
                      ) : (
                        <Link 
                          to={link.path} 
                          className="text-gray-200 hover:text-white transition-colors flex items-center group"
                        >
                          <span className="mr-2 w-0 group-hover:w-2 transition-all bg-secondary h-0.5 opacity-0 group-hover:opacity-100"></span>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            
            {/* Column 4: Headquarters */}
            <motion.div 
              className="col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeInUp}
            >
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-white">Headquarters</h4>
              <address className="not-italic text-sm text-gray-200 leading-relaxed">
                <p className="mb-1">PACT - Parque do Alentejo de Ciência e Tecnologia</p>
                <p className="mb-1">Rua Luís Adelino Fonseca, Lote 1A</p>
                <p className="mb-4">7005-345 Évora, PORTUGAL</p>
                
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+351 210 963 802</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:geral@bridgepoint.pt" className="hover:text-white transition-colors">
                    geral@bridgepoint.pt
                  </a>
                </div>
              </address>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="bg-primary-dark py-4 relative z-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} BridgePoint - Engenharia de Sistemas Lda.</p>
            <div className="mt-2 md:mt-0">
              {/* Legal links with modal triggers */}
              <button 
                onClick={() => setShowPrivacyPolicy(true)} 
                className="hover:text-white transition-colors mr-4 focus:outline-none"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setShowTerms(true)} 
                className="hover:text-white transition-colors focus:outline-none"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <Modal 
        isOpen={showPrivacyPolicy} 
        onClose={() => setShowPrivacyPolicy(false)} 
        title="Privacy Policy"
        maxWidth="max-w-4xl"
      >
        <PrivacyPolicyContent />
      </Modal>

      {/* Terms Modal */}
      <Modal 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
        title="Terms and Conditions"
        maxWidth="max-w-4xl"
      >
        <TermsContent />
      </Modal>
    </>
  );
};

export default Footer;