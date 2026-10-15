# Website BridgePoint Test Systems

Website institucional bilingue (PT/EN) da BridgePoint, com área de administração para notícias, vagas, candidaturas e mensagens.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · Leaflet/OpenStreetMap · Supabase (base de dados, autenticação e ficheiros).

## Desenvolvimento

```bash
npm install
cp .env.example .env.local   # opcional: ligar ao Supabase
npm run dev                  # http://localhost:5173
```

Sem `.env.local` o site funciona com o conteúdo incluído em `src/data/fallbackContent.ts`; os formulários e o `/admin` precisam do Supabase.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção em `dist/`: pré-renderiza cada página e notícia em PT e EN e gera o `sitemap.xml` |
| `npm run preview` | Pré-visualizar o build |
| `npm run lint` | ESLint |

## Estrutura

```
src/
  config/company.ts      dados da empresa (contactos, escritórios, NIPC, LinkedIn)
  config/pages.ts        páginas públicas (pré-renderização e sitemap)
  i18n/                  idiomas: LanguageContext, Link com prefixo /pt|/en, textos PT/EN por página (i18n/pages/*.ts)
  pages/                 páginas públicas (+ NewsArticle, Legal, NotFound)
  components/            layout, formulários, mapa, UI partilhada
  admin/                 área de administração (/admin) — carregada só quando usada
  lib/                   Supabase, acesso a dados, SEO, consentimento de cookies
  data/fallbackContent.ts  notícias e vagas iniciais (PT/EN)
supabase/
  schema.sql             tabelas + regras de segurança (RLS) + storage
  seed.sql               conteúdo inicial
src/entry-server.tsx     render das páginas no build (usado por scripts/prerender.mjs)
scripts/prerender.mjs    gera o HTML estático de cada página/idioma + sitemap (generate-sitemap.mjs)
public/.htaccess         HTTPS, domínio canónico, páginas pré-renderizadas, rotas SPA, cabeçalhos de segurança, cache
```

### Traduções

Todos os textos fixos estão em `src/i18n/pages/<página>.ts` (objeto `en` e `pt` com a mesma estrutura — o TypeScript avisa se faltar uma tradução). Notícias e vagas têm campos `_pt` e `_en` editados no admin; se um idioma estiver vazio, mostra-se o outro.

O idioma faz parte do URL (`/pt/...`, `/en/...`). Nos links internos das páginas públicas use o `Link` de `src/i18n/Link.tsx` (acrescenta o prefixo da língua atual) em vez do `Link` do react-router. Uma página nova precisa de rota em `App.tsx` e de entrada em `src/config/pages.ts`.

## Área de administração e publicação

Ver **[ADMIN_SETUP.md](ADMIN_SETUP.md)** (configuração do Supabase, criação de gestores, publicação no Apache) e **[CHECKLIST-LANCAMENTO.md](CHECKLIST-LANCAMENTO.md)** (estado da checklist de lançamento).
