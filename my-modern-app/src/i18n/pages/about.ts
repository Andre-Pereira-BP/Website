import { defineDict } from '../dict';

const en = {
  title: 'About Us',
  subtitle: 'A systems engineering company passionate about test and measurement since 2011.',
  seoDescription:
    'BridgePoint is a Portuguese systems engineering company founded in 2011, specialised in test systems for development, production and quality control.',
  intro: {
    titleStart: 'Founded in',
    p1: 'BridgePoint is a systems engineering company specialised in developing test systems for development, production and quality.',
    p2: 'Our competences in software & hardware development make the difference when solving test and measurement challenges.',
    p3: 'With our modular systems, we make our customers successful: testing faster, improving quality control and reducing costs.',
    imageAlt: 'The BridgePoint team',
  },
  mission: {
    title: 'Our Mission',
    items: ['Our team is passionate about engineering!', 'We are always ready for a new challenge!', 'We Test for Your Success'],
  },
  values: {
    title: 'Our Core Values',
    subtitle: 'These principles guide everything we do at BridgePoint',
    items: [
      { title: 'Innovation', description: 'We continuously seek new ways to improve test systems, staying ahead of industry trends and challenges.' },
      { title: 'Quality', description: 'We are committed to delivering high-quality test solutions that meet or exceed customer expectations.' },
      { title: 'Excellence', description: 'We strive for excellence in every project, paying attention to details and ensuring customer satisfaction.' },
      { title: 'Collaboration', description: 'We work closely with our clients to understand their needs and deliver customised solutions.' },
    ],
  },
  team: {
    title: 'Our Team',
    subtitle: "Meet the talented professionals behind BridgePoint's success",
    members: [
      { name: 'Engineering Team', role: 'Development & Testing' },
      { name: 'Software Team', role: 'Test Software Development' },
      { name: 'Hardware Team', role: 'Test Hardware Development' },
    ],
  },
  journey: {
    title: 'Our Journey',
    subtitle: "Key milestones that have shaped BridgePoint's history",
    items: [
      { year: 2011, title: 'Foundation', description: 'BridgePoint was founded as a systems engineering company specialising in test systems.' },
      { year: 2014, title: 'Growth', description: 'Expanded operations and opened our first dedicated facility.' },
      { year: 2017, title: 'Innovation', description: 'Developed proprietary test methodologies that enhanced our service offering.' },
      { year: 2020, title: 'Expansion', description: 'Opened additional offices to better serve our growing client base.' },
      { year: 2023, title: 'Recognition', description: 'Received industry recognition for excellence in test system development.' },
    ],
  },
  cta: {
    title: 'Join Our Team of Innovators',
    text: "We're always looking for talented people who share our passion for engineering and testing excellence. Explore our current openings and become part of our success story.",
    button: 'View Careers',
  },
};

export type AboutDict = typeof en;

const pt: AboutDict = {
  title: 'Sobre Nós',
  subtitle: 'Uma empresa de engenharia de sistemas apaixonada por teste e medição desde 2011.',
  seoDescription:
    'A BridgePoint é uma empresa portuguesa de engenharia de sistemas fundada em 2011, especializada em sistemas de teste para desenvolvimento, produção e controlo de qualidade.',
  intro: {
    titleStart: 'Fundada em',
    p1: 'A BridgePoint é uma empresa de engenharia de sistemas especializada no desenvolvimento de sistemas de teste para desenvolvimento, produção e qualidade.',
    p2: 'As nossas competências em desenvolvimento de software e hardware fazem a diferença na resolução de desafios de teste e medição.',
    p3: 'Com os nossos sistemas modulares, contribuímos para o sucesso dos nossos clientes: testes mais rápidos, melhor controlo de qualidade e redução de custos.',
    imageAlt: 'A equipa BridgePoint',
  },
  mission: {
    title: 'A Nossa Missão',
    items: ['A nossa equipa é apaixonada por engenharia!', 'Estamos sempre prontos para um novo desafio!', 'We Test for Your Success'],
  },
  values: {
    title: 'Os Nossos Valores',
    subtitle: 'Os princípios que orientam tudo o que fazemos na BridgePoint',
    items: [
      { title: 'Inovação', description: 'Procuramos continuamente novas formas de melhorar os sistemas de teste, antecipando tendências e desafios do setor.' },
      { title: 'Qualidade', description: 'Comprometemo-nos a entregar soluções de teste de elevada qualidade que correspondem ou superam as expectativas dos clientes.' },
      { title: 'Excelência', description: 'Procuramos a excelência em cada projeto, com atenção ao detalhe e foco na satisfação do cliente.' },
      { title: 'Colaboração', description: 'Trabalhamos lado a lado com os nossos clientes para compreender as suas necessidades e entregar soluções à medida.' },
    ],
  },
  team: {
    title: 'A Nossa Equipa',
    subtitle: 'Conheça os profissionais que estão por trás do sucesso da BridgePoint',
    members: [
      { name: 'Equipa de Engenharia', role: 'Desenvolvimento e Testes' },
      { name: 'Equipa de Software', role: 'Desenvolvimento de Software de Teste' },
      { name: 'Equipa de Hardware', role: 'Desenvolvimento de Hardware de Teste' },
    ],
  },
  journey: {
    title: 'O Nosso Percurso',
    subtitle: 'Os marcos que definiram a história da BridgePoint',
    items: [
      { year: 2011, title: 'Fundação', description: 'A BridgePoint é fundada como empresa de engenharia de sistemas especializada em sistemas de teste.' },
      { year: 2014, title: 'Crescimento', description: 'Expansão da atividade e abertura das primeiras instalações próprias.' },
      { year: 2017, title: 'Inovação', description: 'Desenvolvimento de metodologias de teste próprias que reforçaram a nossa oferta de serviços.' },
      { year: 2020, title: 'Expansão', description: 'Abertura de novos escritórios para servir melhor uma carteira de clientes em crescimento.' },
      { year: 2023, title: 'Reconhecimento', description: 'Reconhecimento do setor pela excelência no desenvolvimento de sistemas de teste.' },
    ],
  },
  cta: {
    title: 'Junte-se à Nossa Equipa de Inovadores',
    text: 'Procuramos sempre pessoas talentosas que partilhem a nossa paixão pela engenharia e pela excelência em testes. Conheça as vagas em aberto e faça parte da nossa história de sucesso.',
    button: 'Ver Carreiras',
  },
};

export const aboutDict = defineDict('about', { en, pt });
