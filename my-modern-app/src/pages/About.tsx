import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };
  
  // Team members data
  const teamMembers = [
    {
      name: "Engineering Team",
      role: "Development & Testing",
      image: "img/team/bp_team_bw.jpeg"
    },
    {
      name: "Software Team",
      role: "Test Software Development",
      image: "img/team/milton.jpeg"
    },
    {
      name: "Hardware Team",
      role: "Test Hardware Development",
      image: "img/team/santo.jpeg"
    }
  ];
  
  // Core values
  const coreValues = [
    {
      title: "Innovation",
      description: "We continuously seek new ways to improve test systems, staying ahead of industry trends and challenges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Quality",
      description: "We are committed to delivering high-quality test solutions that meet or exceed customer expectations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every project, paying attention to details and ensuring customer satisfaction.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "We work closely with our clients to understand their needs and deliver customized solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];
  
  // Company milestones
  const milestones = [
    {
      year: 2011,
      title: "Foundation",
      description: "BridgePoint was founded as a systems engineering company specializing in test systems."
    },
    {
      year: 2014,
      title: "Growth",
      description: "Expanded operations and opened our first dedicated facility."
    },
    {
      year: 2017,
      title: "Innovation",
      description: "Developed proprietary test methodologies that enhanced our service offerings."
    },
    {
      year: 2020,
      title: "Expansion",
      description: "Opened additional offices to better serve our growing client base."
    },
    {
      year: 2023,
      title: "Recognition",
      description: "Received industry recognition for excellence in test system development."
    }
  ];
  
  return (
    <Layout title="About us">
      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-6 font-montserrat">
                Founded in <span className="text-primary">2011</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                BridgePoint is a systems engineering company specialist in developing test systems for development, production and quality.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our competences in software & hardware development make the difference solving challenges for test and measurement.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With our modular systems, we make our customers successful, testing faster, improving the quality control and cost reduction.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUp}
              className="relative"
            >
              <img 
                src="img/team/team_1024.png" 
                alt="BridgePoint Team" 
                className="rounded-lg shadow-xl w-full h-auto relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/10 rounded-lg -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-10 font-montserrat">Our Mission</h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-3">Our team is passioned for Engineering!!</h3>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-3">We are always ready for a new challenge!!</h3>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-3">We Test for Your Success ✅</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Core Values */}
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
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at BridgePoint
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={scaleIn}
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center font-montserrat">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
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
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the talented professionals behind BridgePoint's success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUp}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-montserrat">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company History/Timeline */}
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
            <h2 className="text-3xl font-bold mb-4 font-montserrat">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped BridgePoint's history
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat text-white">Join Our Team of Innovators</h2>
              <p className="text-white/90 max-w-2xl">
                We're always looking for talented individuals who share our passion for engineering and testing excellence. Explore our current openings and become part of our success story.
              </p>
            </div>
            <div>
              <Link 
                to="/careers" 
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                View Careers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;