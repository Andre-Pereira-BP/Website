import Layout from '../components/layout/Layout';
import PageHeader from '../components/ui/PageHeader';

const About = () => {
  return (
    <Layout>
      <PageHeader title="About us" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Título da seção */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold border-l-4 border-secondary pl-4">
            ABOUT US
          </h3>
        </div>
        
        {/* Texto de introdução */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">
            Founded in 2011, BridgePoint is a systems engineering company specialist in developing test systems for development, production and quality.
          </h3>
          <h3 className="text-xl font-medium mb-4">
            Our competences in software & hardware development make the difference solving challenges for test and measurement.
          </h3>
          <h3 className="text-xl font-medium mb-4">
            With our modular systems, we make our customers successful, testing faster, improving the quality control and cost reduction.
          </h3>
        </div>
        
        {/* Texto de missão/valores */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-3">Our team is passioned for Engineering!!</h2>
          <h2 className="text-2xl font-bold mb-3">We are always ready for a new challenge!!</h2>
          <h2 className="text-2xl font-bold mb-3">We Test for Your Success ✅</h2>
        </div>
        
        {/* Imagem da equipe 1 */}
        <div className="mb-12">
          <img 
            src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/3a146149-67f8-452d-8dde-8b2484494880.jpeg" 
            alt="BridgePoint Team" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        {/* Imagens da equipe 2 e 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/df0d87a1-cea7-41c2-8d60-ceaae0da79fa.jpeg" 
              alt="BridgePoint Team Member" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img 
              src="https://www.bridgepoint.pt/wordpress/wp-content/uploads/2023/11/9f4e95ac-8705-4d96-8712-b1ad73697cda.jpeg" 
              alt="BridgePoint Team Member" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;