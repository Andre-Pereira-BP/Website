import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Define interface for Modal props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

// Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className={`${maxWidth} w-full bg-white rounded-lg shadow-xl overflow-hidden`}
          >
            <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Legal Content Components
const PrivacyPolicyContent: React.FC = () => (
  <div className="prose max-w-none">
    <h2>Privacy Policy</h2>
    <p>Last updated: April 9, 2025</p>
    
    <h3>1. Introduction</h3>
    <p>
      BridgePoint ("we", "our", or "us") is committed to protecting the privacy of our users. This Privacy Policy explains 
      how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
    </p>
    
    <h3>2. Information We Collect</h3>
    <p>We may collect information about you in a variety of ways:</p>
    <ul>
      <li><strong>Personal Data:</strong> Name, email address, phone number, and other identifiers you provide when contacting us.</li>
      <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, pages visited, and time spent.</li>
      <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze website traffic.</li>
    </ul>
    
    <h3>3. How We Use Your Information</h3>
    <p>The information we collect may be used to:</p>
    <ul>
      <li>Provide, operate, and maintain our website and services</li>
      <li>Respond to your inquiries and fulfill your requests</li>
      <li>Send you information about our products and services</li>
      <li>Improve our website functionality and user experience</li>
      <li>Comply with legal obligations</li>
    </ul>
    
    <h3>4. Disclosure of Your Information</h3>
    <p>We may share your information with:</p>
    <ul>
      <li>Service providers who assist us in operating our website and conducting our business</li>
      <li>Legal and regulatory authorities, as required by applicable laws</li>
      <li>Business partners with your consent</li>
    </ul>
    
    <h3>5. Security of Your Information</h3>
    <p>
      We use administrative, technical, and physical security measures to protect your personal information. 
      However, no system is completely secure, and we cannot guarantee the absolute security of your information.
    </p>
    
    <h3>6. Your Rights</h3>
    <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
    <ul>
      <li>Access to and correction of your personal information</li>
      <li>Deletion of your personal information</li>
      <li>Restriction or objection to processing</li>
      <li>Data portability</li>
    </ul>
    
    <h3>7. Changes to This Privacy Policy</h3>
    <p>
      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
      Privacy Policy on this page and updating the "Last updated" date.
    </p>
    
    <h3>8. Contact Us</h3>
    <p>
      If you have any questions about this Privacy Policy, please contact us at:
      <br />
      <a href="mailto:geral@bridgepoint.pt" className="text-blue-700">geral@bridgepoint.pt</a>
    </p>
  </div>
);

const TermsContent: React.FC = () => (
  <div className="prose max-w-none">
    <h2>Terms and Conditions</h2>
    <p>Last updated: April 9, 2025</p>
    
    <h3>1. Acceptance of Terms</h3>
    <p>
      By accessing and using the BridgePoint website, you accept and agree to be bound by the terms and provisions of this agreement.
    </p>
    
    <h3>2. Use License</h3>
    <p>
      Permission is granted to temporarily view the materials on BridgePoint's website for personal, non-commercial use only. 
      This is the grant of a license, not a transfer of title, and under this license you may not:
    </p>
    <ul>
      <li>Modify or copy the materials</li>
      <li>Use the materials for any commercial purpose</li>
      <li>Remove any copyright or other proprietary notations from the materials</li>
      <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
    </ul>
    
    <h3>3. Disclaimer</h3>
    <p>
      The materials on BridgePoint's website are provided on an 'as is' basis. BridgePoint makes no warranties, 
      expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
      implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
      of intellectual property or other violation of rights.
    </p>
    
    <h3>4. Limitations</h3>
    <p>
      In no event shall BridgePoint or its suppliers be liable for any damages (including, without limitation, 
      damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
      to use the materials on BridgePoint's website, even if BridgePoint or a BridgePoint authorized representative 
      has been notified orally or in writing of the possibility of such damage.
    </p>
    
    <h3>5. Accuracy of Materials</h3>
    <p>
      The materials appearing on BridgePoint's website could include technical, typographical, or photographic errors. 
      BridgePoint does not warrant that any of the materials on its website are accurate, complete, or current.
    </p>
    
    <h3>6. Links</h3>
    <p>
      BridgePoint has not reviewed all of the sites linked to its website and is not responsible for the contents of 
      any such linked site. The inclusion of any link does not imply endorsement by BridgePoint of the site. 
      Use of any such linked website is at the user's own risk.
    </p>
    
    <h3>7. Modifications</h3>
    <p>
      BridgePoint may revise these terms of service for its website at any time without notice. By using this website 
      you are agreeing to be bound by the then current version of these terms of service.
    </p>
    
    <h3>8. Governing Law</h3>
    <p>
      These terms and conditions are governed by and construed in accordance with the laws of Portugal and you 
      irrevocably submit to the exclusive jurisdiction of the courts in that location.
    </p>
  </div>
);

const Footer: React.FC = () => {
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
      title: "COMPANY",
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
      title: "CONTACT",
      links: [
        { label: "Sales", path: "/contact#sales", isExternal: false },
        { label: "Engineering", path: "/contact#engineering", isExternal: false },
        { label: "Support", path: "/contact#support", isExternal: false },
        { label: "LinkedIn", path: "https://pt.linkedin.com/company/bridgepoint-test-systems", isExternal: true }
      ]
    }
  ];
  
  return (
    <>
      <footer className="bg-blue-800 text-white relative overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-4">
            {/* Column 1: Logo and About - Full width on mobile, defined grid on desktop */}
            <motion.div 
              className="col-span-1 lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeInUp}
            >
              <img 
                src="img/logo_bp_bw.png" 
                alt="BridgePoint" 
                className="h-12 md:h-14 mb-6"
              />
              <p className="text-sm text-gray-200 mb-6 leading-relaxed max-w-xs">
                BridgePoint is a systems engineering company specializing in the development of custom test and measurement systems, monitoring and data acquisition, digital signal processing, control, and artificial vision.
              </p>
              
              {/* Certifications */}
              <div className="mt-6">
                <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-white">CERTIFICATIONS</h4>
                <div className="flex space-x-4">
                  <img 
                    src="img/pmelider24_white.png" 
                    alt="PME LIDER 24" 
                    className="h-16 md:h-20 w-auto"
                  />
                  <img 
                    src="img/iso9001.png" 
                    alt="ISO 9001" 
                    className="h-16 md:h-20 w-auto"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Spacer - only visible on desktop */}
            <div className="hidden lg:block lg:col-span-1"></div>
            
            {/* Navigation Columns */}
            {navColumns.map((column, colIndex) => (
              <motion.div 
                key={colIndex}
                className="col-span-1 md:col-span-1 lg:col-span-2"
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
              className="col-span-1 md:col-span-1 lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeInUp}
            >
              <h4 className="text-lg font-bold mb-4 uppercase tracking-wider text-white">HEADQUARTERS</h4>
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
                  <a href="mailto:geral@bridgepoint.pt" className="hover:text-white transition-colors break-all">
                    geral@bridgepoint.pt
                  </a>
                </div>
              </address>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="bg-blue-900 py-4 relative z-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p className="text-center md:text-left mb-3 md:mb-0">© {new Date().getFullYear()} BridgePoint - Engenharia de Sistemas Lda.</p>
            <div className="flex space-x-6">
              {/* Legal links with modal triggers */}
              <button 
                onClick={() => setShowPrivacyPolicy(true)} 
                className="hover:text-white transition-colors focus:outline-none"
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