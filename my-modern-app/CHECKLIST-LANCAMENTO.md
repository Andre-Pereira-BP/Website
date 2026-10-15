# Checklist de lançamento — revisão para o website BridgePoint

Revisão dos 20 pontos da checklist aplicados a **este** website (React/Vite, alojamento Apache em bridgepoint.pt, Supabase para conteúdos e formulários).

**Legenda:** ✅ feito no código · ⏳ ação da equipa antes/depois de publicar · ⚠️ atenção / limitação

**Veredicto geral:** a checklist faz sentido e está bem estruturada. Os 20 pontos aplicam-se todos, com dois ajustes: o banner de cookies (8) só é obrigatório se forem usados cookies não essenciais, e a identificação legal (10) deve seguir o art. 171.º do Código das Sociedades Comerciais. Sugiro acrescentar os pontos da secção final (SEO bilingue, revisão de conteúdos, direitos de imagem e acordo de subcontratação com o Supabase).

---

## 1. SEO e indexação

| # | Ponto | Estado | Detalhe |
|---|---|---|---|
| 1 | robots.txt | ✅ | `public/robots.txt`: permite tudo, exclui `/admin` dos resultados e indica o sitemap. Não é usado como proteção: o `/admin` está protegido por login e pelas regras da base de dados. |
| 2 | sitemap.xml | ✅ | Gerado automaticamente em cada `npm run build` (`scripts/generate-sitemap.mjs`, chamado pela pré-renderização) a partir das mesmas rotas que são pré-renderizadas: todas as páginas e notícias publicadas (do Supabase ou, sem Supabase, do conteúdo incluído), **em PT e em EN**, cada URL com as versões alternativas (`xhtml:link` com `hreflang`). ⚠️ Uma notícia nova só entra no sitemap no build seguinte. |
| 3 | Google Search Console | ⏳ | Verificar o domínio por DNS (registo TXT), submeter `https://www.bridgepoint.pt/sitemap.xml` e acompanhar a cobertura. Fazer também no Bing Webmaster Tools (importa do Google). |
| 4 | Títulos, descrições, headings | ✅ | Cada página tem título e meta description próprios, em PT e EN, cada língua no seu URL (`/pt/...`, `/en/...`) com `canonical` próprio e `hreflang` (ver “SEO bilingue” no fim). O HTML de cada página já vem pré-renderizado com o conteúdo e as meta tags, por isso os motores de pesquisa leem tudo sem executar JavaScript. Um único H1 por página; hierarquia H2/H3 corrigida; dados estruturados `Organization` (JSON-LD). |
| 5 | Open Graph e favicon | ✅ ⚠️ ⏳ | Imagem de partilha 1200×630 (`/img/og-image.jpg`), título/descrição OG e Twitter, favicon, ícone Apple e `theme-color`. O LinkedIn não executa JavaScript, por isso cada página e **cada notícia publicada** é pré-renderizada no build com `og:title`, `og:description`, `og:image`, `og:url` e `og:locale` próprios: ao partilhar uma notícia aparece o título, o resumo e a imagem dela, na língua do link. ⚠️ Uma notícia publicada depois do último build só fica com a pré-visualização certa depois de novo build e publicação (ver `ADMIN_SETUP.md`, secção 7). ⏳ Depois de publicar, testar um link de notícia no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) e confirmar que a imagem aparece (as imagens carregadas no admin são convertidas para WebP). |

## 2. Legal e privacidade

| # | Ponto | Estado | Detalhe |
|---|---|---|---|
| 6 | Política de privacidade | ✅ ⏳ | Nova página `/privacy` (PT/EN) escrita para os dados que o site recolhe de facto (contacto, candidaturas/CV, logs), com fundamentos do RGPD, prazos de conservação, subcontratantes (Supabase, alojamento, OpenStreetMap), direitos e CNPD. ⏳ **Validar com jurista/DPO**, sobretudo os prazos (12 meses para candidaturas, 2 anos para contactos). |
| 7 | Política de cookies | ✅ | Nova página `/cookies` com a tabela real do que é guardado. |
| 8 | Banner de consentimento | ✅ ⚠️ | Implementado com “Aceitar todos”, “Apenas necessários” (com o mesmo destaque) e “Personalizar”, e nada opcional é carregado antes da escolha. **Hoje o site não usa cookies não essenciais**, por isso o banner fica oculto, e bem: a lei não o exige e um banner desnecessário prejudica a experiência. Aparece automaticamente se for configurado o Google Analytics (`VITE_GA_MEASUREMENT_ID`). Para isso também contribuiu ter deixado de usar o Google Maps e o Google Fonts, que enviavam o IP do visitante à Google sem consentimento. |
| 9 | Termos e condições | ✅ | Nova página `/terms` (PT/EN), adequada a um site institucional (sem venda online). |
| 10 | Identificação legal | ⚠️ ⏳ | O rodapé e as páginas legais mostram a denominação, a sede e os contactos. ⏳ **Falta o NIPC**: preencher `nipc` em `src/config/company.ts`, que passa a aparecer no rodapé e nas políticas. ⏳ Confirmar com o contabilista ou jurista o **art. 171.º do Código das Sociedades Comerciais**, que exige no website a firma, o tipo, a sede, a conservatória, o n.º de matrícula/NIPC e o capital social. O Livro de Reclamações Eletrónico e a informação sobre RAL (Lei 144/2015) só são obrigatórios se houver venda ou serviços a consumidores; numa empresa B2B, em princípio, não se aplicam. |

## 3. Segurança e infraestrutura

| # | Ponto | Estado | Detalhe |
|---|---|---|---|
| 11 | HTTPS / SSL | ✅ ⏳ | O `.htaccess` força HTTPS (301) e ativa o HSTS. ⏳ Confirmar no alojamento que o certificado é válido e de renovação automática (AutoSSL / Let's Encrypt). |
| 12 | Redirecionamentos e domínio canónico | ✅ ⏳ | Hoje `bridgepoint.pt` e `www.bridgepoint.pt` respondem os dois, sem domínio canónico (verificado). O novo `.htaccess` faz: sem `www` → **`www`** (301), **`/wordpress/*` → `/` (301)** para não perder links e resultados do Google do site antigo, `/pt` e `/en` → `/pt/` e `/en/` e sem barra final nas restantes páginas (301), e tags `canonical` em todas as páginas. O endereço `/` e os URLs antigos sem idioma (ex.: `/about`) levam o visitante para a mesma página na língua preferida (escolha guardada ou língua do browser). ⏳ Se preferirem o domínio sem `www`, alterar `.htaccess`, `VITE_SITE_URL` e `index.html`. |
| 13 | Backups | ⏳ | O código está no GitHub e as imagens do site no repositório. **Base de dados e ficheiros do Supabase**: o plano gratuito não tem backups recuperáveis. Usar o plano Pro (backups diários) ou um export periódico, e **testar uma recuperação**. |
| 14 | Proteção contra ataques | ✅ ⚠️ ⏳ | As dependências de produção não têm vulnerabilidades (`npm audit`) e o Dependabot está ativo. As regras de segurança da base de dados (RLS) foram testadas com 30 verificações: visitantes só leem conteúdo publicado e só podem *enviar* mensagens e candidaturas, e só administradores leem ou alteram dados. Os formulários têm anti-spam (honeypot e tempo mínimo de preenchimento), limites de tamanho e tipo de ficheiro, e validação na base de dados. O `.htaccess` define Content-Security-Policy e cabeçalhos de segurança, e o admin não permite registo público. ⚠️ **A chave da API Google Maps estava no repositório GitHub** (`mapsapi.env`). Foi removida e já não é usada, mas continua no histórico do git. ⏳ **Revogá-la ou restringi-la já na Google Cloud Console.** ⏳ Recomendado: ativar MFA nas contas de administrador no Supabase e, se surgir spam, acrescentar Cloudflare Turnstile aos formulários. |
| 15 | Páginas de erro e logs | ✅ ⚠️ | Página 404 bilingue (com `noindex`); ficheiros inexistentes devolvem um 404 real; os erros de carregamento mostram uma mensagem amigável sem detalhes técnicos. ⚠️ As páginas existentes são ficheiros HTML pré-renderizados, mas um URL inexistente continua a devolver HTTP 200 com a página 404 (um “soft 404”, limitação conhecida: o fallback da aplicação é necessário para as notícias publicadas depois do último build). A página 500 não se aplica: o site é estático. ⏳ Rever periodicamente os logs do Apache e do Supabase. |

## 4. Desempenho, experiência e monitorização

| # | Ponto | Estado | Detalhe |
|---|---|---|---|
| 16 | Design responsivo | ✅ ⏳ | Testado a 375 px, em tablet e a 1440 px: nenhuma página tem scroll horizontal no telemóvel; o menu móvel bloqueia o scroll e fecha com Esc; o hero foi ajustado para telemóvel. ⏳ Testar em dispositivos reais (sobretudo Safari em iPhone). |
| 17 | Velocidade / Core Web Vitals | ✅ ⏳ | Imagens de **55 MB para 4 MB** (WebP); vídeo de **43 MB para 5,3 MB**, carregado só quando está visível (antes era descarregado em autoplay na página inicial); JavaScript inicial de 520 KB para 365 KB, com as restantes páginas, o Supabase e o mapa carregados a pedido; Font Awesome (cerca de 200 KB de CSS não usado) removido; fontes alojadas no próprio site; cache longa para os ficheiros estáticos no `.htaccess`; as páginas chegam já com o conteúdo em HTML (pré-renderização) e o JavaScript só “hidrata” o que já está no ecrã. ⏳ Correr o PageSpeed Insights depois de publicar. |
| 18 | Analytics e conversões | ✅ ⏳ | Preparado para Google Analytics 4 só com consentimento, com eventos de conversão `contact_form_submit` e `job_application_submit`. ⏳ Decidir a ferramenta. **Recomendação:** uma ferramenta sem cookies (Plausible, Umami ou Cloudflare Web Analytics) dispensa o banner e é mais simples de gerir em termos de RGPD. |
| 19 | Formulários e contactos | ✅ ⏳ | **Antes, o formulário de candidatura era falso**: mostrava “enviado” mas não enviava nada. A newsletter também não fazia nada e foi substituída por um link para o LinkedIn. Agora há formulário de contacto e de candidatura reais, gravados no Supabase, com validação, consentimento RGPD ligado à política e CV guardado em privado. Foram testados contra uma API simulada. ⏳ Testar com o Supabase real e configurar o aviso por email de novas mensagens e candidaturas (`ADMIN_SETUP.md`, secção 9). |
| 20 | Acessibilidade e testes finais | ✅ ⏳ | Link “saltar para o conteúdo”, foco visível, textos alternativos, etiquetas e erros associados aos campos, `lang` correto por idioma, carrossel com pausa, respeito por `prefers-reduced-motion`, diálogos com Esc. ⏳ Auditoria Lighthouse/axe e teste com leitor de ecrã; percorrer os percursos principais (contacto, candidatura, admin) depois de publicar. |

---

## Pontos que sugiro acrescentar à checklist

1. **SEO bilingue** ✅ ⏳: cada página existe em dois URLs, `/pt/...` e `/en/...` (ex.: `/pt/news/<slug>` e `/en/news/<slug>`), e o Google pode indexar as duas línguas.
   - Cada página indica o seu `canonical` e as alternativas `hreflang` `pt-PT`, `en` e `x-default` (a versão inglesa, para visitantes de outras línguas); o `sitemap.xml` lista as duas versões com as mesmas alternativas.
   - O seletor de bandeiras leva à mesma página na outra língua (mantém a posição na página) e guarda a escolha. `/` e os URLs antigos sem idioma redirecionam para a língua guardada ou, na falta dela, para a língua do browser (português → PT, restantes → EN). O `/admin` não tem prefixo.
   - **Pré-renderização**: no `npm run build`, cada página pública e cada notícia publicada é gerada em HTML estático nas duas línguas (`scripts/prerender.mjs`), com título, descrição, Open Graph e conteúdo. O `.htaccess` serve esses ficheiros e mantém o fallback da aplicação para o resto.
   - ⚠️ Notícias publicadas depois do último build funcionam (o site carrega-as no browser), mas só ganham HTML próprio, pré-visualização no LinkedIn e entrada no sitemap no build seguinte.
   - ⏳ Depois de publicar: submeter o sitemap no Search Console e verificar, em *Inspeção de URL*, uma página PT e uma EN.
2. **Revisão de conteúdos antes de publicar** ⏳:
   - As notícias e vagas atuais parecem de exemplo (por exemplo, uma conferência de fevereiro de 2025 anunciada numa notícia de 2023, citações genéricas e vagas de 2024). Atualizar ou eliminar no `/admin`.
   - “Qualidade em números” (99,8 %, NPS 90+, <0,5 %, 4000+ h) e os marcos (ISO 2013, TÜV 2020): confirmar que são reais (risco de publicidade enganosa).
   - Os testemunhos na página de carreiras são dos dois Diretores-Gerais a falar como colaboradores; convém substituí-los por testemunhos da equipa.
   - Confirmar que os emails `sales@`, `engineering@` e `support@bridgepoint.pt` existem.
3. **Direitos de imagem** ⏳: consentimento escrito dos colaboradores que aparecem em fotografias, e autorização dos clientes para usar os seus logótipos.
4. **RGPD — documentação interna** ⏳: assinar o DPA (acordo de subcontratação) com o Supabase (disponível no painel), registar os tratamentos (art. 30.º) e definir quem elimina as candidaturas e mensagens antigas.
5. **Limpeza do repositório**: ficheiros duplicados (`logo_lP - Cópia.png`, `siroco - Cópia.png`), a pasta `img/notUsed` e os originais pesados (o vídeo de 43 MB e as imagens PNG/JPG agora substituídas por WebP) podem ser removidos para tornar o repositório mais leve.
