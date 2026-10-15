const en = {
  title: 'Our Expertise',
  subtitle: 'Multidisciplinary engineering for complex test and measurement challenges.',
  seoDescription:
    'Software and hardware development, real-time control, robotics, data acquisition, signal processing and machine vision for test systems.',
  intro:
    'At BridgePoint, we combine deep technical expertise with industry knowledge to deliver innovative test solutions. Our multidisciplinary approach enables us to tackle complex testing challenges across various domains.',
  learnMore: 'Learn more',
  keyCapabilities: 'Key capabilities',
  technologies: 'Technologies',
  caseStudies: 'Case studies',
  partners: {
    title: 'Technology Partners',
    subtitle: 'We collaborate with leading technology providers to deliver cutting-edge solutions',
  },
  cta: {
    title: 'Ready to Solve Your Testing Challenges?',
    text: 'Our team of experts is ready to help you develop the optimal testing solution for your specific needs. Contact us today to discuss how our expertise can benefit your project.',
  },
  areas: [
    {
      title: 'Software Development',
      description: 'Software development for test systems, data acquisition and signal processing.',
      details:
        'Our software development expertise covers the entire software lifecycle, from requirements gathering to deployment and maintenance. We specialise in creating robust, scalable solutions for test automation, data acquisition and signal processing applications.',
      keyPoints: [
        'Development using standard platforms: TestStand, LabVIEW, Python and C#',
        'Integration with web services, databases and automation protocols',
        'Custom test sequences and procedures',
        'Real-time measurement and control systems',
        'Data processing and analysis algorithms',
      ],
      caseStudies: [
        { title: 'VTester - Automotive ECU Testing Platform', description: 'Developed a comprehensive software platform for testing electronic control units in automotive applications, with automated test sequences and detailed reporting capabilities.' },
        { title: 'Data Acquisition System for Environmental Monitoring', description: 'Created a scalable data acquisition system for environmental parameter monitoring, with real-time data visualisation and analytics.' },
      ],
    },
    {
      title: 'Hardware Development',
      description: 'Customised hardware development, electronics and PCB design.',
      details:
        "Our hardware development team designs and implements customised electronic solutions for testing and measurement applications. We specialise in creating reliable, precision hardware interfaces that meet the specific needs of our clients' test environments.",
      keyPoints: [
        'DUT interfaces and power electronics for high voltage tests',
        'PCB design and manufacturing',
        'Custom measurement and signal conditioning circuits',
        'Capacitor charge/discharge systems',
        'Capacitor short circuit testers',
        'Multiplexers for instrumentation/DUT interfaces',
      ],
      caseStudies: [
        { title: 'High Voltage Test Interface', description: 'Designed and implemented a high voltage test interface for automotive battery systems, capable of safely handling up to 1000V DC with precision measurement capabilities.' },
        { title: 'Custom Multiplexer System', description: 'Developed a custom 256-channel multiplexer system for automated testing of complex electronic assemblies, with minimal crosstalk and high signal integrity.' },
      ],
    },
    {
      title: 'Real-time Control',
      description: 'Development of real-time control systems using LabVIEW Real-Time and FPGA technologies.',
      details:
        'BridgePoint specialises in developing high-performance real-time control systems that require deterministic operation and rapid response times. Our solutions leverage LabVIEW Real-Time and FPGA technologies to deliver precise control for demanding applications.',
      keyPoints: [
        'Deterministic control loop implementation',
        'FPGA-based hardware acceleration',
        'Seismic 3D test platforms',
        'Hardware-in-the-loop (HIL) testers',
        'Motor control systems',
        'Rapid prototyping of control algorithms',
      ],
      caseStudies: [
        { title: 'Vibration Test Control System', description: 'Implemented a real-time control system for a multi-axis vibration test platform, with precise synchronisation and complex waveform generation capabilities.' },
        { title: 'Power Electronics HIL Tester', description: 'Developed a hardware-in-the-loop test system for power electronics controllers, featuring sub-microsecond response times and accurate power system simulation.' },
      ],
    },
    {
      title: 'Robotics & Automation',
      description: 'Automation and robotics development for complete tester integration in assembly lines.',
      details:
        'Our robotics and automation expertise enables us to create integrated testing solutions that fit seamlessly into production environments. We design and implement robotic systems that enhance testing efficiency, reliability and throughput in manufacturing settings.',
      keyPoints: [
        'Robot integration for automated testing',
        'Vision-guided robotics',
        'Collaborative robot (cobot) applications',
        'Production line integration',
        'Custom end-effector design',
        'Safety system implementation',
      ],
      caseStudies: [
        { title: 'Automated Display Testing Cell', description: 'Designed and implemented a robotic testing cell for automotive displays, combining precision handling with machine vision inspection in a production environment.' },
        { title: 'Collaborative Assembly Verification', description: 'Developed a collaborative robot solution for final assembly verification in an electronics manufacturing facility, working alongside human operators.' },
      ],
    },
    {
      title: 'Data Acquisition & Signal Processing',
      description: 'Data acquisition systems and digital signal processing development.',
      details:
        'BridgePoint specialises in designing and implementing sophisticated data acquisition and signal processing systems. Our solutions capture, analyse and interpret complex measurement data with high precision and reliability.',
      keyPoints: [
        'High-speed and precision data acquisition',
        'Multi-channel synchronous measurements',
        'Digital signal processing algorithms',
        'Structural monitoring systems',
        'Modal analysis applications',
        'Noise, vibration and harshness (NVH) testing',
        'Custom filtering and analysis techniques',
      ],
      caseStudies: [
        { title: 'Structural Health Monitoring System', description: 'Implemented a distributed data acquisition system for long-term monitoring of structural integrity in critical infrastructure, with advanced signal processing for early fault detection.' },
        { title: 'Acoustic Analysis Platform', description: 'Developed a high-fidelity acoustic measurement and analysis system for automotive NVH testing, with real-time visualisation and classification of noise sources.' },
      ],
    },
    {
      title: 'Vision Systems & Inspection',
      description: 'Automated vision systems for quality control.',
      details:
        'Our vision systems expertise enables us to create sophisticated inspection solutions that detect defects, verify assemblies and ensure product quality. We combine advanced imaging technologies with machine learning to deliver reliable, accurate visual inspection systems.',
      keyPoints: [
        'Automated optical inspection',
        'Multi-camera systems',
        'Machine learning for defect classification',
        'Infotainment display inspection and calibration',
        'Parts dimensional control',
        'Surface defect detection',
        'Colour verification and measurement',
      ],
      caseStudies: [
        { title: 'Automotive Display Quality Control', description: 'Developed an automated inspection system for automotive displays, capable of detecting pixel defects, brightness variations and colour accuracy issues at production line speeds.' },
        { title: 'Surface Defect Detection System', description: 'Implemented a machine learning-based vision system for detecting and classifying surface defects on painted automotive components with high accuracy.' },
      ],
    },
  ],
};

export type ExpertiseDict = typeof en;

const pt: ExpertiseDict = {
  title: 'As Nossas Competências',
  subtitle: 'Engenharia multidisciplinar para desafios complexos de teste e medição.',
  seoDescription:
    'Desenvolvimento de software e hardware, controlo em tempo real, robótica, aquisição de dados, processamento de sinal e visão artificial para sistemas de teste.',
  intro:
    'Na BridgePoint, aliamos um profundo conhecimento técnico à experiência do setor para entregar soluções de teste inovadoras. A nossa abordagem multidisciplinar permite-nos enfrentar desafios de teste complexos em diferentes áreas.',
  learnMore: 'Saber mais',
  keyCapabilities: 'Principais capacidades',
  technologies: 'Tecnologias',
  caseStudies: 'Casos de estudo',
  partners: {
    title: 'Parceiros Tecnológicos',
    subtitle: 'Colaboramos com fornecedores de tecnologia de referência para entregar soluções de vanguarda',
  },
  cta: {
    title: 'Pronto para Resolver os Seus Desafios de Teste?',
    text: 'A nossa equipa de especialistas está pronta para ajudar a desenvolver a solução de teste ideal para as suas necessidades. Contacte-nos e descubra como a nossa experiência pode beneficiar o seu projeto.',
  },
  areas: [
    {
      title: 'Desenvolvimento de Software',
      description: 'Desenvolvimento de software para sistemas de teste, aquisição de dados e processamento de sinal.',
      details:
        'A nossa experiência em desenvolvimento de software abrange todo o ciclo de vida, do levantamento de requisitos à implementação e manutenção. Somos especialistas em soluções robustas e escaláveis para automação de testes, aquisição de dados e processamento de sinal.',
      keyPoints: [
        'Desenvolvimento em plataformas standard: TestStand, LabVIEW, Python e C#',
        'Integração com web services, bases de dados e protocolos de automação',
        'Sequências e procedimentos de teste à medida',
        'Sistemas de medição e controlo em tempo real',
        'Algoritmos de processamento e análise de dados',
      ],
      caseStudies: [
        { title: 'VTester - Plataforma de Teste de ECUs Automóveis', description: 'Desenvolvimento de uma plataforma de software completa para teste de unidades de controlo eletrónico em aplicações automóveis, com sequências de teste automáticas e relatórios detalhados.' },
        { title: 'Sistema de Aquisição de Dados para Monitorização Ambiental', description: 'Criação de um sistema de aquisição de dados escalável para monitorização de parâmetros ambientais, com visualização e análise de dados em tempo real.' },
      ],
    },
    {
      title: 'Desenvolvimento de Hardware',
      description: 'Desenvolvimento de hardware à medida, eletrónica e desenho de PCB.',
      details:
        'A nossa equipa de hardware concebe e implementa soluções eletrónicas à medida para aplicações de teste e medição. Somos especialistas em interfaces de hardware fiáveis e de precisão, adaptadas às necessidades específicas dos ambientes de teste dos nossos clientes.',
      keyPoints: [
        'Interfaces DUT e eletrónica de potência para testes de alta tensão',
        'Desenho e fabrico de PCB',
        'Circuitos de medição e condicionamento de sinal à medida',
        'Sistemas de carga/descarga de condensadores',
        'Testers de curto-circuito de condensadores',
        'Multiplexers para interfaces de instrumentação/DUT',
      ],
      caseStudies: [
        { title: 'Interface de Teste de Alta Tensão', description: 'Conceção e implementação de uma interface de teste de alta tensão para sistemas de baterias automóveis, capaz de operar em segurança até 1000 V DC com medição de precisão.' },
        { title: 'Sistema de Multiplexagem à Medida', description: 'Desenvolvimento de um sistema de multiplexagem de 256 canais para teste automático de conjuntos eletrónicos complexos, com diafonia mínima e elevada integridade de sinal.' },
      ],
    },
    {
      title: 'Controlo em Tempo Real',
      description: 'Desenvolvimento de sistemas de controlo em tempo real com LabVIEW Real-Time e tecnologia FPGA.',
      details:
        'A BridgePoint é especialista no desenvolvimento de sistemas de controlo em tempo real de elevado desempenho, que exigem funcionamento determinístico e tempos de resposta rápidos. As nossas soluções tiram partido do LabVIEW Real-Time e de FPGA para um controlo preciso em aplicações exigentes.',
      keyPoints: [
        'Implementação de malhas de controlo determinísticas',
        'Aceleração por hardware baseada em FPGA',
        'Plataformas de ensaio sísmico 3D',
        'Testers hardware-in-the-loop (HIL)',
        'Sistemas de controlo de motores',
        'Prototipagem rápida de algoritmos de controlo',
      ],
      caseStudies: [
        { title: 'Sistema de Controlo de Ensaios de Vibração', description: 'Implementação de um sistema de controlo em tempo real para uma plataforma de ensaios de vibração multieixo, com sincronização precisa e geração de formas de onda complexas.' },
        { title: 'Tester HIL para Eletrónica de Potência', description: 'Desenvolvimento de um sistema de teste hardware-in-the-loop para controladores de eletrónica de potência, com tempos de resposta inferiores ao microssegundo e simulação precisa do sistema de potência.' },
      ],
    },
    {
      title: 'Robótica e Automação',
      description: 'Desenvolvimento de automação e robótica para a integração completa de testers em linhas de montagem.',
      details:
        'A nossa experiência em robótica e automação permite criar soluções de teste integradas que se adaptam perfeitamente aos ambientes de produção. Concebemos e implementamos sistemas robóticos que aumentam a eficiência, a fiabilidade e a cadência dos testes em contexto industrial.',
      keyPoints: [
        'Integração de robôs para testes automáticos',
        'Robótica guiada por visão',
        'Aplicações com robôs colaborativos (cobots)',
        'Integração em linhas de produção',
        'Desenho de ferramentas terminais (end-effectors) à medida',
        'Implementação de sistemas de segurança',
      ],
      caseStudies: [
        { title: 'Célula Automática de Teste de Displays', description: 'Conceção e implementação de uma célula robótica de teste de displays automóveis, combinando manipulação de precisão com inspeção por visão artificial em ambiente de produção.' },
        { title: 'Verificação Colaborativa de Montagem', description: 'Desenvolvimento de uma solução com robô colaborativo para verificação final de montagem numa unidade de produção eletrónica, a trabalhar lado a lado com operadores.' },
      ],
    },
    {
      title: 'Aquisição de Dados e Processamento de Sinal',
      description: 'Sistemas de aquisição de dados e desenvolvimento de processamento digital de sinal.',
      details:
        'A BridgePoint é especialista na conceção e implementação de sistemas avançados de aquisição de dados e processamento de sinal. As nossas soluções captam, analisam e interpretam dados de medição complexos com elevada precisão e fiabilidade.',
      keyPoints: [
        'Aquisição de dados de alta velocidade e precisão',
        'Medições síncronas multicanal',
        'Algoritmos de processamento digital de sinal',
        'Sistemas de monitorização estrutural',
        'Aplicações de análise modal',
        'Ensaios de ruído, vibração e aspereza (NVH)',
        'Técnicas de filtragem e análise à medida',
      ],
      caseStudies: [
        { title: 'Sistema de Monitorização da Integridade Estrutural', description: 'Implementação de um sistema distribuído de aquisição de dados para monitorização prolongada da integridade estrutural de infraestruturas críticas, com processamento de sinal avançado para deteção precoce de falhas.' },
        { title: 'Plataforma de Análise Acústica', description: 'Desenvolvimento de um sistema de medição e análise acústica de alta fidelidade para ensaios NVH automóveis, com visualização em tempo real e classificação de fontes de ruído.' },
      ],
    },
    {
      title: 'Sistemas de Visão e Inspeção',
      description: 'Sistemas de visão automáticos para controlo de qualidade.',
      details:
        'A nossa experiência em sistemas de visão permite criar soluções de inspeção avançadas que detetam defeitos, verificam montagens e garantem a qualidade do produto. Combinamos tecnologias de imagem avançadas com machine learning para entregar sistemas de inspeção visual fiáveis e precisos.',
      keyPoints: [
        'Inspeção ótica automática',
        'Sistemas multicâmara',
        'Machine learning para classificação de defeitos',
        'Inspeção e calibração de displays de infoentretenimento',
        'Controlo dimensional de peças',
        'Deteção de defeitos de superfície',
        'Verificação e medição de cor',
      ],
      caseStudies: [
        { title: 'Controlo de Qualidade de Displays Automóveis', description: 'Desenvolvimento de um sistema de inspeção automática para displays automóveis, capaz de detetar defeitos de píxeis, variações de brilho e desvios de cor à velocidade da linha de produção.' },
        { title: 'Sistema de Deteção de Defeitos de Superfície', description: 'Implementação de um sistema de visão baseado em machine learning para detetar e classificar, com elevada exatidão, defeitos de superfície em componentes automóveis pintados.' },
      ],
    },
  ],
};

export const expertiseDict = { en, pt };
