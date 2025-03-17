import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ModernLayout from '../components/layout/Layout';

// Types for our news articles
interface NewsArticle {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  category: 'company' | 'technology' | 'events' | 'projects';
  source?: string;
}

const News = () => {
  // State for articles, article detail view, and filters
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  // Fetch news articles (simulate API call)
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setArticles(newsData);
      setFilteredArticles(newsData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle filtering
  useEffect(() => {
    let result = [...articles];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(article => article.category === activeFilter);
    }
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        article => 
          article.title.toLowerCase().includes(query) || 
          article.summary.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
      );
    }
    
    setFilteredArticles(result);
  }, [activeFilter, searchQuery, articles]);

  // Category filters
  const filters = [
    { value: 'all', label: 'All News' },
    { value: 'company', label: 'Company' },
    { value: 'technology', label: 'Technology' },
    { value: 'events', label: 'Events' },
    { value: 'projects', label: 'Projects' }
  ];

  // Format date nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'company':
        return 'bg-blue-500';
      case 'technology':
        return 'bg-purple-500';
      case 'events':
        return 'bg-green-500';
      case 'projects':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  // News Card Component
  const NewsCard = ({ article }: { article: NewsArticle }) => {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
      >
        <div className="h-48 overflow-hidden relative">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
            {article.category}
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="text-gray-500 text-sm mb-2">{formatDate(article.date)}</div>
          <h3 className="text-xl font-bold mb-3 font-montserrat">{article.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{article.summary}</p>
          <button 
            onClick={() => setSelectedArticle(article)}
            className="mt-auto inline-flex items-center text-primary font-medium hover:text-primary-dark"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </motion.div>
    );
  };

  // Featured article at the top
  const FeaturedNews = () => {
    if (articles.length === 0) return null;
    
    const featured = articles[0]; // Use the first article as featured
    
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto overflow-hidden relative">
            <img 
              src={featured.image} 
              alt={featured.title} 
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 left-4 ${getCategoryColor(featured.category)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
              {featured.category}
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="text-gray-500 text-sm mb-2">{formatDate(featured.date)}</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat">{featured.title}</h2>
            <p className="text-gray-600 mb-6">{featured.summary}</p>
            <button 
              onClick={() => setSelectedArticle(featured)}
              className="inline-flex items-center text-primary font-medium hover:text-primary-dark self-start"
            >
              Read Full Article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Article Detail View
  const ArticleDetail = ({ article, onClose }: { article: NewsArticle, onClose: () => void }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className={`inline-block ${getCategoryColor(article.category)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4`}>
              {article.category}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 font-montserrat">{article.title}</h1>
            <div className="text-white/80 text-sm">{formatDate(article.date)}</div>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            {/* Convert content string to paragraphs */}
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {article.source && (
            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Source: <a href={article.source} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{article.source}</a>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map(index => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <div className="h-48 bg-gray-300 animate-pulse"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <ModernLayout title="News & Updates">
      <div className="min-h-screen">
        {selectedArticle ? (
          // Article Detail View
          <section className="py-10">
            <div className="container mx-auto px-4">
              <ArticleDetail article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            </div>
          </section>
        ) : (
          // News Listing View
          <>
            {/* Featured Article */}
            <section className="py-10">
              <div className="container mx-auto px-4">
                <FeaturedNews />
              </div>
            </section>
            
            {/* Filters and Search */}
            <section className="py-6 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                    {filters.map(filter => (
                      <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeFilter === filter.value
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Search */}
                  <div className="w-full md:w-auto relative">
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* News Grid */}
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        variants={fadeInUp}
                      >
                        <NewsCard article={article} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">No News Found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </section>
            
            {/* Newsletter Signup */}
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
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat text-white">Stay Up to Date</h2>
                  <p className="text-white/90 mb-6">
                    Subscribe to our newsletter to receive the latest news and updates from BridgePoint.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:outline-none"
                    />
                    <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </ModernLayout>
  );
};

// Sample news data
const newsData: NewsArticle[] = [
  {
    id: '1',
    title: 'BridgePoint Announces New Automotive Testing Partnership',
    date: '2024-03-10',
    category: 'company',
    summary: 'BridgePoint has partnered with a leading European automotive manufacturer to develop next-generation testing solutions for electric vehicle components.',
    content: `BridgePoint Test Systems is proud to announce a strategic partnership with one of Europe's leading automotive manufacturers to develop cutting-edge testing solutions specifically designed for electric vehicle (EV) components.\n\nThe partnership will focus on creating innovative test systems for battery management, powertrain efficiency, and thermal control systems, addressing the unique challenges posed by electric vehicles.\n\n"This collaboration represents a significant milestone for BridgePoint," said José Rocha, Managing Director. "By combining our testing expertise with the automotive manufacturer's deep industry knowledge, we'll be able to create solutions that help accelerate the development and production of safer, more efficient electric vehicles."\n\nThe partnership will include joint research and development efforts, knowledge exchange, and the creation of specialized testing equipment for both R&D and production environments. The first prototypes are expected to be deployed by Q3 2024, with full-scale implementation planned for early 2025.\n\nThis announcement comes as BridgePoint continues to expand its footprint in the rapidly growing EV sector, reflecting the company's commitment to supporting the automotive industry's transition to sustainable transportation solutions.`,
    image: 'https://images.unsplash.com/photo-1559570278-eb8d71d06403?q=80&w=2046&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'BridgePoint Achieves ISO 9001:2015 Recertification',
    date: '2024-02-15',
    category: 'company',
    summary: 'We are pleased to announce that BridgePoint has successfully completed the ISO 9001:2015 recertification process, demonstrating our ongoing commitment to quality management.',
    content: `BridgePoint Test Systems is proud to announce its successful recertification to ISO 9001:2015 standards, reaffirming our dedication to maintaining the highest quality management systems across all operations.\n\nThe recertification process involved a comprehensive audit of our quality management processes, including documentation, operational procedures, and continuous improvement mechanisms. The audit confirmed that BridgePoint not only maintains compliance with ISO standards but has strengthened its quality management framework since the previous certification.\n\n"Quality is at the core of everything we do at BridgePoint," commented Luís Raminhos, Managing Director. "This recertification reflects our team's ongoing commitment to excellence and our focus on delivering consistent, high-quality solutions to our clients."\n\nThe ISO 9001:2015 certification covers all aspects of BridgePoint's operations, including design, development, manufacturing, and customer support services for our test systems. This recertification ensures that our clients continue to receive solutions that meet rigorous international quality standards.\n\nAs part of our continuous improvement philosophy, BridgePoint has implemented several enhancements to our quality management system during the recertification process, including streamlined documentation processes, improved training protocols, and enhanced customer feedback mechanisms.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'New High-Voltage Testing Capabilities Unveiled',
    date: '2024-01-20',
    category: 'technology',
    summary: 'BridgePoint expands its testing capabilities with new high-voltage test equipment for EV battery systems up to 1500V.',
    content: `BridgePoint Test Systems has significantly expanded its testing capabilities with the addition of advanced high-voltage test equipment designed specifically for electric vehicle (EV) battery systems operating at up to 1500V.\n\nThis state-of-the-art equipment enhances our ability to develop comprehensive testing solutions for the latest generation of electric vehicles, which are increasingly utilizing higher voltage systems to improve efficiency and performance.\n\nThe new capabilities include:\n\n- Precision high-voltage measurement systems with accuracy better than ±0.05%\n- Advanced safety isolation systems exceeding IEC 61010 standards\n- Controlled charge/discharge cycling at up to 500kW\n- Integrated thermal monitoring with millisecond response times\n- Configurable fault simulation for battery management system validation\n\n"As the automotive industry continues its transition to electric propulsion, testing requirements are evolving rapidly," said our Engineering Director. "Our investment in these high-voltage testing capabilities ensures that we can support manufacturers as they develop the next generation of EV technology."\n\nThe expanded testing capabilities are already being utilized in several client projects, supporting both development testing and end-of-line production verification for battery modules and power electronics components.`,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'BridgePoint to Present at European Testing Conference',
    date: '2023-12-05',
    category: 'events',
    summary: 'Our team will be presenting new methodologies for automated test system validation at the upcoming European Testing Conference in Munich.',
    content: `BridgePoint Test Systems is pleased to announce that our engineering team will be presenting at the prestigious European Testing Conference (ETC) in Munich, Germany, scheduled for February 15-17, 2025.\n\nOur presentation, titled "Advanced Methodologies for Automated Validation of Complex Test Systems," will showcase BridgePoint's innovative approach to ensuring accuracy and reliability in automated test environments. The session will cover our proprietary validation frameworks and how they can be applied to high-complexity testing scenarios, particularly in the automotive and electronics industries.\n\nThe presentation will be delivered by our Lead Test Engineer and will include case studies from recent projects that demonstrate significant improvements in test system reliability and reduced validation time.\n\n"Participation in the European Testing Conference provides an excellent opportunity to share our expertise while also learning from other industry leaders," said our Technical Director. "We're looking forward to engaging with the testing community and discussing the evolving challenges in our field."\n\nIn addition to the presentation, BridgePoint will have representatives available at the conference to discuss specific testing challenges and potential solutions. Attendees interested in meeting with our team can schedule appointments in advance through our website or visit our booth at the conference.`,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Case Study: Automotive Display Testing System',
    date: '2023-11-15',
    category: 'projects',
    summary: 'Read about our recently completed project developing an automated testing system for automotive display units with machine vision quality verification.',
    content: `BridgePoint Test Systems has successfully delivered a comprehensive automated testing solution for a major automotive components manufacturer, focused on high-quality verification of infotainment and instrument cluster displays.\n\nThe project addressed the client's need for a highly reliable, high-throughput system capable of validating multiple display parameters while maintaining production line efficiency. The resulting system integrates machine vision technology with precise optical measurements to verify display quality against strict automotive standards.\n\nKey features of the developed solution include:\n\n- Multi-camera inspection system with calibrated color measurement\n- Automated detection of dead pixels, brightness inconsistencies, and color accuracy\n- Touch functionality verification using robotic actuators\n- Comprehensive electrical testing of all interfaces and connections\n- Custom software with intuitive operator interface and detailed reporting\n- Full traceability with database integration\n\nThe implemented system has achieved a cycle time of less than 35 seconds per unit while maintaining detection accuracy exceeding 99.7% for display defects. This represents a 40% improvement in throughput compared to the client's previous testing process, with significantly enhanced defect detection capabilities.\n\n"This project exemplifies our commitment to developing testing solutions that directly address our clients' specific challenges," noted our Project Manager. "By combining optical expertise with our automated testing capabilities, we've delivered a system that significantly improves both quality assurance and production efficiency."\n\nThe client has already commissioned additional systems for deployment across their global manufacturing facilities, building on the success of this initial implementation.`,
    image: 'https://images.unsplash.com/photo-1611174797134-83576e0de4e0?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'BridgePoint Expands North Office to Support Growth',
    date: '2023-10-10',
    category: 'company',
    summary: 'We have expanded our North Office in Monção to accommodate growing team and increased project demands in the region.',
    content: `BridgePoint Test Systems is excited to announce the expansion of our North Office located in Monção, Viana do Castelo. This expansion comes in response to the significant growth in our operations and increased client demand in northern Portugal and neighboring regions.\n\nThe expanded facility includes additional engineering workspace, an enhanced prototyping lab, and dedicated client meeting areas. The office space has doubled in size, allowing for improved workflow and collaboration among our growing team.\n\n"This expansion represents an important milestone in our growth strategy," said José Rocha, Managing Director. "The enhanced facilities will enable us to better serve our clients in northern Portugal and Spain while providing our team with an improved working environment."\n\nThe North Office will continue to focus on specialized testing solutions for the automotive and electronics sectors, with the new facilities enabling more complex system development and testing capabilities. The expansion includes investment in additional test equipment and prototyping tools to support advanced project requirements.\n\nAs part of this growth, BridgePoint is actively recruiting additional engineering talent in the region, with several new positions opening in software development, systems integration, and project management roles.\n\nThe newly expanded office is fully operational as of October 1, 2023, with an official inauguration event planned for later this month.`,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'New Software Framework for Test Automation Released',
    date: '2023-09-05',
    category: 'technology',
    summary: 'BridgePoint announces the release of TestPoint 2.0, our enhanced software framework for test automation with improved data analysis capabilities.',
    content: `BridgePoint Test Systems is proud to announce the release of TestPoint 2.0, a significant update to our proprietary software framework for test automation that introduces enhanced data analysis capabilities and improved user interface features.\n\nTestPoint 2.0 builds on the proven foundation of our testing framework while adding powerful new functionalities designed to streamline test development, execution, and results analysis. The updated platform has been developed based on extensive feedback from both our engineering team and clients using previous versions.\n\nKey enhancements in the new release include:\n\n- Real-time data visualization with customizable dashboards\n- Advanced statistical analysis tools for test results evaluation\n- Improved test sequence editor with drag-and-drop functionality\n- Enhanced report generation with exportable formats for various stakeholders\n- Expanded API for integration with third-party systems and databases\n- Comprehensive test history tracking with version control\n\n"TestPoint 2.0 represents a major step forward in our software capabilities," said our Software Development Manager. "These enhancements will allow our clients to gain deeper insights from their test data while making the overall testing process more efficient."\n\nThe new software has already been deployed in several client projects with extremely positive feedback, particularly regarding the improved data visualization tools and the intuitive user interface.\n\nAll new test systems delivered by BridgePoint will include TestPoint 2.0, while existing clients have the option to upgrade their current installations through our support services team.`,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'BridgePoint Joins European Automotive Testing Alliance',
    date: '2023-08-15',
    category: 'company',
    summary: 'We are pleased to announce our membership in the European Automotive Testing Alliance, collaborating with industry leaders to develop next-generation testing standards.',
    content: `BridgePoint Test Systems is proud to announce our membership in the prestigious European Automotive Testing Alliance (EATA), a consortium of leading testing technology providers, automotive manufacturers, and research institutions dedicated to advancing testing methodologies and standards across the European automotive industry.\n\nJoining this alliance aligns with our strategic focus on innovation and collaboration in the automotive testing sector. Through EATA, BridgePoint will participate in working groups focused on developing standardized approaches to emerging testing challenges, particularly those related to autonomous driving systems, connected vehicles, and electric powertrains.\n\n"Membership in EATA provides us with a valuable platform to collaborate with other industry leaders and contribute to shaping the future of automotive testing," said Luís Raminhos, Managing Director. "It also gives our clients confidence that our solutions are aligned with emerging industry standards and best practices."\n\nAs part of our involvement, BridgePoint will participate in the alliance's annual conference and technology showcase, as well as contribute to technical publications and standards development activities. This engagement will also provide opportunities for knowledge exchange and potential collaborative projects with other alliance members.`,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop'
  }
];

export default News;