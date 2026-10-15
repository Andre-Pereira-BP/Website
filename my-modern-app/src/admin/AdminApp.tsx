import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import AdminLayout from './AdminLayout';
import { Spinner, ToastProvider } from './ui';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import NewsList from './pages/NewsList';
import NewsEditor from './pages/NewsEditor';
import JobsList from './pages/JobsList';
import JobEditor from './pages/JobEditor';
import Applications from './pages/Applications';
import Messages from './pages/Messages';
import SetupNotice from './pages/SetupNotice';
import { isSupabaseConfigured } from '../lib/supabase';

const FullScreenSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 text-primary">
    <Spinner className="h-10 w-10" />
  </div>
);

const NotAdmin = () => {
  const { email, userId, checkError, signOut } = useAuth();
  const sql = `insert into public.admin_users (user_id, email)
values ('${userId}', '${email}')
on conflict do nothing;`;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-xl rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
        <h1 className="text-xl font-bold">Sem acesso à área de administração</h1>
        {checkError ? (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
            Não foi possível verificar as permissões: <strong>{checkError}</strong>. Verifique se o <code>schema.sql</code> foi executado neste projeto Supabase e se o URL/chave do <code>.env</code> são deste projeto.
          </p>
        ) : (
          <p className="mt-3 text-gray-600">
            A conta <strong>{email}</strong> existe, mas ainda não está registada como administrador. Execute no SQL Editor do Supabase:
          </p>
        )}
        {!checkError && <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">{sql}</pre>}
        <p className="mt-3 text-xs text-gray-500">Depois recarregue esta página.</p>
        <button type="button" onClick={signOut} className="mt-6 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50">
          Terminar sessão
        </button>
      </div>
    </div>
  );
};

const Protected = () => {
  const { status } = useAuth();
  const location = useLocation();
  if (status === 'loading') return <FullScreenSpinner />;
  if (status === 'signed-out') return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (status === 'not-admin') return <NotAdmin />;
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="news" element={<NewsList />} />
        <Route path="news/new" element={<NewsEditor />} />
        <Route path="news/:id" element={<NewsEditor />} />
        <Route path="jobs" element={<JobsList />} />
        <Route path="jobs/new" element={<JobEditor />} />
        <Route path="jobs/:id" element={<JobEditor />} />
        <Route path="applications" element={<Applications />} />
        <Route path="messages" element={<Messages />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

/** /admin/* — private back office (Portuguese only). Never indexed by search engines. */
const AdminApp = () => {
  useEffect(() => {
    document.title = 'Administração | BridgePoint';
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
    document.documentElement.lang = 'pt-PT';
  }, []);

  if (!isSupabaseConfigured) return <SetupNotice />;

  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Protected />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AdminApp;
