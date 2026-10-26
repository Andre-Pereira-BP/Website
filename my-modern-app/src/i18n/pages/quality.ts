import { defineDict } from '../dict';

const en = {
  title: 'Quality',
  subtitle: 'Quality is not a department — it is a mindset embedded in everything we do.',
  seoDescription:
    'ISO 9001:2015 certified quality management, NI Alliance Partner and PME Líder. Discover how BridgePoint ensures reliable, accurate test systems.',
  intro:
    "At BridgePoint, quality is not just a department — it's a mindset embedded in every aspect of our organisation. From design and development to delivery and support, we maintain rigorous standards to ensure our test systems meet the highest specifications for reliability, accuracy and performance.",
  metrics: {
    title: 'Quality by Numbers',
    subtitle: 'Our commitment to quality is reflected in measurable results',
    items: [
      { metric: '99.8%', description: 'On-time delivery for customer projects' },
      { metric: '<0.5%', description: 'Test system defect rate in production' },
      { metric: '90+', description: 'Net Promoter Score from client feedback' },
      { metric: '4000+', description: 'Hours of quality assurance per year' },
    ],
  },
  pillars: {
    title: 'Our Quality Pillars',
    subtitle: 'Four key principles that guide our approach to quality',
    items: [
      { title: 'Process Excellence', description: 'Our structured development methodology ensures consistent quality across all projects. We implement detailed documentation, standardised procedures and regular process audits to maintain excellence.' },
      { title: 'Continuous Improvement', description: 'We embrace the kaizen philosophy of continuous improvement. Through regular reviews, feedback analysis and the implementation of lessons learned, we constantly enhance our systems and processes.' },
      { title: 'Rigorous Testing', description: 'Every system we develop undergoes comprehensive testing protocols. Our multi-stage verification process includes unit testing, integration testing, system validation and environmental stress testing.' },
      { title: 'Customer Focus', description: 'Our quality systems are built around customer requirements and expectations. Regular feedback collection, satisfaction surveys and collaborative review sessions ensure our solutions meet and exceed client needs.' },
    ],
  },
  certifications: {
    title: 'Certifications & Achievements',
    subtitle: 'Our quality standards are recognised by leading industry organisations',
    keyAchievements: 'Key achievements',
    toggle: 'Show details',
    items: [
      {
        name: 'ISO 9001:2015',
        description: 'Our ISO 9001:2015 certification demonstrates our commitment to consistent quality management systems across all operations. This internationally recognised standard ensures that our test systems and solutions meet the highest quality benchmarks.',
        achievements: ['Successfully recertified in February 2024', 'Comprehensive documentation system for all processes', 'Regular internal and external audits', 'Continuous improvement framework', 'Customer feedback integrated into processes'],
      },
      {
        name: 'NI Alliance Partner',
        description: 'As a National Instruments Alliance Partner, BridgePoint has demonstrated exceptional expertise in developing test systems using NI technologies. This partnership ensures we remain at the forefront of test and measurement technology.',
        achievements: ['Access to advanced NI technologies', 'Specialised training and certifications for our engineers', 'Collaborative development with NI technical resources', 'Early access to new testing technologies', 'Participation in industry-specific focus groups'],
      },
      {
        name: 'PME Líder 2024',
        description: 'The PME Líder status recognises BridgePoint as a leading small and medium enterprise in Portugal with an excellent performance and growth profile. This distinction acknowledges our financial stability and business excellence.',
        achievements: ['Recognition of superior financial performance', 'Demonstration of sustainable business growth', 'Enhanced credibility with clients and partners', 'Access to specialised funding and resources', 'Network of business excellence and best practices'],
      },
      {
        name: 'Top 5% Portuguese SMEs 2022',
        description: 'Our company ranks among the top 5% of Portuguese SMEs in 2022, demonstrating excellence in financial performance, innovation and sustainable business practices.',
        achievements: ['Recognised among the elite of Portuguese SMEs', 'Superior financial performance metrics', 'Demonstrated business sustainability and resilience', 'Contribution to the local economy and job creation', 'Recognition of innovation and market adaptability'],
      },
    ],
  },
  documents: {
    title: 'Quality Documents',
    subtitle: 'Our quality management documents, available for clients and suppliers',
    download: 'Download',
    onlyIn: 'Portuguese only',
    items: [
      { title: 'Quality Policy', description: "BridgePoint's commitment to quality, customer satisfaction and continuous improvement." },
      { title: 'Quality Manual', description: 'How our ISO 9001:2015 quality management system is organised across the company.' },
      { title: 'Supplier Evaluation Criteria', description: 'The criteria we use to select, evaluate and monitor our suppliers.' },
    ],
  },
  journey: {
    title: 'Our Quality Journey',
    subtitle: 'Key milestones in our commitment to excellence',
    items: [
      { year: 2011, title: 'BridgePoint Foundation', description: 'Established with quality as a core principle of our business model.' },
      { year: 2013, title: 'First ISO 9001 Certification', description: 'Achieved our initial ISO 9001 certification, demonstrating our commitment to quality management.' },
      { year: 2015, title: 'Quality Management System Expansion', description: 'Extended our quality management system to cover all operational areas.' },
      { year: 2018, title: 'NI Alliance Partnership', description: 'Became a National Instruments Alliance Partner, recognising our expertise in test systems.' },
      { year: 2020, title: 'TÜV Rheinland Certification', description: 'Achieved specialised certification for high-voltage testing capabilities.' },
      { year: 2023, title: 'PME Líder Recognition', description: 'Recognised as a leading SME for business excellence and growth.' },
    ],
  },
  approach: {
    titleStart: 'Our Approach to',
    titleHighlight: 'Quality',
    p1: 'Quality at BridgePoint is an integral part of our DNA, not an afterthought. Our quality management system is designed to proactively identify and address potential issues before they impact our deliverables.',
    p2: 'Through systematic review processes, comprehensive documentation and regular validation activities, we ensure that each test system we develop meets the highest standards of reliability and accuracy.',
    points: ['Detailed quality planning for every project', 'Comprehensive testing at every development stage', 'Automated validation procedures to ensure consistency', 'Ongoing monitoring of delivered systems'],
    imageAlt: 'Quality assurance at BridgePoint',
  },
  cta: {
    title: 'Experience the BridgePoint Quality Difference',
    text: 'Ready to see how our commitment to quality translates into superior test systems for your business? Contact our team to discuss your testing requirements.',
  },
};

export type QualityDict = typeof en;

const pt: QualityDict = {
  title: 'Qualidade',
  subtitle: 'A qualidade não é um departamento — é uma forma de estar presente em tudo o que fazemos.',
  seoDescription:
    'Gestão da qualidade certificada ISO 9001:2015, NI Alliance Partner e PME Líder. Saiba como a BridgePoint garante sistemas de teste fiáveis e precisos.',
  intro:
    'Na BridgePoint, a qualidade não é apenas um departamento — é uma forma de estar presente em toda a organização. Da conceção e desenvolvimento à entrega e suporte, mantemos padrões exigentes para garantir que os nossos sistemas de teste cumprem as mais elevadas especificações de fiabilidade, exatidão e desempenho.',
  metrics: {
    title: 'A Qualidade em Números',
    subtitle: 'O nosso compromisso com a qualidade traduz-se em resultados mensuráveis',
    items: [
      { metric: '99,8%', description: 'Projetos entregues dentro do prazo' },
      { metric: '<0,5%', description: 'Taxa de defeitos dos sistemas de teste em produção' },
      { metric: '90+', description: 'Net Promoter Score dos nossos clientes' },
      { metric: '4000+', description: 'Horas de garantia da qualidade por ano' },
    ],
  },
  pillars: {
    title: 'Os Nossos Pilares da Qualidade',
    subtitle: 'Quatro princípios que orientam a nossa abordagem à qualidade',
    items: [
      { title: 'Excelência nos Processos', description: 'A nossa metodologia de desenvolvimento estruturada garante uma qualidade consistente em todos os projetos. Aplicamos documentação detalhada, procedimentos normalizados e auditorias regulares aos processos.' },
      { title: 'Melhoria Contínua', description: 'Adotamos a filosofia kaizen de melhoria contínua. Através de revisões regulares, análise de feedback e aplicação das lições aprendidas, melhoramos constantemente os nossos sistemas e processos.' },
      { title: 'Testes Rigorosos', description: 'Todos os sistemas que desenvolvemos passam por protocolos de teste completos. O nosso processo de verificação em várias fases inclui testes unitários, testes de integração, validação de sistema e testes de stress ambiental.' },
      { title: 'Foco no Cliente', description: 'Os nossos sistemas de qualidade são construídos em torno dos requisitos e expectativas dos clientes. A recolha regular de feedback, inquéritos de satisfação e sessões de revisão conjuntas garantem soluções que superam as necessidades dos clientes.' },
    ],
  },
  certifications: {
    title: 'Certificações e Distinções',
    subtitle: 'Os nossos padrões de qualidade são reconhecidos por organizações de referência',
    keyAchievements: 'Principais conquistas',
    toggle: 'Ver detalhes',
    items: [
      {
        name: 'ISO 9001:2015',
        description: 'A certificação ISO 9001:2015 demonstra o nosso compromisso com um sistema de gestão da qualidade consistente em todas as operações. Esta norma reconhecida internacionalmente garante que os nossos sistemas e soluções de teste cumprem os mais elevados padrões de qualidade.',
        achievements: ['Recertificação concluída com sucesso em fevereiro de 2024', 'Sistema documental completo para todos os processos', 'Auditorias internas e externas regulares', 'Modelo de melhoria contínua', 'Feedback dos clientes integrado nos processos'],
      },
      {
        name: 'NI Alliance Partner',
        description: 'Enquanto National Instruments Alliance Partner, a BridgePoint demonstrou uma competência excecional no desenvolvimento de sistemas de teste com tecnologias NI. Esta parceria garante que nos mantemos na vanguarda da tecnologia de teste e medição.',
        achievements: ['Acesso a tecnologias NI avançadas', 'Formação e certificações especializadas para os nossos engenheiros', 'Desenvolvimento em colaboração com os recursos técnicos da NI', 'Acesso antecipado a novas tecnologias de teste', 'Participação em grupos de trabalho setoriais'],
      },
      {
        name: 'PME Líder 2024',
        description: 'O estatuto PME Líder reconhece a BridgePoint como uma pequena e média empresa de referência em Portugal, com um perfil de desempenho e crescimento de excelência. Esta distinção reconhece a nossa solidez financeira e excelência empresarial.',
        achievements: ['Reconhecimento de desempenho financeiro superior', 'Crescimento sustentável do negócio', 'Maior credibilidade junto de clientes e parceiros', 'Acesso a financiamento e recursos especializados', 'Rede de excelência empresarial e boas práticas'],
      },
      {
        name: 'Top 5% PME Portuguesas 2022',
        description: 'Em 2022, a empresa integrou o grupo das 5% melhores PME portuguesas, demonstrando excelência no desempenho financeiro, na inovação e em práticas de negócio sustentáveis.',
        achievements: ['Reconhecida entre a elite das PME portuguesas', 'Indicadores de desempenho financeiro superiores', 'Sustentabilidade e resiliência do negócio', 'Contributo para a economia local e criação de emprego', 'Reconhecimento da inovação e capacidade de adaptação ao mercado'],
      },
    ],
  },
  documents: {
    title: 'Documentos da Qualidade',
    subtitle: 'Os documentos do nosso sistema de gestão da qualidade, disponíveis para clientes e fornecedores',
    download: 'Descarregar',
    onlyIn: 'apenas em inglês',
    items: [
      { title: 'Política da Qualidade', description: 'O compromisso da BridgePoint com a qualidade, a satisfação do cliente e a melhoria contínua.' },
      { title: 'Manual da Qualidade', description: 'Como está organizado o nosso sistema de gestão da qualidade ISO 9001:2015.' },
      { title: 'Critérios de Avaliação de Fornecedores', description: 'Os critérios que usamos para selecionar, avaliar e acompanhar os nossos fornecedores.' },
    ],
  },
  journey: {
    title: 'O Nosso Percurso na Qualidade',
    subtitle: 'Marcos do nosso compromisso com a excelência',
    items: [
      { year: 2011, title: 'Fundação da BridgePoint', description: 'Criada com a qualidade como princípio fundamental do modelo de negócio.' },
      { year: 2013, title: 'Primeira Certificação ISO 9001', description: 'Obtenção da primeira certificação ISO 9001, demonstrando o compromisso com a gestão da qualidade.' },
      { year: 2015, title: 'Alargamento do Sistema de Gestão da Qualidade', description: 'O sistema de gestão da qualidade passou a abranger todas as áreas operacionais.' },
      { year: 2018, title: 'Parceria NI Alliance', description: 'A BridgePoint tornou-se National Instruments Alliance Partner, um reconhecimento da sua competência em sistemas de teste.' },
      { year: 2020, title: 'Certificação TÜV Rheinland', description: 'Obtenção de certificação especializada para capacidades de teste em alta tensão.' },
      { year: 2023, title: 'Reconhecimento PME Líder', description: 'Reconhecida como PME Líder pela excelência e crescimento do negócio.' },
    ],
  },
  approach: {
    titleStart: 'A Nossa Abordagem à',
    titleHighlight: 'Qualidade',
    p1: 'Na BridgePoint, a qualidade faz parte do nosso ADN e nunca é uma reflexão tardia. O nosso sistema de gestão da qualidade foi concebido para identificar e resolver potenciais problemas antes que afetem as nossas entregas.',
    p2: 'Através de processos de revisão sistemáticos, documentação completa e atividades regulares de validação, garantimos que cada sistema de teste que desenvolvemos cumpre os mais elevados padrões de fiabilidade e exatidão.',
    points: ['Planeamento detalhado da qualidade em cada projeto', 'Testes completos em todas as fases de desenvolvimento', 'Procedimentos de validação automáticos para garantir consistência', 'Acompanhamento contínuo dos sistemas entregues'],
    imageAlt: 'Garantia da qualidade na BridgePoint',
  },
  cta: {
    title: 'Descubra a Diferença da Qualidade BridgePoint',
    text: 'Quer perceber como o nosso compromisso com a qualidade se traduz em melhores sistemas de teste para o seu negócio? Fale com a nossa equipa sobre os seus requisitos de teste.',
  },
};

export const qualityDict = defineDict('quality', { en, pt });
