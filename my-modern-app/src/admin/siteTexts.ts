import { commonDict } from '../i18n/common';
import { dictId } from '../i18n/dict';
import type { Lang } from '../i18n/locale';
import { aboutDict } from '../i18n/pages/about';
import { careersDict } from '../i18n/pages/careers';
import { contactDict } from '../i18n/pages/contact';
import { expertiseDict } from '../i18n/pages/expertise';
import { homeDict } from '../i18n/pages/home';
import { newsDict } from '../i18n/pages/news';
import { qualityDict } from '../i18n/pages/quality';
import { testSystemsDict } from '../i18n/pages/testSystems';
import type { TextOverrides } from '../lib/siteContent';

/** Pages whose texts can be edited in "Textos do site". `id` is the dictionary id (see defineDict). */
export const TEXT_PAGES = [
  { dict: commonDict, label: 'Menu, rodapé e comuns', path: '/', description: 'Menu de navegação, rodapé, aviso de cookies e botões usados em várias páginas.' },
  { dict: homeDict, label: 'Início', path: '/', description: 'Banner principal, números, serviços, vídeo, clientes e certificações.' },
  { dict: aboutDict, label: 'Empresa', path: '/about', description: 'Introdução, missão, valores, equipa e percurso.' },
  { dict: testSystemsDict, label: 'Sistemas de Teste', path: '/test-systems', description: 'Desenvolvimento, produção e qualidade, com os respetivos exemplos.' },
  { dict: expertiseDict, label: 'Expertise', path: '/expertise', description: 'Áreas de competência, casos de estudo e parceiros.' },
  { dict: qualityDict, label: 'Qualidade', path: '/quality', description: 'Indicadores, pilares, certificações, documentos e abordagem.' },
  { dict: newsDict, label: 'Notícias', path: '/news', description: 'Textos da página de notícias (as notícias em si editam-se em "Notícias").' },
  { dict: careersDict, label: 'Carreiras', path: '/careers', description: 'Benefícios, testemunhos, formulário de candidatura e textos das vagas.' },
  { dict: contactDict, label: 'Contactos', path: '/contact', description: 'Departamentos, formulário de contacto e escritórios.' },
].map((page) => ({ ...page, id: dictId(page.dict)! }));

export type TextPage = (typeof TEXT_PAGES)[number];

export const findTextPage = (id: string | undefined) => TEXT_PAGES.find((page) => page.id === id);

export interface TextField {
  /** Dot-separated path, e.g. "services.items.0.title" */
  key: string;
  section: string;
  sectionLabel: string;
  label: string;
  original: Record<Lang, string>;
}

/** Names of the top-level sections that have no title of their own. */
const SECTIONS: Record<string, string> = {
  seo: 'Google (SEO)',
  hero: 'Banner principal',
  facts: 'Números',
  about: 'Sobre nós',
  nav: 'Menu',
  header: 'Cabeçalho',
  footer: 'Rodapé',
  offices: 'Escritórios',
  departments: 'Departamentos',
  common: 'Botões e mensagens comuns',
  map: 'Mapa',
  cookies: 'Aviso de cookies',
  notFound: 'Página não encontrada',
  jobTypes: 'Tipos de vaga',
  job: 'Detalhe da vaga',
  form: 'Formulário de candidatura',
  areas: 'Áreas de competência',
  systems: 'Sistemas',
  categories: 'Categorias',
  approach: 'A Nossa Abordagem',
};

/** Field names in Portuguese (keys of the dictionaries are in English). */
const WORDS: Record<string, string> = {
  title: 'Título',
  titleStart: 'Título (início)',
  titleEnd: 'Título (fim)',
  titleHighlight: 'Título (destaque)',
  subtitle: 'Subtítulo',
  description: 'Descrição',
  seoDescription: 'Descrição no Google',
  text: 'Texto',
  intro: 'Introdução',
  button: 'Botão',
  label: 'Etiqueta',
  value: 'Valor',
  metric: 'Valor',
  items: 'Itens',
  points: 'Pontos',
  name: 'Nome',
  role: 'Cargo',
  quote: 'Citação',
  imageAlt: 'Descrição da imagem (acessibilidade)',
  p1: 'Parágrafo 1',
  p2: 'Parágrafo 2',
  p3: 'Parágrafo 3',
  p4: 'Parágrafo 4',
  links: 'Ligações',
  // Navigation and footer
  home: 'Início',
  testSystems: 'Sistemas de Teste',
  expertise: 'Expertise',
  quality: 'Qualidade',
  news: 'Notícias',
  careers: 'Carreiras',
  contact: 'Contactos',
  skipToContent: 'Saltar para o conteúdo (acessibilidade)',
  openMenu: 'Abrir menu (acessibilidade)',
  closeMenu: 'Fechar menu (acessibilidade)',
  language: 'Idioma (acessibilidade)',
  homeLink: 'Ligação ao início (acessibilidade)',
  themeToDark: 'Mudar para modo escuro',
  themeToLight: 'Mudar para modo claro',
  certifications: 'Certificações',
  company: 'Empresa',
  headquarters: 'Sede',
  sales: 'Comercial',
  engineering: 'Engenharia',
  support: 'Suporte',
  privacy: 'Política de privacidade',
  terms: 'Termos e condições',
  cookieSettings: 'Definições de cookies',
  rights: 'Direitos reservados',
  south: 'Sul',
  north: 'Norte',
  general: 'Geral',
  learnMore: 'Saber mais',
  readMore: 'Ler mais',
  contactUs: 'Contacte-nos',
  close: 'Fechar',
  back: 'Voltar',
  loading: 'A carregar',
  errorLoading: 'Erro ao carregar',
  retry: 'Tentar novamente',
  followLinkedIn: 'Seguir no LinkedIn',
  getDirections: 'Obter direções',
  backToTop: 'Voltar ao topo',
  opensInNewTab: 'Abre num novo separador (acessibilidade)',
  activate: 'Ativar',
  acceptAll: 'Aceitar todos',
  rejectAll: 'Rejeitar todos',
  customize: 'Personalizar',
  save: 'Guardar',
  necessary: 'Necessários',
  necessaryDesc: 'Necessários (descrição)',
  analytics: 'Estatísticas',
  analyticsDesc: 'Estatísticas (descrição)',
  policyLink: 'Ligação à política',
  // Home
  prev: 'Slide anterior (acessibilidade)',
  next: 'Slide seguinte (acessibilidade)',
  goTo: 'Ir para o slide (acessibilidade)',
  pause: 'Pausar slides (acessibilidade)',
  play: 'Retomar slides (acessibilidade)',
  aboutUs: 'Botão "Sobre nós"',
  fallback: 'Aviso de vídeo não suportado',
  viewAll: 'Ver todas',
  // Careers
  spontaneous: 'Candidatura espontânea (botão)',
  viewOpenings: 'Ver vagas (botão)',
  filterBy: 'Filtrar por',
  search: 'Pesquisa',
  searchLabel: 'Pesquisa (acessibilidade)',
  department: 'Departamento',
  location: 'Localização',
  jobType: 'Tipo de vaga',
  allDepartments: 'Todos os departamentos',
  allLocations: 'Todas as localizações',
  allTypes: 'Todos os tipos',
  emptyTitle: 'Sem resultados (título)',
  emptyText: 'Sem resultados (texto)',
  noOpeningsTitle: 'Sem vagas abertas (título)',
  'full-time': 'Tempo inteiro',
  'part-time': 'Tempo parcial',
  contract: 'Contrato',
  internship: 'Estágio',
  remote: 'Remoto',
  viewDetails: 'Ver detalhes',
  apply: 'Candidatar',
  applyNow: 'Candidatar agora',
  applyLinkedIn: 'Candidatar pelo LinkedIn',
  posted: 'Publicada',
  today: 'Hoje',
  yesterday: 'Ontem',
  responsibilities: 'Responsabilidades',
  requirements: 'Requisitos',
  benefits: 'Benefícios',
  spontaneousTitle: 'Candidatura espontânea (título)',
  applyFor: 'Candidatura a',
  spontaneousInfo: 'Candidatura espontânea (informação)',
  firstName: 'Nome próprio',
  lastName: 'Apelido',
  email: 'Email',
  phone: 'Telefone',
  coverLetter: 'Carta de apresentação',
  coverPlaceholder: 'Carta de apresentação (texto de exemplo)',
  cv: 'CV',
  upload: 'Carregar ficheiro',
  dragDrop: 'Arrastar ficheiro',
  fileHint: 'Ajuda sobre o ficheiro',
  selected: 'Ficheiro selecionado',
  remove: 'Remover',
  required: 'Obrigatório',
  consent: 'Consentimento de privacidade',
  privacyLink: 'Ligação à política de privacidade',
  cancel: 'Cancelar',
  submit: 'Botão enviar',
  submitting: 'A enviar…',
  sending: 'A enviar…',
  successTitle: 'Envio com sucesso (título)',
  successText: 'Envio com sucesso (texto)',
  backToJobs: 'Voltar às vagas',
  emailInvalid: 'Erro: email inválido',
  cvType: 'Erro: tipo de ficheiro do CV',
  cvSize: 'Erro: tamanho do CV',
  // Contact
  message: 'Mensagem',
  messagePlaceholder: 'Mensagem (texto de exemplo)',
  another: 'Enviar outra mensagem',
  showOnMap: 'Ver no mapa',
  // Expertise and test systems
  keyCapabilities: 'Competências-chave',
  technologies: 'Tecnologias',
  caseStudies: 'Casos de estudo',
  details: 'Detalhes',
  keyPoints: 'Pontos-chave',
  viewExamples: 'Ver exemplos',
  examplesTitle: 'Título dos exemplos',
  // News
  all: 'Todas',
  technology: 'Tecnologia',
  events: 'Eventos',
  projects: 'Projetos',
  featured: 'Destaque',
  readFull: 'Ler notícia completa',
  searchPlaceholder: 'Pesquisa (texto de exemplo)',
  filterLabel: 'Filtro (acessibilidade)',
  backToNews: 'Voltar às notícias',
  source: 'Fonte',
  share: 'Partilhar',
  shareLinkedIn: 'Partilhar no LinkedIn',
  copyLink: 'Copiar ligação',
  copied: 'Ligação copiada',
  related: 'Notícias relacionadas',
  notFoundTitle: 'Notícia não encontrada (título)',
  notFoundText: 'Notícia não encontrada (texto)',
  followTitle: 'Seguir (título)',
  followText: 'Seguir (texto)',
  // Quality
  keyAchievements: 'Principais conquistas',
  achievements: 'Conquistas',
  toggle: 'Expandir (acessibilidade)',
  download: 'Botão descarregar',
  onlyIn: 'Aviso "só noutro idioma"',
};

const humanize = (key: string) => {
  if (WORDS[key]) return WORDS[key];
  const words = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Short name for an array item: its title/name when it has one, otherwise its position. */
const itemName = (item: unknown, index: number) => {
  if (isRecord(item)) {
    for (const key of ['title', 'name', 'label', 'question', 'value']) {
      const value = item[key];
      if (typeof value === 'string' && value.trim()) return `${index + 1}. ${value.length > 34 ? `${value.slice(0, 32)}…` : value}`;
    }
  }
  return `N.º ${index + 1}`;
};

/** Every editable string of a dictionary, in reading order. Functions, numbers, etc. are skipped. */
export function listTextFields(dict: { en: unknown; pt: unknown }): TextField[] {
  const fields: TextField[] = [];
  const walk = (en: unknown, pt: unknown, path: (string | number)[], labels: string[]) => {
    if (typeof en === 'string') {
      const top = path.length > 1 ? String(path[0]) : '_page';
      const ptTop = top === '_page' ? undefined : (dict.pt as Record<string, unknown>)[top];
      const sectionLabel =
        top === '_page'
          ? 'Cabeçalho da página'
          : isRecord(ptTop) && typeof ptTop.title === 'string'
            ? ptTop.title
            : (SECTIONS[top] ?? humanize(top));
      fields.push({
        key: path.join('.'),
        section: top,
        sectionLabel,
        label: (top === '_page' ? labels : labels.slice(1)).join(' › ') || humanize(String(path[path.length - 1])),
        original: { en, pt: typeof pt === 'string' ? pt : en },
      });
      return;
    }
    if (Array.isArray(en)) {
      en.forEach((item, i) => walk(item, Array.isArray(pt) ? pt[i] : undefined, [...path, i], [...labels, itemName(Array.isArray(pt) ? pt[i] : item, i)]));
      return;
    }
    if (isRecord(en)) {
      for (const key of Object.keys(en)) {
        walk(en[key], isRecord(pt) ? pt[key] : undefined, [...path, key], [...labels, humanize(key)]);
      }
    }
  };
  walk(dict.en, dict.pt, [], []);
  return fields;
}

/** Edited values stored in the database → { "path.to.field": "text" } for each language. */
export function flattenOverrides(content: TextOverrides | undefined, fields: TextField[]): Record<Lang, Record<string, string>> {
  const flat: Record<Lang, Record<string, string>> = { pt: {}, en: {} };
  for (const lang of ['pt', 'en'] as const) {
    const root = content?.[lang];
    if (!root) continue;
    for (const field of fields) {
      let node: unknown = root;
      for (const part of field.key.split('.')) node = isRecord(node) || Array.isArray(node) ? (node as Record<string, unknown>)[part] : undefined;
      if (typeof node === 'string' && node.trim() && node !== field.original[lang]) flat[lang][field.key] = node;
    }
  }
  return flat;
}

/** Inverse of flattenOverrides; empty texts and texts equal to the original are left out. */
export function buildOverrides(flat: Record<Lang, Record<string, string>>, fields: TextField[]): TextOverrides {
  const content: TextOverrides = {};
  for (const lang of ['pt', 'en'] as const) {
    const root: Record<string, unknown> = {};
    for (const field of fields) {
      const value = flat[lang][field.key];
      if (value === undefined || !value.trim() || value === field.original[lang]) continue;
      const parts = field.key.split('.');
      let node = root;
      parts.slice(0, -1).forEach((part) => {
        node[part] = isRecord(node[part]) ? node[part] : {};
        node = node[part] as Record<string, unknown>;
      });
      node[parts[parts.length - 1]] = value;
    }
    if (Object.keys(root).length) content[lang] = root;
  }
  return content;
}

/** Number of edited texts stored for a page (both languages). */
export const countOverrides = (content: TextOverrides | undefined) => {
  let total = 0;
  const walk = (node: unknown) => {
    if (typeof node === 'string') total += 1;
    else if (isRecord(node)) Object.values(node).forEach(walk);
  };
  walk(content?.pt);
  walk(content?.en);
  return total;
};
