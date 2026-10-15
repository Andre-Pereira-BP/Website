// Single source of truth for company details used across the site
// (header, footer, contact page, map, legal pages, SEO).

export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://www.bridgepoint.pt';

export const COMPANY = {
  brand: 'BridgePoint',
  legalName: 'BridgePoint - Engenharia de Sistemas, Lda.',
  nipc: '509727476',
  foundedYear: 2011,
  phone: '+351 210 963 802',
  generalEmail: 'geral@bridgepoint.pt',
  privacyEmail: 'geral@bridgepoint.pt',
  linkedIn: 'https://pt.linkedin.com/company/bridgepoint-test-systems',
  linkedInJobs: 'https://www.linkedin.com/company/bridgepoint-test-systems/jobs/',
} as const;

export type DepartmentId = 'sales' | 'engineering' | 'support' | 'general';

export const DEPARTMENTS: { id: DepartmentId; email: string; phone: string }[] = [
  { id: 'sales', email: 'sales@bridgepoint.pt', phone: COMPANY.phone },
  { id: 'engineering', email: 'engineering@bridgepoint.pt', phone: COMPANY.phone },
  { id: 'support', email: 'support@bridgepoint.pt', phone: COMPANY.phone },
  { id: 'general', email: COMPANY.generalEmail, phone: COMPANY.phone },
];

export type OfficeId = 'headquarters' | 'south' | 'north';

export interface Office {
  id: OfficeId;
  lat: number;
  lng: number;
  address: string[];
}

export const OFFICES: Office[] = [
  {
    id: 'headquarters',
    lat: 38.54882911385019,
    lng: -7.9109488713984115,
    address: [
      'PACT – Parque do Alentejo de Ciência e Tecnologia',
      'Rua Luís Adelino Fonseca, lote 1A',
      '7005-345 Évora, Portugal',
    ],
  },
  {
    id: 'south',
    lat: 38.82208852432489,
    lng: -9.088276159181566,
    address: [
      'Rua Bartolomeu Dias, Nº 72, Fração L',
      '(EN10 Km 138)',
      '2695-715 São João da Talha, Portugal',
    ],
  },
  {
    id: 'north',
    lat: 42.07189299260265,
    lng: -8.406622779533802,
    address: [
      'Largo da Palmeira, Nº 24',
      'Cabo - Barbeita',
      '4950-045 Monção – Viana do Castelo, Portugal',
    ],
  },
];

export const directionsUrl = (office: Office) =>
  `https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`;
