import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import ModernHeader from './Header';
import Footer from './Footer';

interface ModernLayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: ModernLayoutProps) => {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ModernHeader />
      
      <main className="flex-grow pt-20">
        {/* Optional title with subtle animation */}
        {title && (
          <motion.div 
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-montserrat">
              {title}
            </h1>
            <div className="h-1 w-24 bg-primary mt-2 rounded-full"></div>
          </motion.div>
        )}
        
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;