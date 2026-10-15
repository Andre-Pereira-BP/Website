const en = {
  title: 'Test Systems',
  subtitle: 'Custom test systems for every stage of your product lifecycle.',
  seoDescription:
    'Custom test systems for product development, end-of-line production testing and quality control: EOL testers, burn-in, NVH, vision and HV testing.',
  intro:
    'BridgePoint provides custom test systems for various stages of your product lifecycle, from development to production and quality assurance. Our specialised solutions help you test faster, improve quality control and reduce costs.',
  viewExamples: 'View examples',
  examplesTitle: 'Example applications',
  systems: [
    {
      title: 'Product Development',
      description: 'Test systems for product development, measuring product parameters for performance, durability and innovation.',
      examples: [
        { title: 'HVAC Testing System', description: 'Advanced testing system for HVAC components with temperature, pressure and flow measurements in controlled environments.' },
        { title: 'Battery Test Bench', description: 'High-precision test bench for electric vehicle battery development with voltage, current and temperature monitoring.' },
        { title: 'Prototype Validation System', description: 'Comprehensive validation system for early-stage prototypes with multiple sensor inputs and data analysis.' },
      ],
    },
    {
      title: 'Production',
      description:
        'EOL testers and test benches. Integration of vision, data acquisition and instrumentation, DMM, RF test, protocol analysers, RDS, Wi-Fi, Bluetooth, DoIP, Ethernet. CAN, LIN and I2C communication. Programmable LV and HV power supplies.',
      examples: [
        { title: 'End-of-Line Tester', description: 'Fully automated EOL tester for automotive electronics with comprehensive test coverage and high throughput.' },
        { title: 'Display Testing System', description: 'Vision-based system for testing and calibrating automotive displays with automated evaluation of brightness, colour and pixel defects.' },
        { title: 'Robotic Assembly Tester', description: 'Integrated robotic system for testing components during the assembly process with real-time feedback.' },
      ],
    },
    {
      title: 'Quality',
      description: 'Test systems for product quality control, audit stations, test benches, Burn-In/Run-In and vibration testers (NVH).',
      examples: [
        { title: 'Burn-In Test System', description: 'Temperature-controlled burn-in system for electronics with continuous monitoring and failure detection.' },
        { title: 'NVH Analysis System', description: 'Advanced vibration and acoustic testing system for automotive components with FFT analysis and reporting.' },
        { title: 'Quality Audit Station', description: 'Comprehensive audit station for final quality verification with multiple inspection points and automated reporting.' },
      ],
    },
  ],
  cta: {
    title: 'Need a Custom Test Solution?',
    text: 'Our engineering team is ready to design and develop a test system tailored to your specific requirements.',
  },
};

export type TestSystemsDict = typeof en;

const pt: TestSystemsDict = {
  title: 'Sistemas de Teste',
  subtitle: 'Sistemas de teste à medida para todas as fases do ciclo de vida do seu produto.',
  seoDescription:
    'Sistemas de teste à medida para desenvolvimento de produto, testes de fim de linha e controlo de qualidade: testers EOL, burn-in, NVH, visão artificial e alta tensão.',
  intro:
    'A BridgePoint desenvolve sistemas de teste à medida para as várias fases do ciclo de vida do produto, do desenvolvimento à produção e à garantia da qualidade. As nossas soluções especializadas ajudam a testar mais depressa, melhorar o controlo de qualidade e reduzir custos.',
  viewExamples: 'Ver exemplos',
  examplesTitle: 'Exemplos de aplicação',
  systems: [
    {
      title: 'Desenvolvimento de Produto',
      description: 'Sistemas de teste para desenvolvimento de produto, medindo parâmetros de desempenho, durabilidade e inovação.',
      examples: [
        { title: 'Sistema de Teste AVAC', description: 'Sistema de teste avançado para componentes AVAC, com medição de temperatura, pressão e caudal em ambiente controlado.' },
        { title: 'Banco de Ensaio de Baterias', description: 'Banco de ensaio de alta precisão para o desenvolvimento de baterias de veículos elétricos, com monitorização de tensão, corrente e temperatura.' },
        { title: 'Sistema de Validação de Protótipos', description: 'Sistema completo de validação de protótipos em fase inicial, com múltiplas entradas de sensores e análise de dados.' },
      ],
    },
    {
      title: 'Produção',
      description:
        'Testers de fim de linha (EOL) e bancos de ensaio. Integração de visão, aquisição de dados e instrumentação, DMM, testes RF, analisadores de protocolos, RDS, Wi-Fi, Bluetooth, DoIP, Ethernet. Comunicação CAN, LIN e I2C. Fontes de alimentação programáveis de baixa e alta tensão.',
      examples: [
        { title: 'Tester de Fim de Linha', description: 'Tester EOL totalmente automático para eletrónica automóvel, com cobertura de teste completa e elevada cadência.' },
        { title: 'Sistema de Teste de Displays', description: 'Sistema de visão para teste e calibração de displays automóveis, com avaliação automática de brilho, cor e defeitos de píxeis.' },
        { title: 'Tester Robotizado de Montagem', description: 'Sistema robótico integrado para testar componentes durante o processo de montagem, com feedback em tempo real.' },
      ],
    },
    {
      title: 'Qualidade',
      description: 'Sistemas de teste para controlo de qualidade do produto, postos de auditoria, bancos de ensaio, Burn-In/Run-In e testes de vibração (NVH).',
      examples: [
        { title: 'Sistema de Burn-In', description: 'Sistema de burn-in com controlo de temperatura para eletrónica, com monitorização contínua e deteção de falhas.' },
        { title: 'Sistema de Análise NVH', description: 'Sistema avançado de ensaios de vibração e acústica para componentes automóveis, com análise FFT e relatórios.' },
        { title: 'Posto de Auditoria de Qualidade', description: 'Posto de auditoria completo para verificação final da qualidade, com múltiplos pontos de inspeção e relatórios automáticos.' },
      ],
    },
  ],
  cta: {
    title: 'Precisa de uma Solução de Teste à Medida?',
    text: 'A nossa equipa de engenharia está pronta para conceber e desenvolver um sistema de teste adaptado aos seus requisitos.',
  },
};

export const testSystemsDict = { en, pt };
