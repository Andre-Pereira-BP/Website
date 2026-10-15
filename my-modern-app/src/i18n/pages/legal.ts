// Legal texts. NOTE: these are a solid, GDPR-oriented starting point written for this website's actual
// data flows, but they should be reviewed by the company's legal/DPO advisor before launch
// (in particular the retention periods and the list of processors).

export type LegalBlock = string | { list: string[] } | { table: { head: string[]; rows: string[][] } };
export interface LegalSection {
  heading: string;
  body: LegalBlock[];
}
export interface LegalDoc {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
}
export type LegalDocId = 'privacy' | 'terms' | 'cookies';

export interface LegalContext {
  legalName: string;
  nipc: string;
  address: string;
  email: string;
  phone: string;
  siteUrl: string;
  analytics: boolean;
}

export const LAST_UPDATED = '2026-10-15';

const en = (c: LegalContext): Record<LegalDocId, LegalDoc> => ({
  privacy: {
    title: 'Privacy Policy',
    description: 'How BridgePoint collects and processes personal data on this website, in accordance with the GDPR.',
    intro: `${c.legalName} ("BridgePoint", "we") respects your privacy. This policy explains which personal data we collect through ${c.siteUrl}, why we collect it, how long we keep it and which rights you have under the General Data Protection Regulation (GDPR – Regulation (EU) 2016/679).`,
    sections: [
      {
        heading: '1. Data controller',
        body: [
          `${c.legalName}${c.nipc ? `, Tax ID (NIPC) ${c.nipc}` : ''}, with registered office at ${c.address}.`,
          `Contact for any privacy matter: ${c.email} · ${c.phone}.`,
        ],
      },
      {
        heading: '2. Data we collect',
        body: [
          {
            list: [
              'Contact form: name, email, company (optional), phone (optional), subject and the content of your message.',
              'Job applications: first and last name, email, phone (optional), LinkedIn profile (optional), cover letter (optional), your CV and any information you choose to include in it, and the position you applied for.',
              'Technical data: our hosting provider records technical information such as IP address, date/time and requested pages in server logs, for security and to keep the website working.',
              'Preferences: the language you choose is stored in your own browser (local storage).',
              ...(c.analytics
                ? ['Usage statistics: only if you accept analytics cookies, Google Analytics collects pseudonymised information about how the website is used (pages visited, approximate location, device type).']
                : []),
            ],
          },
          'We do not sell personal data and we do not use it for automated decision-making or profiling.',
        ],
      },
      {
        heading: '3. Purposes and legal bases',
        body: [
          {
            table: {
              head: ['Purpose', 'Legal basis (GDPR)'],
              rows: [
                ['Answering requests sent through the contact form', 'Your consent (art. 6(1)(a)) and steps prior to entering into a contract (art. 6(1)(b))'],
                ['Assessing job applications and contacting candidates', 'Your consent (art. 6(1)(a)) and pre-contractual steps (art. 6(1)(b))'],
                ['Website security, fraud and abuse prevention', 'Legitimate interest (art. 6(1)(f))'],
                ...(c.analytics ? [['Website usage statistics', 'Your consent (art. 6(1)(a)) — you can withdraw it at any time in "Cookie settings"']] : []),
                ['Complying with legal obligations', 'Legal obligation (art. 6(1)(c))'],
              ],
            },
          },
        ],
      },
      {
        heading: '4. How long we keep your data',
        body: [
          {
            list: [
              'Contact requests: up to 2 years after the last interaction, unless a business relationship follows (in which case the applicable legal periods apply).',
              'Job applications: up to 12 months after the recruitment process ends. Spontaneous applications are kept for 12 months. You may ask us to delete your application at any time.',
              'Server logs: for the period defined by our hosting provider, normally no more than 90 days.',
            ],
          },
        ],
      },
      {
        heading: '5. Who receives your data',
        body: [
          'Your data is only accessed by authorised BridgePoint staff. We use the following service providers (processors), bound by data processing agreements:',
          {
            list: [
              'Supabase — database and file storage for the contact form, job applications and website content (servers in the European Union).',
              'Website hosting provider — serving the website and keeping technical logs.',
              'OpenStreetMap Foundation — the map on the Contacts page loads map images from OpenStreetMap servers, which receive your IP address. No cookies are used.',
              ...(c.analytics ? ['Google Ireland Ltd. — Google Analytics, only with your consent.'] : []),
            ],
          },
          'Where a provider may process data outside the European Economic Area, we ensure appropriate safeguards are in place, such as the European Commission\'s Standard Contractual Clauses or an adequacy decision.',
        ],
      },
      {
        heading: '6. Your rights',
        body: [
          'You have the right to access, rectify and erase your data, to restrict or object to its processing, to data portability, and to withdraw your consent at any time (without affecting the lawfulness of processing carried out before withdrawal).',
          `To exercise these rights, contact ${c.email}. We will reply within one month.`,
          'You also have the right to lodge a complaint with the Portuguese supervisory authority, the Comissão Nacional de Proteção de Dados (CNPD – www.cnpd.pt).',
        ],
      },
      {
        heading: '7. Security',
        body: [
          'We apply appropriate technical and organisational measures to protect your data, including encrypted connections (HTTPS), access control with individual credentials for administrators, and access rules at database level that prevent visitors from reading data submitted by others.',
        ],
      },
      {
        heading: '8. Children',
        body: ['This website is not directed at children under 16 and we do not knowingly collect their data.'],
      },
      {
        heading: '9. Changes to this policy',
        body: ['We may update this policy. The date of the latest update is shown at the top of this page.'],
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Terms and conditions governing the use of the BridgePoint website.',
    intro: `These Terms of Use govern access to and use of the website ${c.siteUrl}, owned by ${c.legalName}${c.nipc ? ` (NIPC ${c.nipc})` : ''}, with registered office at ${c.address}. By using the website you accept these terms.`,
    sections: [
      {
        heading: '1. Purpose of the website',
        body: ['The website provides institutional information about BridgePoint, its services, news and job opportunities, and allows visitors to contact the company and submit job applications.'],
      },
      {
        heading: '2. Intellectual property',
        body: [
          'All content on this website — including texts, images, logos, videos, graphics and software — belongs to BridgePoint or its licensors and is protected by copyright and industrial property law. Third-party logos and trademarks belong to their respective owners.',
          'You may view and print content for personal, non-commercial use. Any other reproduction, distribution or modification requires prior written permission from BridgePoint.',
        ],
      },
      {
        heading: '3. Acceptable use',
        body: [
          'You agree not to use the website:',
          {
            list: [
              'in breach of any applicable law or regulation;',
              'to send unsolicited advertising, spam or malicious content through the forms;',
              'to impersonate any person or entity, or provide false information;',
              'to attempt to gain unauthorised access to the website, its servers or the restricted area, or to interfere with its operation.',
            ],
          },
        ],
      },
      {
        heading: '4. Information and liability',
        body: [
          'We make every effort to keep the information on the website accurate and up to date, but it is provided for information purposes only and does not constitute a binding offer. BridgePoint may change the content at any time without notice.',
          'To the extent permitted by law, BridgePoint is not liable for damages resulting from the use of, or inability to use, the website, nor for temporary interruptions due to maintenance or reasons beyond its control.',
        ],
      },
      {
        heading: '5. Links to other websites',
        body: ['The website may contain links to third-party websites (e.g. LinkedIn). BridgePoint has no control over and is not responsible for their content or privacy practices.'],
      },
      {
        heading: '6. Personal data',
        body: ['The processing of personal data is described in our Privacy Policy and Cookie Policy.'],
      },
      {
        heading: '7. Applicable law and jurisdiction',
        body: ['These terms are governed by Portuguese law. Any dispute shall be submitted to the competent Portuguese courts, without prejudice to mandatory legal provisions.'],
      },
      {
        heading: '8. Changes',
        body: [`BridgePoint may update these terms at any time. The current version is always available on this page. Questions: ${c.email}.`],
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'Which cookies and similar technologies the BridgePoint website uses and how to manage them.',
    intro: 'Cookies are small files stored on your device by the websites you visit. Similar technologies, such as the browser\'s local storage, work in a comparable way. This policy explains which ones we use.',
    sections: [
      {
        heading: '1. What we use',
        body: [
          {
            table: {
              head: ['Name', 'Type / provider', 'Purpose', 'Duration'],
              rows: [
                ['bp-lang', 'Local storage · BridgePoint', 'Remembers the language you selected (strictly necessary/functional)', 'Until you clear it'],
                ...(c.analytics
                  ? [
                      ['bp-cookie-consent', 'Local storage · BridgePoint', 'Records your cookie choices', 'Until you change or clear it'],
                      ['_ga, _ga_*', 'Cookie · Google Analytics', 'Usage statistics (only with consent; anonymised IP)', 'Up to 2 years'],
                    ]
                  : []),
                ['sb-*-auth-token', 'Local storage · Supabase', 'Keeps BridgePoint staff signed in to the restricted administration area (not used for visitors)', 'Session / until sign-out'],
              ],
            },
          },
          c.analytics
            ? 'Analytics cookies are only placed after you click "Accept all" or enable them under "Customise". Strictly necessary storage does not require consent.'
            : 'This website currently uses only strictly necessary/functional storage, which does not require consent. No advertising or tracking cookies are used.',
        ],
      },
      {
        heading: '2. Third-party content',
        body: ['The map on the Contacts page loads images from OpenStreetMap servers; it does not set cookies. Links to LinkedIn and Google Maps only open those services if you click them, and are then subject to their own policies.'],
      },
      {
        heading: '3. How to manage cookies',
        body: [
          c.analytics
            ? 'You can change or withdraw your consent at any time using the "Cookie settings" link at the bottom of every page.'
            : 'If optional cookies are introduced in the future, a consent banner will let you accept or reject them before they are used.',
          'You can also delete stored data and block cookies in your browser settings. Blocking strictly necessary storage may affect how the website works (for example, your language preference will not be remembered).',
        ],
      },
      {
        heading: '4. More information',
        body: [`See our Privacy Policy or contact us at ${c.email}.`],
      },
    ],
  },
});

const pt = (c: LegalContext): Record<LegalDocId, LegalDoc> => ({
  privacy: {
    title: 'Política de Privacidade',
    description: 'Como a BridgePoint recolhe e trata dados pessoais neste website, em conformidade com o RGPD.',
    intro: `A ${c.legalName} ("BridgePoint", "nós") respeita a sua privacidade. Esta política explica que dados pessoais recolhemos através de ${c.siteUrl}, para que fins, durante quanto tempo os conservamos e quais os seus direitos nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD – Regulamento (UE) 2016/679).`,
    sections: [
      {
        heading: '1. Responsável pelo tratamento',
        body: [
          `${c.legalName}${c.nipc ? `, NIPC ${c.nipc}` : ''}, com sede em ${c.address}.`,
          `Contacto para questões de privacidade: ${c.email} · ${c.phone}.`,
        ],
      },
      {
        heading: '2. Dados que recolhemos',
        body: [
          {
            list: [
              'Formulário de contacto: nome, email, empresa (opcional), telefone (opcional), assunto e o conteúdo da mensagem.',
              'Candidaturas: nome e apelido, email, telefone (opcional), perfil LinkedIn (opcional), carta de apresentação (opcional), o seu CV e a informação que nele decidir incluir, e a vaga a que se candidata.',
              'Dados técnicos: o nosso fornecedor de alojamento regista informação técnica como endereço IP, data/hora e páginas pedidas em registos (logs) do servidor, por motivos de segurança e funcionamento do website.',
              'Preferências: o idioma que escolhe é guardado no seu próprio navegador (armazenamento local).',
              ...(c.analytics
                ? ['Estatísticas de utilização: apenas se aceitar cookies de análise, o Google Analytics recolhe informação pseudonimizada sobre a utilização do website (páginas visitadas, localização aproximada, tipo de dispositivo).']
                : []),
            ],
          },
          'Não vendemos dados pessoais nem os utilizamos para decisões automatizadas ou definição de perfis.',
        ],
      },
      {
        heading: '3. Finalidades e fundamentos de licitude',
        body: [
          {
            table: {
              head: ['Finalidade', 'Fundamento (RGPD)'],
              rows: [
                ['Responder a pedidos enviados pelo formulário de contacto', 'Consentimento (art. 6.º, n.º 1, al. a)) e diligências pré-contratuais (al. b))'],
                ['Avaliar candidaturas e contactar candidatos', 'Consentimento (art. 6.º, n.º 1, al. a)) e diligências pré-contratuais (al. b))'],
                ['Segurança do website e prevenção de fraude e abusos', 'Interesse legítimo (art. 6.º, n.º 1, al. f))'],
                ...(c.analytics ? [['Estatísticas de utilização do website', 'Consentimento (art. 6.º, n.º 1, al. a)) — pode retirá-lo a qualquer momento em "Definições de cookies"']] : []),
                ['Cumprimento de obrigações legais', 'Obrigação jurídica (art. 6.º, n.º 1, al. c))'],
              ],
            },
          },
        ],
      },
      {
        heading: '4. Prazos de conservação',
        body: [
          {
            list: [
              'Pedidos de contacto: até 2 anos após a última interação, salvo se daí resultar uma relação comercial (aplicando-se então os prazos legais).',
              'Candidaturas: até 12 meses após o fim do processo de recrutamento. As candidaturas espontâneas são conservadas durante 12 meses. Pode pedir a eliminação da sua candidatura a qualquer momento.',
              'Registos do servidor: pelo período definido pelo fornecedor de alojamento, normalmente não superior a 90 dias.',
            ],
          },
        ],
      },
      {
        heading: '5. Destinatários dos dados',
        body: [
          'Os seus dados são acedidos apenas por colaboradores autorizados da BridgePoint. Recorremos aos seguintes prestadores de serviços (subcontratantes), vinculados por acordos de tratamento de dados:',
          {
            list: [
              'Supabase — base de dados e armazenamento de ficheiros do formulário de contacto, das candidaturas e dos conteúdos do website (servidores na União Europeia).',
              'Fornecedor de alojamento do website — disponibilização do website e registos técnicos.',
              'OpenStreetMap Foundation — o mapa da página de Contactos carrega imagens dos servidores do OpenStreetMap, que recebem o seu endereço IP. Não são utilizados cookies.',
              ...(c.analytics ? ['Google Ireland Ltd. — Google Analytics, apenas com o seu consentimento.'] : []),
            ],
          },
          'Sempre que um prestador possa tratar dados fora do Espaço Económico Europeu, asseguramos garantias adequadas, como as Cláusulas Contratuais-Tipo da Comissão Europeia ou uma decisão de adequação.',
        ],
      },
      {
        heading: '6. Os seus direitos',
        body: [
          'Tem o direito de aceder, retificar e apagar os seus dados, de limitar ou se opor ao seu tratamento, à portabilidade dos dados e de retirar o consentimento a qualquer momento (sem comprometer a licitude do tratamento efetuado até então).',
          `Para exercer estes direitos, contacte ${c.email}. Responderemos no prazo de um mês.`,
          'Tem ainda o direito de apresentar reclamação à autoridade de controlo, a Comissão Nacional de Proteção de Dados (CNPD – www.cnpd.pt).',
        ],
      },
      {
        heading: '7. Segurança',
        body: [
          'Aplicamos medidas técnicas e organizativas adequadas para proteger os seus dados, incluindo ligações cifradas (HTTPS), controlo de acessos com credenciais individuais para administradores e regras de acesso ao nível da base de dados que impedem os visitantes de consultar dados submetidos por terceiros.',
        ],
      },
      {
        heading: '8. Menores',
        body: ['Este website não se destina a menores de 16 anos e não recolhemos intencionalmente os seus dados.'],
      },
      {
        heading: '9. Alterações a esta política',
        body: ['Podemos atualizar esta política. A data da última atualização é indicada no topo desta página.'],
      },
    ],
  },
  terms: {
    title: 'Termos de Utilização',
    description: 'Termos e condições de utilização do website da BridgePoint.',
    intro: `Os presentes Termos de Utilização regulam o acesso e a utilização do website ${c.siteUrl}, propriedade da ${c.legalName}${c.nipc ? ` (NIPC ${c.nipc})` : ''}, com sede em ${c.address}. Ao utilizar o website, aceita estes termos.`,
    sections: [
      {
        heading: '1. Objeto do website',
        body: ['O website disponibiliza informação institucional sobre a BridgePoint, os seus serviços, notícias e oportunidades de emprego, e permite contactar a empresa e submeter candidaturas.'],
      },
      {
        heading: '2. Propriedade intelectual',
        body: [
          'Todos os conteúdos deste website — incluindo textos, imagens, logótipos, vídeos, grafismos e software — pertencem à BridgePoint ou aos seus licenciantes e estão protegidos pela legislação de direitos de autor e de propriedade industrial. Os logótipos e marcas de terceiros pertencem aos respetivos titulares.',
          'Pode consultar e imprimir conteúdos para uso pessoal e não comercial. Qualquer outra reprodução, distribuição ou modificação requer autorização prévia e escrita da BridgePoint.',
        ],
      },
      {
        heading: '3. Utilização aceitável',
        body: [
          'Compromete-se a não utilizar o website:',
          {
            list: [
              'em violação de qualquer lei ou regulamento aplicável;',
              'para enviar publicidade não solicitada, spam ou conteúdos maliciosos através dos formulários;',
              'para se fazer passar por outra pessoa ou entidade, ou fornecer informação falsa;',
              'para tentar aceder sem autorização ao website, aos seus servidores ou à área reservada, ou interferir com o seu funcionamento.',
            ],
          },
        ],
      },
      {
        heading: '4. Informação e responsabilidade',
        body: [
          'Procuramos manter a informação do website correta e atualizada, mas a mesma tem caráter meramente informativo e não constitui uma proposta contratual vinculativa. A BridgePoint pode alterar os conteúdos a qualquer momento, sem aviso prévio.',
          'Na medida permitida por lei, a BridgePoint não se responsabiliza por danos resultantes da utilização ou impossibilidade de utilização do website, nem por interrupções temporárias devidas a manutenção ou a causas alheias ao seu controlo.',
        ],
      },
      {
        heading: '5. Ligações para outros websites',
        body: ['O website pode conter ligações para websites de terceiros (ex.: LinkedIn). A BridgePoint não controla nem é responsável pelos seus conteúdos ou práticas de privacidade.'],
      },
      {
        heading: '6. Dados pessoais',
        body: ['O tratamento de dados pessoais está descrito na nossa Política de Privacidade e na Política de Cookies.'],
      },
      {
        heading: '7. Lei aplicável e foro',
        body: ['Estes termos regem-se pela lei portuguesa. Qualquer litígio será submetido aos tribunais portugueses competentes, sem prejuízo das normas legais imperativas aplicáveis.'],
      },
      {
        heading: '8. Alterações',
        body: [`A BridgePoint pode atualizar estes termos a qualquer momento. A versão em vigor está sempre disponível nesta página. Questões: ${c.email}.`],
      },
    ],
  },
  cookies: {
    title: 'Política de Cookies',
    description: 'Que cookies e tecnologias semelhantes o website da BridgePoint utiliza e como os gerir.',
    intro: 'Os cookies são pequenos ficheiros guardados no seu dispositivo pelos websites que visita. Tecnologias semelhantes, como o armazenamento local do navegador, funcionam de forma comparável. Esta política explica quais utilizamos.',
    sections: [
      {
        heading: '1. O que utilizamos',
        body: [
          {
            table: {
              head: ['Nome', 'Tipo / fornecedor', 'Finalidade', 'Duração'],
              rows: [
                ['bp-lang', 'Armazenamento local · BridgePoint', 'Memoriza o idioma escolhido (estritamente necessário/funcional)', 'Até ser apagado'],
                ...(c.analytics
                  ? [
                      ['bp-cookie-consent', 'Armazenamento local · BridgePoint', 'Regista as suas escolhas de cookies', 'Até alterar ou apagar'],
                      ['_ga, _ga_*', 'Cookie · Google Analytics', 'Estatísticas de utilização (só com consentimento; IP anonimizado)', 'Até 2 anos'],
                    ]
                  : []),
                ['sb-*-auth-token', 'Armazenamento local · Supabase', 'Mantém a sessão dos colaboradores da BridgePoint na área de administração (não é usado para visitantes)', 'Sessão / até terminar sessão'],
              ],
            },
          },
          c.analytics
            ? 'Os cookies de análise só são colocados depois de clicar em "Aceitar todos" ou de os ativar em "Personalizar". O armazenamento estritamente necessário não requer consentimento.'
            : 'Atualmente, este website utiliza apenas armazenamento estritamente necessário/funcional, que não requer consentimento. Não são utilizados cookies de publicidade nem de rastreamento.',
        ],
      },
      {
        heading: '2. Conteúdos de terceiros',
        body: ['O mapa da página de Contactos carrega imagens dos servidores do OpenStreetMap e não coloca cookies. As ligações para o LinkedIn e o Google Maps só abrem esses serviços se clicar nelas, ficando então sujeitas às respetivas políticas.'],
      },
      {
        heading: '3. Como gerir os cookies',
        body: [
          c.analytics
            ? 'Pode alterar ou retirar o seu consentimento a qualquer momento através da ligação "Definições de cookies" no rodapé de todas as páginas.'
            : 'Se forem introduzidos cookies opcionais no futuro, um aviso de consentimento permitirá aceitá-los ou rejeitá-los antes de serem utilizados.',
          'Pode também apagar os dados guardados e bloquear cookies nas definições do seu navegador. Bloquear o armazenamento estritamente necessário pode afetar o funcionamento do website (por exemplo, a preferência de idioma deixa de ser memorizada).',
        ],
      },
      {
        heading: '4. Mais informações',
        body: [`Consulte a nossa Política de Privacidade ou contacte-nos através de ${c.email}.`],
      },
    ],
  },
});

export const legalDocs = { en, pt };
export const legalLabels = {
  en: { updated: 'Last updated', otherDocs: 'Other legal documents', cookieSettings: 'Open cookie settings' },
  pt: { updated: 'Última atualização', otherDocs: 'Outros documentos legais', cookieSettings: 'Abrir definições de cookies' },
};
