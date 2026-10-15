/** Shown at /admin when the Supabase environment variables are missing. */
const SetupNotice = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-ptsans">
    <div className="max-w-2xl rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
      <img src="/img/Logo_Bridgepoint_Header.png" alt="BridgePoint" className="h-12 w-auto mb-6" />
      <h1 className="text-2xl font-bold font-montserrat">A área de administração ainda não está configurada</h1>
      <p className="mt-3 text-gray-600">
        Para ativar a gestão de notícias, vagas, candidaturas e mensagens é necessário ligar o website a um projeto Supabase.
        Enquanto isso, o website público mostra o conteúdo incluído no código.
      </p>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-gray-700">
        <li>Criar um projeto em <strong>supabase.com</strong> (região UE, ex.: Frankfurt).</li>
        <li>Executar <code className="rounded bg-gray-100 px-1">supabase/schema.sql</code> e depois <code className="rounded bg-gray-100 px-1">supabase/seed.sql</code> no SQL Editor.</li>
        <li>
          Criar o ficheiro <code className="rounded bg-gray-100 px-1">.env.local</code> com <code className="rounded bg-gray-100 px-1">VITE_SUPABASE_URL</code> e{' '}
          <code className="rounded bg-gray-100 px-1">VITE_SUPABASE_ANON_KEY</code> e voltar a compilar o website.
        </li>
        <li>Criar o utilizador gestor em Authentication e adicioná-lo à tabela <code className="rounded bg-gray-100 px-1">admin_users</code>.</li>
      </ol>
      <p className="mt-6 text-sm text-gray-500">Instruções detalhadas em <code className="rounded bg-gray-100 px-1">ADMIN_SETUP.md</code>.</p>
    </div>
  </div>
);

export default SetupNotice;
