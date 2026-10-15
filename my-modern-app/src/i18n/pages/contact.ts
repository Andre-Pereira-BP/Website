const en = {
  title: 'Contact Us',
  subtitle: "Talk to our team — we'll get back to you as soon as possible.",
  seoDescription: 'Contact BridgePoint: sales, engineering and technical support. Offices in Évora (HQ), São João da Talha and Monção, Portugal.',
  departments: {
    title: 'Get in Touch',
    subtitle: 'Contact our dedicated departments for inquiries about our services, technical support or any other questions you may have.',
    email: 'Email',
    phone: 'Phone',
  },
  form: {
    title: 'Send us a message',
    subtitle: 'Fill in the form and the right team will reply shortly.',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    phone: 'Phone',
    department: 'Subject',
    message: 'Message',
    messagePlaceholder: 'How can we help?',
    consent: 'I have read the {privacy} and consent to BridgePoint processing my data to answer this request.',
    privacyLink: 'Privacy Policy',
    submit: 'Send message',
    sending: 'Sending…',
    successTitle: 'Message sent!',
    successText: 'Thank you for contacting BridgePoint. We will get back to you as soon as possible.',
    another: 'Send another message',
    errors: {
      name: 'Please enter your name',
      email: 'Please enter a valid email address',
      message: 'Please write a message (at least 10 characters)',
      consent: 'You must accept the Privacy Policy',
      submit: 'We could not send your message. Please try again or email us at {email}.',
    },
  },
  offices: {
    title: 'Our Offices',
    subtitle: 'Visit one of our offices across Portugal',
    showOnMap: 'Show on map',
  },
  social: {
    title: 'Connect With Us',
    text: 'Follow us on LinkedIn to stay updated with our latest news and projects.',
  },
};

export type ContactDict = typeof en;

const pt: ContactDict = {
  title: 'Contactos',
  subtitle: 'Fale com a nossa equipa — responderemos o mais rapidamente possível.',
  seoDescription: 'Contacte a BridgePoint: área comercial, engenharia e suporte técnico. Escritórios em Évora (sede), São João da Talha e Monção.',
  departments: {
    title: 'Fale Connosco',
    subtitle: 'Contacte diretamente os nossos departamentos para questões sobre os nossos serviços, suporte técnico ou qualquer outro assunto.',
    email: 'Email',
    phone: 'Telefone',
  },
  form: {
    title: 'Envie-nos uma mensagem',
    subtitle: 'Preencha o formulário e a equipa certa responderá em breve.',
    name: 'Nome',
    email: 'Email',
    company: 'Empresa',
    phone: 'Telefone',
    department: 'Assunto',
    message: 'Mensagem',
    messagePlaceholder: 'Como podemos ajudar?',
    consent: 'Li a {privacy} e autorizo a BridgePoint a tratar os meus dados para responder a este pedido.',
    privacyLink: 'Política de Privacidade',
    submit: 'Enviar mensagem',
    sending: 'A enviar…',
    successTitle: 'Mensagem enviada!',
    successText: 'Obrigado por contactar a BridgePoint. Responderemos o mais rapidamente possível.',
    another: 'Enviar outra mensagem',
    errors: {
      name: 'Indique o seu nome',
      email: 'Introduza um endereço de email válido',
      message: 'Escreva uma mensagem (mínimo 10 caracteres)',
      consent: 'Tem de aceitar a Política de Privacidade',
      submit: 'Não foi possível enviar a sua mensagem. Tente novamente ou envie-nos um email para {email}.',
    },
  },
  offices: {
    title: 'Os Nossos Escritórios',
    subtitle: 'Visite-nos num dos nossos escritórios em Portugal',
    showOnMap: 'Ver no mapa',
  },
  social: {
    title: 'Acompanhe-nos',
    text: 'Siga-nos no LinkedIn para acompanhar as nossas últimas notícias e projetos.',
  },
};

export const contactDict = { en, pt };
