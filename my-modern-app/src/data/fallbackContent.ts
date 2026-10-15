import type { JobPosting, NewsArticle } from '../lib/types';

// Bundled content used when Supabase is not configured. The same records are loaded into the
// database by `supabase/seed.sql`, after which they are managed from the admin area (/admin).

export const fallbackNews: NewsArticle[] = [
  {
    id: 'a1f0c8de-0001-4a7e-9a10-000000000001',
    slug: 'new-automotive-testing-partnership',
    category: 'company',
    published_at: '2024-03-10',
    is_published: true,
    is_featured: true,
    image_url: '/img/news/chairs.webp',
    source_url: null,
    title_en: 'BridgePoint Announces New Automotive Testing Partnership',
    title_pt: 'BridgePoint anuncia nova parceria em testes para o setor automóvel',
    summary_en:
      'BridgePoint has partnered with a leading European automotive manufacturer to develop next-generation testing solutions for electric vehicle components.',
    summary_pt:
      'A BridgePoint estabeleceu uma parceria com um dos principais fabricantes automóveis europeus para desenvolver soluções de teste de nova geração para componentes de veículos elétricos.',
    content_en: `BridgePoint Test Systems is proud to announce a strategic partnership with one of Europe's leading automotive manufacturers to develop cutting-edge testing solutions specifically designed for electric vehicle (EV) components.

The partnership will focus on creating innovative test systems for battery management, powertrain efficiency, and thermal control systems, addressing the unique challenges posed by electric vehicles.

"This collaboration represents a significant milestone for BridgePoint," said José Rocha, Managing Director. "By combining our testing expertise with the automotive manufacturer's deep industry knowledge, we'll be able to create solutions that help accelerate the development and production of safer, more efficient electric vehicles."

The partnership will include joint research and development efforts, knowledge exchange, and the creation of specialized testing equipment for both R&D and production environments. The first prototypes are expected to be deployed by Q3 2024, with full-scale implementation planned for early 2025.

This announcement comes as BridgePoint continues to expand its footprint in the rapidly growing EV sector, reflecting the company's commitment to supporting the automotive industry's transition to sustainable transportation solutions.`,
    content_pt: `A BridgePoint Test Systems tem o orgulho de anunciar uma parceria estratégica com um dos principais fabricantes automóveis da Europa para desenvolver soluções de teste inovadoras, concebidas especificamente para componentes de veículos elétricos (VE).

A parceria irá centrar-se na criação de sistemas de teste inovadores para gestão de baterias, eficiência do grupo motopropulsor e sistemas de controlo térmico, respondendo aos desafios específicos dos veículos elétricos.

"Esta colaboração representa um marco importante para a BridgePoint", afirmou José Rocha, Diretor-Geral. "Ao juntar a nossa experiência em testes ao profundo conhecimento do setor deste fabricante, vamos criar soluções que ajudam a acelerar o desenvolvimento e a produção de veículos elétricos mais seguros e eficientes."

A parceria inclui atividades conjuntas de investigação e desenvolvimento, partilha de conhecimento e a criação de equipamentos de teste especializados para ambientes de I&D e de produção. Os primeiros protótipos deverão entrar em funcionamento no 3.º trimestre de 2024, estando a implementação em larga escala prevista para o início de 2025.

Este anúncio surge numa altura em que a BridgePoint continua a reforçar a sua presença no setor dos veículos elétricos, em forte crescimento, refletindo o compromisso da empresa em apoiar a transição da indústria automóvel para soluções de mobilidade sustentável.`,
  },
  {
    id: 'a1f0c8de-0002-4a7e-9a10-000000000002',
    slug: 'iso-9001-2015-recertification',
    category: 'company',
    published_at: '2024-02-15',
    is_published: true,
    is_featured: false,
    image_url: '/img/news/reunion.webp',
    source_url: null,
    title_en: 'BridgePoint Achieves ISO 9001:2015 Recertification',
    title_pt: 'BridgePoint renova a certificação ISO 9001:2015',
    summary_en:
      'We are pleased to announce that BridgePoint has successfully completed the ISO 9001:2015 recertification process, demonstrating our ongoing commitment to quality management.',
    summary_pt:
      'Temos o prazer de anunciar que a BridgePoint concluiu com sucesso o processo de recertificação ISO 9001:2015, demonstrando o nosso compromisso contínuo com a gestão da qualidade.',
    content_en: `BridgePoint Test Systems is proud to announce its successful recertification to ISO 9001:2015 standards, reaffirming our dedication to maintaining the highest quality management systems across all operations.

The recertification process involved a comprehensive audit of our quality management processes, including documentation, operational procedures, and continuous improvement mechanisms. The audit confirmed that BridgePoint not only maintains compliance with ISO standards but has strengthened its quality management framework since the previous certification.

"Quality is at the core of everything we do at BridgePoint," commented Luís Raminhos, Managing Director. "This recertification reflects our team's ongoing commitment to excellence and our focus on delivering consistent, high-quality solutions to our clients."

The ISO 9001:2015 certification covers all aspects of BridgePoint's operations, including design, development, manufacturing, and customer support services for our test systems. This recertification ensures that our clients continue to receive solutions that meet rigorous international quality standards.

As part of our continuous improvement philosophy, BridgePoint has implemented several enhancements to our quality management system during the recertification process, including streamlined documentation processes, improved training protocols, and enhanced customer feedback mechanisms.`,
    content_pt: `A BridgePoint Test Systems tem o orgulho de anunciar a renovação bem-sucedida da certificação segundo a norma ISO 9001:2015, reafirmando o seu compromisso em manter os mais elevados padrões de gestão da qualidade em todas as operações.

O processo de recertificação incluiu uma auditoria completa aos nossos processos de gestão da qualidade, incluindo documentação, procedimentos operacionais e mecanismos de melhoria contínua. A auditoria confirmou que a BridgePoint não só mantém a conformidade com a norma, como reforçou o seu sistema de gestão da qualidade desde a certificação anterior.

"A qualidade está no centro de tudo o que fazemos na BridgePoint", comentou Luís Raminhos, Diretor-Geral. "Esta recertificação reflete o compromisso permanente da nossa equipa com a excelência e o nosso foco em entregar soluções consistentes e de elevada qualidade aos nossos clientes."

A certificação ISO 9001:2015 abrange todas as áreas de atividade da BridgePoint, incluindo conceção, desenvolvimento, fabrico e serviços de apoio ao cliente dos nossos sistemas de teste. Esta recertificação garante que os nossos clientes continuam a receber soluções que cumprem exigentes normas internacionais de qualidade.

No âmbito da nossa filosofia de melhoria contínua, a BridgePoint implementou várias melhorias no seu sistema de gestão da qualidade durante o processo de recertificação, incluindo a simplificação da documentação, protocolos de formação melhorados e mecanismos reforçados de recolha de feedback dos clientes.`,
  },
  {
    id: 'a1f0c8de-0003-4a7e-9a10-000000000003',
    slug: 'new-high-voltage-testing-capabilities',
    category: 'technology',
    published_at: '2024-01-20',
    is_published: true,
    is_featured: false,
    image_url: '/img/expertise/high_volt.webp',
    source_url: null,
    title_en: 'New High-Voltage Testing Capabilities Unveiled',
    title_pt: 'Novas capacidades de teste em alta tensão',
    summary_en:
      'BridgePoint expands its testing capabilities with new high-voltage test equipment for EV battery systems up to 1500V.',
    summary_pt:
      'A BridgePoint alarga as suas capacidades de teste com novos equipamentos de alta tensão para sistemas de baterias de veículos elétricos até 1500 V.',
    content_en: `BridgePoint Test Systems has significantly expanded its testing capabilities with the addition of advanced high-voltage test equipment designed specifically for electric vehicle (EV) battery systems operating at up to 1500V.

This state-of-the-art equipment enhances our ability to develop comprehensive testing solutions for the latest generation of electric vehicles, which are increasingly utilizing higher voltage systems to improve efficiency and performance.

The new capabilities include:

- Precision high-voltage measurement systems with accuracy better than ±0.05%
- Advanced safety isolation systems exceeding IEC 61010 standards
- Controlled charge/discharge cycling at up to 500kW
- Integrated thermal monitoring with millisecond response times
- Configurable fault simulation for battery management system validation

"As the automotive industry continues its transition to electric propulsion, testing requirements are evolving rapidly," said our Engineering Director. "Our investment in these high-voltage testing capabilities ensures that we can support manufacturers as they develop the next generation of EV technology."

The expanded testing capabilities are already being utilized in several client projects, supporting both development testing and end-of-line production verification for battery modules and power electronics components.`,
    content_pt: `A BridgePoint Test Systems reforçou significativamente as suas capacidades de teste com novos equipamentos avançados de alta tensão, concebidos especificamente para sistemas de baterias de veículos elétricos (VE) que operam até 1500 V.

Estes equipamentos de última geração reforçam a nossa capacidade de desenvolver soluções de teste completas para a nova geração de veículos elétricos, que utilizam cada vez mais sistemas de tensão elevada para melhorar a eficiência e o desempenho.

As novas capacidades incluem:

- Sistemas de medição de alta tensão de precisão, com exatidão superior a ±0,05%
- Sistemas avançados de isolamento de segurança que excedem a norma IEC 61010
- Ciclos controlados de carga/descarga até 500 kW
- Monitorização térmica integrada com tempos de resposta na ordem dos milissegundos
- Simulação configurável de falhas para validação de sistemas de gestão de baterias

"À medida que a indústria automóvel prossegue a transição para a propulsão elétrica, os requisitos de teste evoluem rapidamente", afirmou o nosso Diretor de Engenharia. "O investimento nestas capacidades de teste em alta tensão garante que podemos apoiar os fabricantes no desenvolvimento da próxima geração de tecnologia para veículos elétricos."

Estas novas capacidades já estão a ser utilizadas em vários projetos de clientes, tanto em testes de desenvolvimento como na verificação de fim de linha de módulos de bateria e componentes de eletrónica de potência.`,
  },
  {
    id: 'a1f0c8de-0004-4a7e-9a10-000000000004',
    slug: 'european-testing-conference-presentation',
    category: 'events',
    published_at: '2023-12-05',
    is_published: true,
    is_featured: false,
    image_url: '/img/news/microphone.webp',
    source_url: null,
    title_en: 'BridgePoint to Present at European Testing Conference',
    title_pt: 'BridgePoint apresenta na European Testing Conference',
    summary_en:
      'Our team will be presenting new methodologies for automated test system validation at the upcoming European Testing Conference in Munich.',
    summary_pt:
      'A nossa equipa irá apresentar novas metodologias de validação de sistemas de teste automáticos na próxima European Testing Conference, em Munique.',
    content_en: `BridgePoint Test Systems is pleased to announce that our engineering team will be presenting at the prestigious European Testing Conference (ETC) in Munich, Germany, scheduled for February 15-17, 2025.

Our presentation, titled "Advanced Methodologies for Automated Validation of Complex Test Systems," will showcase BridgePoint's innovative approach to ensuring accuracy and reliability in automated test environments. The session will cover our proprietary validation frameworks and how they can be applied to high-complexity testing scenarios, particularly in the automotive and electronics industries.

The presentation will be delivered by our Lead Test Engineer and will include case studies from recent projects that demonstrate significant improvements in test system reliability and reduced validation time.

"Participation in the European Testing Conference provides an excellent opportunity to share our expertise while also learning from other industry leaders," said our Technical Director. "We're looking forward to engaging with the testing community and discussing the evolving challenges in our field."

In addition to the presentation, BridgePoint will have representatives available at the conference to discuss specific testing challenges and potential solutions. Attendees interested in meeting with our team can schedule appointments in advance through our website or visit our booth at the conference.`,
    content_pt: `A BridgePoint Test Systems tem o prazer de anunciar que a sua equipa de engenharia irá apresentar na prestigiada European Testing Conference (ETC), em Munique, na Alemanha, agendada para 15 a 17 de fevereiro de 2025.

A apresentação, intitulada "Advanced Methodologies for Automated Validation of Complex Test Systems", irá mostrar a abordagem inovadora da BridgePoint para garantir exatidão e fiabilidade em ambientes de teste automáticos. A sessão abordará as nossas metodologias de validação próprias e a forma como podem ser aplicadas a cenários de teste de elevada complexidade, em particular nas indústrias automóvel e eletrónica.

A apresentação será feita pelo nosso Engenheiro de Testes Principal e incluirá casos de estudo de projetos recentes que demonstram melhorias significativas na fiabilidade dos sistemas de teste e a redução do tempo de validação.

"A participação na European Testing Conference é uma excelente oportunidade para partilhar a nossa experiência e aprender com outros líderes do setor", afirmou o nosso Diretor Técnico. "Estamos entusiasmados por interagir com a comunidade de testes e discutir os desafios da nossa área."

Para além da apresentação, a BridgePoint terá representantes presentes na conferência para discutir desafios de teste específicos e possíveis soluções. Os participantes interessados em reunir com a nossa equipa podem agendar previamente através do nosso website ou visitar o nosso stand durante a conferência.`,
  },
  {
    id: 'a1f0c8de-0005-4a7e-9a10-000000000005',
    slug: 'case-study-automotive-display-testing-system',
    category: 'projects',
    published_at: '2023-11-15',
    is_published: true,
    is_featured: false,
    image_url: '/img/news/worker.webp',
    source_url: null,
    title_en: 'Case Study: Automotive Display Testing System',
    title_pt: 'Caso de estudo: sistema de teste de displays automóveis',
    summary_en:
      'Read about our recently completed project developing an automated testing system for automotive display units with machine vision quality verification.',
    summary_pt:
      'Conheça o projeto que concluímos recentemente: um sistema de teste automático para displays automóveis com verificação de qualidade por visão artificial.',
    content_en: `BridgePoint Test Systems has successfully delivered a comprehensive automated testing solution for a major automotive components manufacturer, focused on high-quality verification of infotainment and instrument cluster displays.

The project addressed the client's need for a highly reliable, high-throughput system capable of validating multiple display parameters while maintaining production line efficiency. The resulting system integrates machine vision technology with precise optical measurements to verify display quality against strict automotive standards.

Key features of the developed solution include:

- Multi-camera inspection system with calibrated color measurement
- Automated detection of dead pixels, brightness inconsistencies, and color accuracy
- Touch functionality verification using robotic actuators
- Comprehensive electrical testing of all interfaces and connections
- Custom software with intuitive operator interface and detailed reporting
- Full traceability with database integration

The implemented system has achieved a cycle time of less than 35 seconds per unit while maintaining detection accuracy exceeding 99.7% for display defects. This represents a 40% improvement in throughput compared to the client's previous testing process, with significantly enhanced defect detection capabilities.

"This project exemplifies our commitment to developing testing solutions that directly address our clients' specific challenges," noted our Project Manager. "By combining optical expertise with our automated testing capabilities, we've delivered a system that significantly improves both quality assurance and production efficiency."

The client has already commissioned additional systems for deployment across their global manufacturing facilities, building on the success of this initial implementation.`,
    content_pt: `A BridgePoint Test Systems entregou com sucesso uma solução de teste automático completa a um importante fabricante de componentes automóveis, focada na verificação de qualidade de displays de infoentretenimento e de quadros de instrumentos.

O projeto respondeu à necessidade do cliente de um sistema altamente fiável e de elevada cadência, capaz de validar múltiplos parâmetros dos displays sem comprometer a eficiência da linha de produção. O sistema resultante integra visão artificial com medições óticas de precisão para verificar a qualidade dos displays segundo exigentes normas do setor automóvel.

As principais características da solução desenvolvida incluem:

- Sistema de inspeção multicâmara com medição de cor calibrada
- Deteção automática de píxeis mortos, irregularidades de brilho e exatidão de cor
- Verificação da funcionalidade tátil com atuadores robóticos
- Testes elétricos completos de todas as interfaces e ligações
- Software à medida com interface de operador intuitiva e relatórios detalhados
- Rastreabilidade total com integração em base de dados

O sistema implementado atingiu um tempo de ciclo inferior a 35 segundos por unidade, mantendo uma taxa de deteção de defeitos nos displays superior a 99,7%. Isto representa um aumento de 40% na cadência face ao processo de teste anterior do cliente, com uma capacidade de deteção de defeitos significativamente superior.

"Este projeto exemplifica o nosso compromisso em desenvolver soluções de teste que respondem diretamente aos desafios específicos dos nossos clientes", referiu o nosso Gestor de Projeto. "Ao combinar conhecimento em ótica com as nossas capacidades de teste automático, entregámos um sistema que melhora significativamente tanto a garantia de qualidade como a eficiência da produção."

Com base no sucesso desta primeira implementação, o cliente já encomendou sistemas adicionais para as suas unidades de produção a nível global.`,
  },
  {
    id: 'a1f0c8de-0006-4a7e-9a10-000000000006',
    slug: 'north-office-expansion',
    category: 'company',
    published_at: '2023-10-10',
    is_published: true,
    is_featured: false,
    image_url: '/img/news/office.webp',
    source_url: null,
    title_en: 'BridgePoint Expands North Office to Support Growth',
    title_pt: 'BridgePoint amplia o escritório Norte para acompanhar o crescimento',
    summary_en:
      'We have expanded our North Office in Monção to accommodate growing team and increased project demands in the region.',
    summary_pt:
      'Ampliámos o nosso escritório Norte, em Monção, para acolher uma equipa em crescimento e responder ao aumento de projetos na região.',
    content_en: `BridgePoint Test Systems is excited to announce the expansion of our North Office located in Monção, Viana do Castelo. This expansion comes in response to the significant growth in our operations and increased client demand in northern Portugal and neighboring regions.

The expanded facility includes additional engineering workspace, an enhanced prototyping lab, and dedicated client meeting areas. The office space has doubled in size, allowing for improved workflow and collaboration among our growing team.

"This expansion represents an important milestone in our growth strategy," said José Rocha, Managing Director. "The enhanced facilities will enable us to better serve our clients in northern Portugal and Spain while providing our team with an improved working environment."

The North Office will continue to focus on specialized testing solutions for the automotive and electronics sectors, with the new facilities enabling more complex system development and testing capabilities. The expansion includes investment in additional test equipment and prototyping tools to support advanced project requirements.

As part of this growth, BridgePoint is actively recruiting additional engineering talent in the region, with several new positions opening in software development, systems integration, and project management roles.

The newly expanded office is fully operational as of October 1, 2023, with an official inauguration event planned for later this month.`,
    content_pt: `A BridgePoint Test Systems tem o prazer de anunciar a ampliação do seu escritório Norte, localizado em Monção, Viana do Castelo. Esta ampliação surge em resposta ao crescimento significativo da nossa atividade e ao aumento da procura por parte de clientes no norte de Portugal e regiões vizinhas.

As novas instalações incluem mais espaço de trabalho para engenharia, um laboratório de prototipagem melhorado e áreas dedicadas a reuniões com clientes. A área do escritório duplicou, permitindo melhorar o fluxo de trabalho e a colaboração numa equipa em crescimento.

"Esta ampliação representa um marco importante na nossa estratégia de crescimento", afirmou José Rocha, Diretor-Geral. "As novas instalações vão permitir-nos servir melhor os nossos clientes no norte de Portugal e em Espanha, proporcionando também à nossa equipa um melhor ambiente de trabalho."

O escritório Norte continuará focado em soluções de teste especializadas para os setores automóvel e eletrónico, e as novas instalações permitem o desenvolvimento de sistemas mais complexos e maiores capacidades de teste. A ampliação inclui investimento em equipamentos de teste e ferramentas de prototipagem adicionais para responder a projetos mais exigentes.

No âmbito deste crescimento, a BridgePoint está a recrutar talento em engenharia na região, com várias novas vagas nas áreas de desenvolvimento de software, integração de sistemas e gestão de projetos.

O escritório ampliado está totalmente operacional desde 1 de outubro de 2023, estando prevista uma inauguração oficial ainda este mês.`,
  },
  {
    id: 'a1f0c8de-0007-4a7e-9a10-000000000007',
    slug: 'testpoint-2-0-test-automation-framework',
    category: 'technology',
    published_at: '2023-09-05',
    is_published: true,
    is_featured: false,
    image_url: '/img/news/new_soft.webp',
    source_url: null,
    title_en: 'New Software Framework for Test Automation Released',
    title_pt: 'Lançada nova framework de software para automação de testes',
    summary_en:
      'BridgePoint announces the release of TestPoint 2.0, our enhanced software framework for test automation with improved data analysis capabilities.',
    summary_pt:
      'A BridgePoint anuncia o lançamento do TestPoint 2.0, a nova versão da nossa framework de software para automação de testes, com capacidades de análise de dados melhoradas.',
    content_en: `BridgePoint Test Systems is proud to announce the release of TestPoint 2.0, a significant update to our proprietary software framework for test automation that introduces enhanced data analysis capabilities and improved user interface features.

TestPoint 2.0 builds on the proven foundation of our testing framework while adding powerful new functionalities designed to streamline test development, execution, and results analysis. The updated platform has been developed based on extensive feedback from both our engineering team and clients using previous versions.

Key enhancements in the new release include:

- Real-time data visualization with customizable dashboards
- Advanced statistical analysis tools for test results evaluation
- Improved test sequence editor with drag-and-drop functionality
- Enhanced report generation with exportable formats for various stakeholders
- Expanded API for integration with third-party systems and databases
- Comprehensive test history tracking with version control

"TestPoint 2.0 represents a major step forward in our software capabilities," said our Software Development Manager. "These enhancements will allow our clients to gain deeper insights from their test data while making the overall testing process more efficient."

The new software has already been deployed in several client projects with extremely positive feedback, particularly regarding the improved data visualization tools and the intuitive user interface.

All new test systems delivered by BridgePoint will include TestPoint 2.0, while existing clients have the option to upgrade their current installations through our support services team.`,
    content_pt: `A BridgePoint Test Systems tem o orgulho de anunciar o lançamento do TestPoint 2.0, uma atualização significativa da nossa framework de software própria para automação de testes, que introduz capacidades de análise de dados reforçadas e uma interface de utilizador melhorada.

O TestPoint 2.0 assenta na base comprovada da nossa framework de testes e acrescenta novas funcionalidades pensadas para simplificar o desenvolvimento, a execução e a análise de resultados de testes. A nova plataforma foi desenvolvida com base no feedback da nossa equipa de engenharia e dos clientes que utilizam as versões anteriores.

As principais melhorias desta versão incluem:

- Visualização de dados em tempo real com dashboards personalizáveis
- Ferramentas avançadas de análise estatística dos resultados de teste
- Editor de sequências de teste melhorado, com funcionalidade de arrastar e largar
- Geração de relatórios melhorada, com formatos exportáveis para diferentes interlocutores
- API alargada para integração com sistemas e bases de dados de terceiros
- Histórico de testes completo com controlo de versões

"O TestPoint 2.0 representa um grande avanço nas nossas capacidades de software", afirmou o nosso Responsável de Desenvolvimento de Software. "Estas melhorias permitem aos nossos clientes retirar mais informação dos seus dados de teste, tornando todo o processo mais eficiente."

O novo software já foi implementado em vários projetos de clientes, com feedback muito positivo, em particular quanto às novas ferramentas de visualização de dados e à interface intuitiva.

Todos os novos sistemas de teste entregues pela BridgePoint incluirão o TestPoint 2.0, e os clientes atuais podem atualizar as suas instalações através da nossa equipa de suporte.`,
  },
  {
    id: 'a1f0c8de-0008-4a7e-9a10-000000000008',
    slug: 'european-automotive-testing-alliance-membership',
    category: 'company',
    published_at: '2023-08-15',
    is_published: true,
    is_featured: false,
    image_url: '/img/news/buildings.webp',
    source_url: null,
    title_en: 'BridgePoint Joins European Automotive Testing Alliance',
    title_pt: 'BridgePoint adere à European Automotive Testing Alliance',
    summary_en:
      'We are pleased to announce our membership in the European Automotive Testing Alliance, collaborating with industry leaders to develop next-generation testing standards.',
    summary_pt:
      'Temos o prazer de anunciar a nossa adesão à European Automotive Testing Alliance, colaborando com líderes do setor no desenvolvimento das normas de teste da próxima geração.',
    content_en: `BridgePoint Test Systems is proud to announce our membership in the prestigious European Automotive Testing Alliance (EATA), a consortium of leading testing technology providers, automotive manufacturers, and research institutions dedicated to advancing testing methodologies and standards across the European automotive industry.

Joining this alliance aligns with our strategic focus on innovation and collaboration in the automotive testing sector. Through EATA, BridgePoint will participate in working groups focused on developing standardized approaches to emerging testing challenges, particularly those related to autonomous driving systems, connected vehicles, and electric powertrains.

"Membership in EATA provides us with a valuable platform to collaborate with other industry leaders and contribute to shaping the future of automotive testing," said Luís Raminhos, Managing Director. "It also gives our clients confidence that our solutions are aligned with emerging industry standards and best practices."

As part of our involvement, BridgePoint will participate in the alliance's annual conference and technology showcase, as well as contribute to technical publications and standards development activities. This engagement will also provide opportunities for knowledge exchange and potential collaborative projects with other alliance members.`,
    content_pt: `A BridgePoint Test Systems tem o orgulho de anunciar a sua adesão à prestigiada European Automotive Testing Alliance (EATA), um consórcio que reúne fornecedores de tecnologia de teste, fabricantes automóveis e instituições de investigação dedicados ao avanço das metodologias e normas de teste na indústria automóvel europeia.

A adesão a esta aliança está alinhada com a nossa aposta estratégica na inovação e na colaboração no setor dos testes automóveis. Através da EATA, a BridgePoint participará em grupos de trabalho dedicados a abordagens normalizadas para novos desafios de teste, em particular nas áreas da condução autónoma, dos veículos conectados e da propulsão elétrica.

"A adesão à EATA dá-nos uma plataforma valiosa para colaborar com outros líderes do setor e contribuir para o futuro dos testes automóveis", afirmou Luís Raminhos, Diretor-Geral. "Dá também aos nossos clientes a confiança de que as nossas soluções estão alinhadas com as normas e boas práticas emergentes do setor."

No âmbito desta participação, a BridgePoint estará presente na conferência anual e na mostra tecnológica da aliança, e contribuirá para publicações técnicas e atividades de normalização. Esta colaboração abrirá também oportunidades de partilha de conhecimento e de projetos conjuntos com outros membros da aliança.`,
  },
];

export const fallbackJobs: JobPosting[] = [
  {
    id: 'b2e1d9ef-0001-4b8f-8b20-000000000001',
    type: 'full-time',
    location: 'Évora, Portugal',
    is_remote: false,
    posted_at: '2024-03-01',
    is_published: true,
    linkedin_url: 'https://www.linkedin.com/company/bridgepoint-test-systems/jobs/',
    title_en: 'Software Engineer - Test Systems',
    title_pt: 'Engenheiro(a) de Software - Sistemas de Teste',
    department_en: 'Engineering',
    department_pt: 'Engenharia',
    description_en:
      'We are looking for a Software Engineer to join our Test Systems development team. The ideal candidate will have experience in developing software for automated test systems and a passion for creating robust, efficient solutions.',
    description_pt:
      'Procuramos um(a) Engenheiro(a) de Software para integrar a nossa equipa de desenvolvimento de Sistemas de Teste. O(A) candidato(a) ideal tem experiência no desenvolvimento de software para sistemas de teste automáticos e gosto por criar soluções robustas e eficientes.',
    responsibilities_en: [
      'Design and develop software for automated test systems',
      'Work with cross-functional teams to understand testing requirements',
      'Create and maintain documentation for test systems',
      'Troubleshoot and debug issues in existing test systems',
      'Optimize test processes for efficiency and reliability',
      'Stay current with emerging technologies and methodologies',
    ],
    responsibilities_pt: [
      'Conceber e desenvolver software para sistemas de teste automáticos',
      'Trabalhar com equipas multidisciplinares para compreender os requisitos de teste',
      'Criar e manter a documentação dos sistemas de teste',
      'Diagnosticar e corrigir problemas em sistemas de teste existentes',
      'Otimizar processos de teste em termos de eficiência e fiabilidade',
      'Acompanhar novas tecnologias e metodologias',
    ],
    requirements_en: [
      "Bachelor's degree in Computer Science, Software Engineering, or related field",
      '3+ years of experience in software development',
      'Proficiency in LabVIEW, Python, or C#',
      'Experience with test automation frameworks and tools',
      'Knowledge of instrument control and data acquisition systems',
      'Strong problem-solving and analytical skills',
      'Excellent communication and teamwork abilities',
    ],
    requirements_pt: [
      'Licenciatura em Engenharia Informática, Engenharia de Software ou área relacionada',
      'Mais de 3 anos de experiência em desenvolvimento de software',
      'Domínio de LabVIEW, Python ou C#',
      'Experiência com frameworks e ferramentas de automação de testes',
      'Conhecimentos de controlo de instrumentação e sistemas de aquisição de dados',
      'Forte capacidade analítica e de resolução de problemas',
      'Excelente capacidade de comunicação e de trabalho em equipa',
    ],
    benefits_en: [
      'Competitive salary and bonus structure',
      'Health insurance',
      'Flexible working hours',
      'Continuous professional development opportunities',
      'Regular team events and activities',
    ],
    benefits_pt: [
      'Salário competitivo e sistema de prémios',
      'Seguro de saúde',
      'Horário flexível',
      'Oportunidades de desenvolvimento profissional contínuo',
      'Eventos e atividades de equipa regulares',
    ],
  },
  {
    id: 'b2e1d9ef-0002-4b8f-8b20-000000000002',
    type: 'full-time',
    location: 'São João da Talha, Portugal',
    is_remote: false,
    posted_at: '2024-02-15',
    is_published: true,
    linkedin_url: null,
    title_en: 'Hardware Engineer',
    title_pt: 'Engenheiro(a) de Hardware',
    department_en: 'Engineering',
    department_pt: 'Engenharia',
    description_en:
      'BridgePoint is seeking a talented Hardware Engineer to design and develop electronic hardware for our test systems. This role involves working on challenging projects in the automotive and electronics industries.',
    description_pt:
      'A BridgePoint procura um(a) Engenheiro(a) de Hardware talentoso(a) para conceber e desenvolver hardware eletrónico para os nossos sistemas de teste. A função envolve projetos desafiantes nas indústrias automóvel e eletrónica.',
    responsibilities_en: [
      'Design and develop electronic circuits and PCBs for test systems',
      'Create and review hardware documentation and specifications',
      'Work with software engineers to integrate hardware and software components',
      'Troubleshoot and resolve hardware issues',
      'Research and evaluate new technologies and components',
      'Support manufacturing and field service teams',
    ],
    responsibilities_pt: [
      'Conceber e desenvolver circuitos eletrónicos e PCBs para sistemas de teste',
      'Criar e rever documentação e especificações de hardware',
      'Trabalhar com engenheiros de software na integração de componentes de hardware e software',
      'Diagnosticar e resolver problemas de hardware',
      'Investigar e avaliar novas tecnologias e componentes',
      'Apoiar as equipas de produção e de assistência técnica no cliente',
    ],
    requirements_en: [
      "Bachelor's or Master's degree in Electrical Engineering or related field",
      '2+ years of experience in hardware design',
      'Proficiency in PCB design software (Altium Designer preferred)',
      'Experience with analog and digital circuit design',
      'Knowledge of communication protocols (CAN, LIN, I2C, etc.)',
      'Familiarity with microcontrollers and embedded systems',
      'Good problem-solving and teamwork skills',
    ],
    requirements_pt: [
      'Licenciatura ou Mestrado em Engenharia Eletrotécnica ou área relacionada',
      'Mais de 2 anos de experiência em projeto de hardware',
      'Domínio de software de desenho de PCB (preferencialmente Altium Designer)',
      'Experiência em projeto de circuitos analógicos e digitais',
      'Conhecimento de protocolos de comunicação (CAN, LIN, I2C, etc.)',
      'Familiaridade com microcontroladores e sistemas embebidos',
      'Boa capacidade de resolução de problemas e de trabalho em equipa',
    ],
    benefits_en: [
      'Competitive salary package',
      'Health and dental insurance',
      'Professional development budget',
      'Flexible working arrangements',
      'Employee recognition program',
    ],
    benefits_pt: [
      'Pacote salarial competitivo',
      'Seguro de saúde e dentário',
      'Orçamento para desenvolvimento profissional',
      'Regime de trabalho flexível',
      'Programa de reconhecimento de colaboradores',
    ],
  },
  {
    id: 'b2e1d9ef-0003-4b8f-8b20-000000000003',
    type: 'full-time',
    location: 'Évora, Portugal',
    is_remote: true,
    posted_at: '2024-02-28',
    is_published: true,
    linkedin_url: 'https://www.linkedin.com/company/bridgepoint-test-systems/jobs/',
    title_en: 'Project Manager',
    title_pt: 'Gestor(a) de Projeto',
    department_en: 'Project Management',
    department_pt: 'Gestão de Projetos',
    description_en:
      'We are looking for an experienced Project Manager to lead our test system development projects. The ideal candidate will have a strong technical background and excellent leadership skills.',
    description_pt:
      'Procuramos um(a) Gestor(a) de Projeto experiente para liderar os nossos projetos de desenvolvimento de sistemas de teste. O(A) candidato(a) ideal tem uma sólida formação técnica e excelentes capacidades de liderança.',
    responsibilities_en: [
      'Manage full lifecycle of test systems projects from conception to delivery',
      'Develop project plans, timelines, and budgets',
      'Coordinate cross-functional teams to achieve project goals',
      'Monitor project progress and address any issues or delays',
      'Communicate with clients and stakeholders regularly',
      'Ensure projects meet quality standards and client requirements',
      'Document project activities, decisions, and outcomes',
    ],
    responsibilities_pt: [
      'Gerir todo o ciclo de vida de projetos de sistemas de teste, da conceção à entrega',
      'Elaborar planos, calendários e orçamentos de projeto',
      'Coordenar equipas multidisciplinares para atingir os objetivos do projeto',
      'Acompanhar o progresso do projeto e resolver problemas ou atrasos',
      'Comunicar regularmente com clientes e partes interessadas',
      'Garantir que os projetos cumprem as normas de qualidade e os requisitos do cliente',
      'Documentar atividades, decisões e resultados do projeto',
    ],
    requirements_en: [
      "Bachelor's degree in Engineering, Computer Science, or related field",
      '5+ years of experience in project management, preferably in technical environments',
      'PMP certification or equivalent',
      'Strong understanding of test systems and automation',
      'Excellent leadership, communication, and negotiation skills',
      'Experience with project management tools and methodologies',
      'Ability to manage multiple projects simultaneously',
    ],
    requirements_pt: [
      'Licenciatura em Engenharia, Informática ou área relacionada',
      'Mais de 5 anos de experiência em gestão de projetos, preferencialmente em contextos técnicos',
      'Certificação PMP ou equivalente',
      'Bom conhecimento de sistemas de teste e automação',
      'Excelentes capacidades de liderança, comunicação e negociação',
      'Experiência com ferramentas e metodologias de gestão de projetos',
      'Capacidade de gerir vários projetos em simultâneo',
    ],
    benefits_en: [
      'Competitive salary and performance bonuses',
      'Comprehensive health benefits',
      'Remote work options',
      'Professional development opportunities',
      'Collaborative work environment',
    ],
    benefits_pt: [
      'Salário competitivo e prémios de desempenho',
      'Benefícios de saúde abrangentes',
      'Possibilidade de trabalho remoto',
      'Oportunidades de desenvolvimento profissional',
      'Ambiente de trabalho colaborativo',
    ],
  },
  {
    id: 'b2e1d9ef-0004-4b8f-8b20-000000000004',
    type: 'full-time',
    location: 'Monção, Portugal',
    is_remote: false,
    posted_at: '2024-03-10',
    is_published: true,
    linkedin_url: null,
    title_en: 'Quality Assurance Engineer',
    title_pt: 'Engenheiro(a) de Garantia da Qualidade',
    department_en: 'Quality',
    department_pt: 'Qualidade',
    description_en:
      'BridgePoint is seeking a Quality Assurance Engineer to ensure our test systems meet the highest quality standards. This role involves developing and implementing quality processes and conducting thorough testing.',
    description_pt:
      'A BridgePoint procura um(a) Engenheiro(a) de Garantia da Qualidade para assegurar que os nossos sistemas de teste cumprem os mais elevados padrões de qualidade. A função envolve desenvolver e implementar processos de qualidade e realizar testes exaustivos.',
    responsibilities_en: [
      'Develop and implement quality assurance processes for test systems',
      'Create comprehensive test plans and procedures',
      'Perform system testing and validation',
      'Document and track quality issues and their resolution',
      'Collaborate with engineering teams to improve product quality',
      'Stay current with quality standards and best practices',
      'Prepare quality reports for management and clients',
    ],
    responsibilities_pt: [
      'Desenvolver e implementar processos de garantia da qualidade para sistemas de teste',
      'Elaborar planos e procedimentos de teste completos',
      'Realizar testes e validação de sistemas',
      'Documentar e acompanhar não conformidades e a sua resolução',
      'Colaborar com as equipas de engenharia para melhorar a qualidade do produto',
      'Acompanhar normas e boas práticas de qualidade',
      'Preparar relatórios de qualidade para a gestão e para os clientes',
    ],
    requirements_en: [
      "Bachelor's degree in Engineering, Computer Science, or related field",
      '3+ years of experience in quality assurance, preferably in test systems',
      'Knowledge of quality standards (ISO 9001, automotive standards)',
      'Experience with testing methodologies and tools',
      'Strong attention to detail and analytical skills',
      'Excellent documentation and communication abilities',
      'Problem-solving mindset',
    ],
    requirements_pt: [
      'Licenciatura em Engenharia, Informática ou área relacionada',
      'Mais de 3 anos de experiência em garantia da qualidade, preferencialmente em sistemas de teste',
      'Conhecimento de normas de qualidade (ISO 9001, normas do setor automóvel)',
      'Experiência com metodologias e ferramentas de teste',
      'Grande atenção ao detalhe e capacidade analítica',
      'Excelente capacidade de documentação e comunicação',
      'Orientação para a resolução de problemas',
    ],
    benefits_en: [
      'Competitive compensation package',
      'Health and wellness benefits',
      'Flexible schedule',
      'Training and certification support',
      'Team building activities and events',
    ],
    benefits_pt: [
      'Pacote de remuneração competitivo',
      'Benefícios de saúde e bem-estar',
      'Horário flexível',
      'Apoio a formação e certificações',
      'Atividades e eventos de team building',
    ],
  },
  {
    id: 'b2e1d9ef-0005-4b8f-8b20-000000000005',
    type: 'full-time',
    location: 'Évora, Portugal',
    is_remote: true,
    posted_at: '2024-03-05',
    is_published: true,
    linkedin_url: 'https://www.linkedin.com/company/bridgepoint-test-systems/jobs/',
    title_en: 'Sales Engineer',
    title_pt: 'Engenheiro(a) Comercial',
    department_en: 'Sales',
    department_pt: 'Comercial',
    description_en:
      'We are looking for a Sales Engineer to promote our test system solutions to clients in the automotive and electronics industries. The ideal candidate will have both technical knowledge and sales skills.',
    description_pt:
      'Procuramos um(a) Engenheiro(a) Comercial para promover as nossas soluções de sistemas de teste junto de clientes das indústrias automóvel e eletrónica. O(A) candidato(a) ideal alia conhecimento técnico a competências comerciais.',
    responsibilities_en: [
      'Identify and develop new business opportunities',
      'Present technical solutions to potential clients',
      'Work with engineering teams to develop customized solutions',
      'Prepare and deliver sales presentations and proposals',
      'Respond to technical queries from clients',
      'Maintain relationships with existing clients',
      'Stay current with industry trends and competitor offerings',
    ],
    responsibilities_pt: [
      'Identificar e desenvolver novas oportunidades de negócio',
      'Apresentar soluções técnicas a potenciais clientes',
      'Trabalhar com as equipas de engenharia no desenvolvimento de soluções à medida',
      'Preparar e realizar apresentações comerciais e propostas',
      'Responder a questões técnicas dos clientes',
      'Manter a relação com os clientes atuais',
      'Acompanhar as tendências do setor e a oferta da concorrência',
    ],
    requirements_en: [
      "Bachelor's degree in Engineering or related technical field",
      '3+ years of experience in technical sales, preferably in test systems',
      'Strong understanding of test automation and measurement systems',
      'Excellent presentation and communication skills',
      'Ability to understand client needs and propose appropriate solutions',
      'Willingness to travel (30-40%)',
      'Results-oriented mindset',
    ],
    requirements_pt: [
      'Licenciatura em Engenharia ou área técnica relacionada',
      'Mais de 3 anos de experiência em vendas técnicas, preferencialmente em sistemas de teste',
      'Bom conhecimento de automação de testes e sistemas de medição',
      'Excelentes capacidades de apresentação e comunicação',
      'Capacidade de compreender as necessidades do cliente e propor soluções adequadas',
      'Disponibilidade para viajar (30-40%)',
      'Orientação para resultados',
    ],
    benefits_en: [
      'Competitive base salary plus commission structure',
      'Company car or car allowance',
      'Comprehensive health benefits',
      'Remote work flexibility',
      'Ongoing training and development',
    ],
    benefits_pt: [
      'Salário base competitivo e sistema de comissões',
      'Viatura da empresa ou subsídio de viatura',
      'Benefícios de saúde abrangentes',
      'Flexibilidade de trabalho remoto',
      'Formação e desenvolvimento contínuos',
    ],
  },
  {
    id: 'b2e1d9ef-0006-4b8f-8b20-000000000006',
    type: 'full-time',
    location: 'São João da Talha, Portugal',
    is_remote: false,
    posted_at: '2024-02-20',
    is_published: true,
    linkedin_url: null,
    title_en: 'Test Systems Technician',
    title_pt: 'Técnico(a) de Sistemas de Teste',
    department_en: 'Operations',
    department_pt: 'Operações',
    description_en:
      'BridgePoint is seeking a Test Systems Technician to assist in the assembly, installation, and maintenance of our test systems. This hands-on role is ideal for someone with technical skills and attention to detail.',
    description_pt:
      'A BridgePoint procura um(a) Técnico(a) de Sistemas de Teste para apoiar a montagem, instalação e manutenção dos nossos sistemas de teste. Uma função prática, ideal para quem tem competências técnicas e atenção ao detalhe.',
    responsibilities_en: [
      'Assemble and install test system hardware components',
      'Perform calibration and maintenance on test equipment',
      'Troubleshoot and repair hardware issues',
      'Assist engineers in system testing and validation',
      'Maintain inventory of parts and supplies',
      'Document procedures and maintain technical records',
      'Support field service activities when required',
    ],
    responsibilities_pt: [
      'Montar e instalar componentes de hardware de sistemas de teste',
      'Realizar a calibração e manutenção de equipamentos de teste',
      'Diagnosticar e reparar avarias de hardware',
      'Apoiar os engenheiros nos testes e na validação de sistemas',
      'Gerir o inventário de peças e consumíveis',
      'Documentar procedimentos e manter registos técnicos',
      'Apoiar intervenções no cliente sempre que necessário',
    ],
    requirements_en: [
      'Associate degree in Electronics, Engineering Technology, or equivalent experience',
      '2+ years of experience in electronics assembly or technical support',
      'Knowledge of basic electronic principles and measurements',
      'Experience with hand tools and electronic test equipment',
      'Ability to read and understand technical drawings and schematics',
      'Good problem-solving skills and attention to detail',
      "Valid driver's license",
    ],
    requirements_pt: [
      'Curso técnico-profissional ou CTeSP em Eletrónica, ou experiência equivalente',
      'Mais de 2 anos de experiência em montagem eletrónica ou suporte técnico',
      'Conhecimentos de princípios básicos de eletrónica e medição',
      'Experiência com ferramentas manuais e equipamentos de teste eletrónico',
      'Capacidade de ler e interpretar desenhos técnicos e esquemas',
      'Boa capacidade de resolução de problemas e atenção ao detalhe',
      'Carta de condução válida',
    ],
    benefits_en: [
      'Competitive hourly rate with overtime opportunities',
      'Health insurance coverage',
      'Technical training programs',
      'Career advancement paths',
      'Employee discount programs',
    ],
    benefits_pt: [
      'Remuneração competitiva com possibilidade de horas extraordinárias',
      'Seguro de saúde',
      'Programas de formação técnica',
      'Plano de progressão na carreira',
      'Programas de descontos para colaboradores',
    ],
  },
  {
    id: 'b2e1d9ef-0007-4b8f-8b20-000000000007',
    type: 'internship',
    location: 'Évora, Portugal',
    is_remote: false,
    posted_at: '2024-03-15',
    is_published: true,
    linkedin_url: null,
    title_en: 'Software Developer Intern',
    title_pt: 'Estágio em Desenvolvimento de Software',
    department_en: 'Engineering',
    department_pt: 'Engenharia',
    description_en:
      'We are offering an internship opportunity for a software developer to gain hands-on experience in test systems software development. This is a great opportunity for students or recent graduates to apply their skills in a real-world environment.',
    description_pt:
      'Oferecemos um estágio em desenvolvimento de software para ganhar experiência prática no desenvolvimento de software para sistemas de teste. Uma excelente oportunidade para estudantes ou recém-licenciados aplicarem os seus conhecimentos num contexto real.',
    responsibilities_en: [
      'Assist in developing software components for test systems',
      'Participate in code reviews and testing activities',
      'Learn about test automation frameworks and tools',
      'Help maintain documentation and technical records',
      'Support senior developers in daily tasks',
      'Contribute to internal projects and initiatives',
      'Present findings and progress in team meetings',
    ],
    responsibilities_pt: [
      'Apoiar o desenvolvimento de componentes de software para sistemas de teste',
      'Participar em revisões de código e atividades de teste',
      'Aprender a utilizar frameworks e ferramentas de automação de testes',
      'Ajudar a manter a documentação e os registos técnicos',
      'Apoiar os programadores seniores nas tarefas diárias',
      'Contribuir para projetos e iniciativas internas',
      'Apresentar resultados e progressos nas reuniões de equipa',
    ],
    requirements_en: [
      'Currently pursuing or recently completed a degree in Computer Science or related field',
      'Knowledge of programming languages (Python, C#, or LabVIEW)',
      'Basic understanding of software development principles',
      'Eagerness to learn and apply new technologies',
      'Good problem-solving skills',
      'Ability to work in a team environment',
      'Strong communication skills',
    ],
    requirements_pt: [
      'A frequentar ou ter concluído recentemente um curso em Engenharia Informática ou área relacionada',
      'Conhecimentos de linguagens de programação (Python, C# ou LabVIEW)',
      'Noções básicas de princípios de desenvolvimento de software',
      'Vontade de aprender e aplicar novas tecnologias',
      'Boa capacidade de resolução de problemas',
      'Capacidade de trabalho em equipa',
      'Boa capacidade de comunicação',
    ],
    benefits_en: [
      'Competitive internship stipend',
      'Structured mentorship program',
      'Flexible working hours',
      'Possibility of full-time employment after internship',
      'Networking opportunities with industry professionals',
    ],
    benefits_pt: [
      'Bolsa de estágio competitiva',
      'Programa de mentoria estruturado',
      'Horário flexível',
      'Possibilidade de integração na equipa após o estágio',
      'Contacto com profissionais do setor',
    ],
  },
];
