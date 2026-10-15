# Área de administração — configuração (Supabase)

A área reservada está em **`/admin`** (ex.: `https://www.bridgepoint.pt/admin`). Permite aos gestores do website:

- **Notícias** — criar, editar (PT e EN), publicar/despublicar, destacar e eliminar; carregar imagens (são otimizadas automaticamente para WebP).
- **Vagas** — criar, editar, duplicar, publicar/despublicar e eliminar vagas da página “Junte-se a Nós”.
- **Candidaturas** — consultar candidaturas recebidas pelo site, descarregar o CV (ligação privada e temporária), mudar o estado, adicionar notas internas, exportar CSV e eliminar.
- **Mensagens** — consultar pedidos do formulário de contacto, responder por email, arquivar e eliminar.

Enquanto o Supabase não estiver configurado, o website público continua a funcionar com o conteúdo incluído no código (`src/data/fallbackContent.ts`) e `/admin` mostra estas instruções.

---

## 1. Criar o projeto Supabase

1. Criar conta/projeto em <https://supabase.com> (plano gratuito é suficiente para começar).
2. **Região: Europa** (ex.: *Central EU – Frankfurt*), por causa do RGPD.
3. Guardar a palavra-passe da base de dados num gestor de palavras-passe.

## 2. Criar as tabelas e regras de segurança

No painel do Supabase → **SQL Editor** → *New query*:

1. Colar e executar o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) — cria as tabelas, as regras de segurança (RLS) e os “buckets” de ficheiros.
2. Colar e executar [`supabase/seed.sql`](supabase/seed.sql) — carrega as notícias e vagas atuais (em PT e EN).

Ambos podem ser executados mais do que uma vez sem duplicar dados.

## 3. Configurar a autenticação

Em **Authentication**:

1. **Sign In / Providers → Email**: manter ativo. **Desativar “Allow new users to sign up”** (só os administradores criam contas).
2. **URL Configuration**:
   - *Site URL*: `https://www.bridgepoint.pt`
   - *Redirect URLs*: acrescentar `https://www.bridgepoint.pt/admin/reset-password` (e `http://localhost:5173/admin/reset-password` para testes locais).
3. (Recomendado) **Emails → SMTP Settings**: configurar o servidor de email da empresa, para que os emails de recuperação de palavra-passe saiam de um endereço `@bridgepoint.pt`.

## 4. Criar os gestores (administradores)

1. **Authentication → Users → Add user → Create new user**: email + palavra-passe forte (marcar *Auto Confirm User*).
2. No **SQL Editor**, dar permissões de administrador (substituir o email):

   ```sql
   insert into public.admin_users (user_id, email)
   select id, email from auth.users where email = 'nome@bridgepoint.pt'
   on conflict do nothing;
   ```

Para retirar o acesso a alguém: `delete from public.admin_users where email = 'nome@bridgepoint.pt';` (e eliminar o utilizador em *Authentication → Users*).

> Uma conta que exista em *Authentication* mas **não** esteja em `admin_users` não consegue ver nem alterar nada — as regras de segurança estão na própria base de dados, não apenas no website.

## 5. Ligar o website ao Supabase

Em **Project Settings → API** copiar o *Project URL* e a chave **`anon` / public** (nunca usar a chave `service_role` no website).

Criar o ficheiro `my-modern-app/.env.production` (para o build do site) e/ou `my-modern-app/.env.local` (para desenvolvimento) a partir de [`.env.example`](.env.example):

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_SITE_URL=https://www.bridgepoint.pt
VITE_GA_MEASUREMENT_ID=
```

Estes ficheiros estão no `.gitignore` e **não devem ir para o GitHub**. A chave `anon` é pública por natureza (fica visível no browser); a proteção dos dados é feita pelas regras RLS do `schema.sql`.

Depois: `npm run build` e publicar a pasta `dist/` (ver secção 7).

## 6. Utilização no dia a dia

- **Notícias**: escrever sempre em PT e EN (os separadores mostram um ponto laranja quando falta um idioma; se faltar, o site mostra o outro idioma). Formatação do texto:
  - linha em branco → novo parágrafo
  - `## Título` → subtítulo
  - `- item` → lista
  - `**texto**` → negrito
  - `[texto](https://...)` → ligação
- Uma notícia marcada como **Destaque** aparece em grande no topo da página de notícias.
- O **endereço (slug)** é gerado a partir do título; evite alterá-lo depois de publicar (quebra ligações já partilhadas).
- **Vagas**: listas (responsabilidades, requisitos, benefícios) — um item por linha. Quando o recrutamento terminar, use **Despublicar** (fica guardada para reutilizar) ou **Duplicar** para criar uma vaga parecida.
- **Candidaturas/mensagens (RGPD)**: elimine-as quando deixarem de ser necessárias (a Política de Privacidade indica 12 meses para candidaturas e 2 anos para contactos).

## 7. Publicação (Apache — alojamento atual de bridgepoint.pt)

1. `cd my-modern-app && npm ci && npm run build`. O build lê as notícias publicadas no Supabase e gera uma página HTML para cada página e cada notícia, em PT e EN (pastas `dist/pt/` e `dist/en/`), além do `sitemap.xml`. Se aparecerem avisos `[prerender] ⚠` (ex.: Supabase inacessível), corrigir e repetir o build antes de publicar.
2. Enviar **todo** o conteúdo de `dist/` para a raiz do site, **incluindo o ficheiro oculto `.htaccess`** (trata de HTTPS, `www`, redirecionamento do antigo `/wordpress/`, páginas pré-renderizadas, rotas da aplicação e cabeçalhos de segurança). **Apagar primeiro as pastas `pt/` e `en/` antigas no servidor**: senão continuam online páginas de notícias entretanto despublicadas.
3. Sempre que se publicam notícias novas, o site mostra-as de imediato. Mas **antes de partilhar uma notícia nova no LinkedIn, fazer build e publicar**: só assim a pré-visualização mostra o título e a imagem da notícia (e ela entra no `sitemap.xml`). Partilhar o link na língua de quem vai ler (`/pt/news/...` ou `/en/news/...`).

## 8. Cópias de segurança

- O plano gratuito do Supabase **não inclui backups automáticos recuperáveis**. Recomenda-se o plano *Pro* (backups diários) ou exportar regularmente: *Database → Backups* / `pg_dump`.
- Os ficheiros (imagens e CVs) ficam em *Storage*; incluir no procedimento de backup.

## 9. Notificações por email (opcional)

Para receber um email quando chega uma candidatura ou mensagem, criar em *Database → Webhooks* um webhook nas tabelas `job_applications` e `contact_messages` (evento *INSERT*) para um serviço de email (ex.: uma *Edge Function* com Resend/SMTP, Zapier ou Make).
