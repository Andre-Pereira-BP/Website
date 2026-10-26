/**
 * Images and documents that managers can replace in the admin area ("Imagens e ficheiros").
 * Pages refer to a slot by its key; the site shows the uploaded file (table `site_media`) or,
 * when none was uploaded, the original file in /public listed here.
 */

export const MEDIA_GROUPS = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Empresa' },
  { id: 'testSystems', label: 'Sistemas de Teste' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'quality', label: 'Qualidade' },
  { id: 'careers', label: 'Carreiras' },
  { id: 'footer', label: 'Rodapé' },
] as const;

export type MediaGroupId = (typeof MEDIA_GROUPS)[number]['id'];

export interface MediaSlot {
  group: MediaGroupId;
  /** Name shown in the admin area */
  label: string;
  /** Section of the page, used to group slots in the admin area */
  section: string;
  kind: 'image' | 'document';
  /** Original file in /public (null: no original, e.g. a document only available in one language) */
  src: string | null;
  /** Size of the original document, in bytes */
  bytes?: number;
  /** Recommended size, shown to the manager */
  hint?: string;
  /** Uploaded images are resized to this width (default 1600 px) */
  maxWidth?: number;
}

const photo = (group: MediaGroupId, section: string, label: string, src: string, hint = '1600×1000', maxWidth = 1600): MediaSlot => ({
  group,
  section,
  label,
  kind: 'image',
  src,
  hint,
  maxWidth,
});

const logo = (group: MediaGroupId, section: string, label: string, src: string): MediaSlot => ({
  group,
  section,
  label,
  kind: 'image',
  src,
  hint: 'PNG com fundo transparente, ~400 px de largura',
  maxWidth: 600,
});

const pdf = (label: string, src: string | null, bytes?: number): MediaSlot => ({
  group: 'quality',
  section: 'Documentos da Qualidade',
  label,
  kind: 'document',
  src,
  bytes,
});

export const MEDIA_SLOTS = {
  // Home
  'home.hero.1': photo('home', 'Banner principal', 'Slide 1', '/img/general/tech_car.webp', '1920×1080', 1920),
  'home.hero.2': photo('home', 'Banner principal', 'Slide 2', '/img/general/tech_touch.webp', '1920×1080', 1920),
  'home.hero.3': photo('home', 'Banner principal', 'Slide 3', '/img/general/car_charging.webp', '1920×1080', 1920),
  'home.about': photo('home', 'Sobre nós', 'Fotografia da equipa', '/img/team/bp_team_bw.webp'),
  'home.services.1': photo('home', 'Serviços', 'Automóvel', '/img/general/car_interior-scaled.webp'),
  'home.services.2': photo('home', 'Serviços', 'Veículos Elétricos', '/img/general/ev_chargers-crop.webp'),
  'home.services.3': photo('home', 'Serviços', 'Componentes Eletrónicos', '/img/general/chip.webp'),
  'home.customers.benteler': logo('home', 'Clientes', 'Benteler', '/img/clientLogos/logo_benteler.png'),
  'home.customers.borgwarner': logo('home', 'Clientes', 'BorgWarner', '/img/clientLogos/logo_BorgWarner.png'),
  'home.customers.embraer': logo('home', 'Clientes', 'Embraer', '/img/clientLogos/logo_embraer.png'),
  'home.customers.exercito': logo('home', 'Clientes', 'Exército Português', '/img/clientLogos/logo_exercito.png'),
  'home.customers.hanon': logo('home', 'Clientes', 'Hanon Systems', '/img/clientLogos/logo_hanon.png'),
  'home.customers.incm': logo('home', 'Clientes', 'INCM', '/img/clientLogos/logo_incm.png'),
  'home.customers.jdeus': logo('home', 'Clientes', 'JDEUS', '/img/clientLogos/logo_jdeus.png'),
  'home.customers.kemet': logo('home', 'Clientes', 'KEMET', '/img/clientLogos/logo_kemet.png'),
  'home.customers.lnec': logo('home', 'Clientes', 'LNEC', '/img/clientLogos/logo_lnec.png'),
  'home.customers.ip': logo('home', 'Clientes', 'Infraestruturas de Portugal', '/img/clientLogos/logo_lP.png'),
  'home.customers.ipq': logo('home', 'Clientes', 'IPQ', '/img/clientLogos/logo_lPQ.png'),
  'home.customers.isq': logo('home', 'Clientes', 'ISQ', '/img/clientLogos/logo_lSQ.png'),
  'home.customers.siemens': logo('home', 'Clientes', 'Siemens', '/img/clientLogos/logo_siemens.png'),
  'home.customers.te': logo('home', 'Clientes', 'TE Connectivity', '/img/clientLogos/logo_te.png'),
  'home.customers.vishay': logo('home', 'Clientes', 'Vishay', '/img/clientLogos/logo_Vishay.png'),
  'home.customers.visteon': logo('home', 'Clientes', 'Visteon', '/img/clientLogos/logo_visteon.png'),
  'home.certs.iso9001': logo('home', 'Certificações', 'ISO 9001', '/img/certifications/iso9001.png'),
  'home.certs.ni': logo('home', 'Certificações', 'NI Alliance Partner', '/img/certifications/Alliance-Partner-NI.jpeg'),
  'home.certs.labview': logo('home', 'Certificações', 'Certified LabVIEW', '/img/certifications/LabView_cert.png'),
  'home.certs.top5': logo('home', 'Certificações', 'Top 5% 2022', '/img/certifications/topscoring5.png'),
  'home.certs.pmelider': logo('home', 'Certificações', 'PME Líder', '/img/certifications/pmelider24.png'),

  // About
  'about.intro': photo('about', 'Introdução', 'Fotografia da equipa', '/img/team/team_1024.webp'),
  'about.team.1': photo('about', 'Equipa', 'Equipa de Engenharia', '/img/team/bp_team_bw.webp', '800×800', 1000),
  'about.team.2': photo('about', 'Equipa', 'Equipa de Software', '/img/team/milton_team.webp', '800×800', 1000),
  'about.team.3': photo('about', 'Equipa', 'Equipa de Hardware', '/img/team/santo_team.webp', '800×800', 1000),

  // Test systems
  'testSystems.development': photo('testSystems', 'Desenvolvimento de Produto', 'Imagem principal', '/img/general/prod_dev.webp'),
  'testSystems.development.example.1': photo('testSystems', 'Desenvolvimento de Produto', 'Exemplo 1 — Sistema de Teste AVAC', '/img/general/hvac.webp'),
  'testSystems.development.example.2': photo('testSystems', 'Desenvolvimento de Produto', 'Exemplo 2 — Banco de Ensaio de Baterias', '/img/general/ev_chargers-crop.webp'),
  'testSystems.development.example.3': photo('testSystems', 'Desenvolvimento de Produto', 'Exemplo 3 — Validação de Protótipos', '/img/general/tech_car-scaled.webp'),
  'testSystems.production': photo('testSystems', 'Produção', 'Imagem principal', '/img/general/prod.webp'),
  'testSystems.production.example.1': photo('testSystems', 'Produção', 'Exemplo 1 — Tester de Fim de Linha', '/img/general/prod.webp'),
  'testSystems.production.example.2': photo('testSystems', 'Produção', 'Exemplo 2 — Teste de Displays', '/img/general/fabrica.webp'),
  'testSystems.production.example.3': photo('testSystems', 'Produção', 'Exemplo 3 — Tester Robotizado de Montagem', '/img/general/chip.webp'),
  'testSystems.quality': photo('testSystems', 'Qualidade', 'Imagem principal', '/img/general/cientist.webp'),
  'testSystems.quality.example.1': photo('testSystems', 'Qualidade', 'Exemplo 1 — Sistema de Burn-In', '/img/general/cientist.webp'),
  'testSystems.quality.example.2': photo('testSystems', 'Qualidade', 'Exemplo 2 — Análise NVH', '/img/general/flow.webp'),
  'testSystems.quality.example.3': photo('testSystems', 'Qualidade', 'Exemplo 3 — Posto de Auditoria', '/img/general/tech_touch.webp'),

  // Expertise
  'expertise.software': photo('expertise', 'Desenvolvimento de Software', 'Imagem principal', '/img/expertise/software.webp'),
  'expertise.software.case.1': photo('expertise', 'Desenvolvimento de Software', 'Caso 1 — VTester', '/img/expertise/software_modern.webp'),
  'expertise.software.case.2': photo('expertise', 'Desenvolvimento de Software', 'Caso 2 — Monitorização Ambiental', '/img/expertise/chipset.webp'),
  'expertise.hardware': photo('expertise', 'Desenvolvimento de Hardware', 'Imagem principal', '/img/expertise/hardware_dev.webp'),
  'expertise.hardware.case.1': photo('expertise', 'Desenvolvimento de Hardware', 'Caso 1 — Interface de Alta Tensão', '/img/expertise/high_volt.webp'),
  'expertise.hardware.case.2': photo('expertise', 'Desenvolvimento de Hardware', 'Caso 2 — Multiplexagem', '/img/expertise/mux.webp'),
  'expertise.realtime': photo('expertise', 'Controlo em Tempo Real', 'Imagem principal', '/img/general/hvac.webp'),
  'expertise.realtime.case.1': photo('expertise', 'Controlo em Tempo Real', 'Caso 1 — Ensaios de Vibração', '/img/expertise/vibration_control.webp'),
  'expertise.realtime.case.2': photo('expertise', 'Controlo em Tempo Real', 'Caso 2 — Tester HIL', '/img/expertise/hil_tester.webp'),
  'expertise.robotics': photo('expertise', 'Robótica e Automação', 'Imagem principal', '/img/general/prod.webp'),
  'expertise.robotics.case.1': photo('expertise', 'Robótica e Automação', 'Caso 1 — Teste de Displays', '/img/expertise/display-testing.webp'),
  'expertise.robotics.case.2': photo('expertise', 'Robótica e Automação', 'Caso 2 — Montagem Colaborativa', '/img/expertise/human_robot.webp'),
  'expertise.daq': photo('expertise', 'Aquisição de Dados', 'Imagem principal', '/img/general/flow.webp'),
  'expertise.daq.case.1': photo('expertise', 'Aquisição de Dados', 'Caso 1 — Integridade Estrutural', '/img/expertise/dmms.webp'),
  'expertise.daq.case.2': photo('expertise', 'Aquisição de Dados', 'Caso 2 — Análise Acústica', '/img/expertise/server.webp'),
  'expertise.vision': photo('expertise', 'Sistemas de Visão', 'Imagem principal', '/img/general/fabrica.webp'),
  'expertise.vision.case.1': photo('expertise', 'Sistemas de Visão', 'Caso 1 — Displays Automóveis', '/img/expertise/displayq.webp'),
  'expertise.vision.case.2': photo('expertise', 'Sistemas de Visão', 'Caso 2 — Defeitos de Superfície', '/img/expertise/surface_detection.webp'),
  'expertise.partners.itec': logo('expertise', 'Parceiros', 'ITEC', '/img/logosPartners/itec.png'),
  'expertise.partners.imesif': logo('expertise', 'Parceiros', 'IMESIF', '/img/logosPartners/imesif.png'),
  'expertise.partners.siroco': logo('expertise', 'Parceiros', 'Siroco', '/img/logosPartners/siroco.png'),
  'expertise.partners.zeugma': logo('expertise', 'Parceiros', 'Zeugma', '/img/logosPartners/zeugma.jpg'),

  // Quality
  'quality.docs.policy.pt': pdf('Política da Qualidade (PT)', '/docs/quality/politica-da-qualidade-pt.pdf', 84555),
  'quality.docs.policy.en': pdf('Política da Qualidade (EN)', '/docs/quality/quality-policy-en.pdf', 183015),
  'quality.docs.manual.pt': pdf('Manual da Qualidade (PT)', '/docs/quality/manual-da-qualidade-pt.pdf', 912543),
  'quality.docs.manual.en': pdf('Manual da Qualidade (EN)', null),
  'quality.docs.suppliers.pt': pdf('Critérios de Avaliação de Fornecedores (PT)', '/docs/quality/criterios-avaliacao-fornecedores-pt.pdf', 152208),
  'quality.docs.suppliers.en': pdf('Critérios de Avaliação de Fornecedores (EN)', '/docs/quality/supplier-evaluation-criteria-en.pdf', 134804),
  'quality.certs.iso9001': logo('quality', 'Certificações', 'ISO 9001', '/img/certifications/iso9001.png'),
  'quality.certs.ni': logo('quality', 'Certificações', 'NI Alliance Partner', '/img/certifications/Alliance-Partner-NI.jpeg'),
  'quality.certs.pmelider': logo('quality', 'Certificações', 'PME Líder', '/img/certifications/pmelider24.png'),
  'quality.certs.top5': logo('quality', 'Certificações', 'Top 5% 2022', '/img/certifications/topscoring5.png'),
  'quality.approach': photo('quality', 'A Nossa Abordagem', 'Imagem', '/img/general/cientist.webp'),

  // Careers
  'careers.banner': photo('careers', 'Banner', 'Fundo do banner', '/img/team/bp_team_bw.webp', '1920×800', 1920),
  'careers.testimonials.1': photo('careers', 'Testemunhos', 'Luís Raminhos', '/img/team/luis.webp', '400×400', 400),
  'careers.testimonials.2': photo('careers', 'Testemunhos', 'José Rocha', '/img/team/jose.webp', '400×400', 400),
  'careers.testimonials.3': photo('careers', 'Testemunhos', 'Ruben Orvalho', '/img/team/ruben.webp', '400×400', 400),

  // Footer
  'footer.certs.pmelider': logo('footer', 'Certificações', 'PME Líder (versão branca)', '/img/certifications/pmelider24_white.png'),
  'footer.certs.iso9001': logo('footer', 'Certificações', 'ISO 9001', '/img/certifications/iso9001.png'),
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof MEDIA_SLOTS;

export const MEDIA_KEYS = Object.keys(MEDIA_SLOTS) as MediaKey[];

export const isMediaKey = (key: string): key is MediaKey => key in MEDIA_SLOTS;

export const formatBytes = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace('.0', '')} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
