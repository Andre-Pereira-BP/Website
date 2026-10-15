import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { adminDashboardCounts, adminListApplications, adminListMessages } from '../../lib/content';
import { useAsync } from '../../lib/useAsync';
import { Badge, Card, ErrorBox, formatDateTime, PageHeader, Spinner } from '../ui';

const StatCard = ({ label, value, to, tone }: { label: string; value: number | undefined; to: string; tone: string }) => (
  <Link to={to} className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md hover:ring-primary/30">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={`mt-2 text-4xl font-bold font-montserrat ${tone}`}>{value ?? <Spinner className="h-6 w-6" />}</p>
    <p className="mt-3 text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100">Ver →</p>
  </Link>
);

const Dashboard = () => {
  const { email } = useAuth();
  const counts = useAsync(() => adminDashboardCounts());
  const applications = useAsync(() => adminListApplications());
  const messages = useAsync(() => adminListMessages());
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 20 ? 'Boa tarde' : 'Boa noite';

  return (
    <>
      <PageHeader title={`${greeting}!`} description={`Sessão iniciada como ${email}. Faça aqui a gestão dos conteúdos do website.`} />

      {counts.error ? <ErrorBox error={counts.error} onRetry={counts.reload} /> : null}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Notícias publicadas" value={counts.data?.newsPublished} to="/admin/news" tone="text-primary" />
        <StatCard label="Rascunhos" value={counts.data?.newsDrafts} to="/admin/news" tone="text-gray-700" />
        <StatCard label="Vagas abertas" value={counts.data?.jobsOpen} to="/admin/jobs" tone="text-primary" />
        <StatCard label="Candidaturas novas" value={counts.data?.applicationsNew} to="/admin/applications" tone="text-emerald-600" />
        <StatCard label="Mensagens novas" value={counts.data?.messagesNew} to="/admin/messages" tone="text-emerald-600" />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/news/new" className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary to-primary-light p-6 text-white shadow-sm hover:shadow-md">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">＋</span>
          <span>
            <span className="block text-lg font-bold">Nova notícia</span>
            <span className="text-sm text-white/80">Escrever e publicar uma notícia</span>
          </span>
        </Link>
        <Link to="/admin/jobs/new" className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-6 text-white shadow-sm hover:shadow-md">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">＋</span>
          <span>
            <span className="block text-lg font-bold">Nova vaga</span>
            <span className="text-sm text-white/80">Publicar uma oportunidade de emprego</span>
          </span>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="font-bold text-gray-900">Últimas candidaturas</h2>
            <Link to="/admin/applications" className="text-sm font-semibold text-primary hover:underline">Ver todas</Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {applications.loading && <li className="p-6 text-center text-primary"><Spinner /></li>}
            {applications.data?.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-4 px-6 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-800">{a.first_name} {a.last_name}</p>
                  <p className="truncate text-sm text-gray-500">{a.job_title || 'Candidatura espontânea'} · {formatDateTime(a.created_at)}</p>
                </div>
                {a.status === 'new' && <Badge tone="green">Nova</Badge>}
              </li>
            ))}
            {applications.data?.length === 0 && <li className="px-6 py-8 text-center text-sm text-gray-500">Ainda não há candidaturas.</li>}
          </ul>
        </Card>
        <Card>
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="font-bold text-gray-900">Últimas mensagens</h2>
            <Link to="/admin/messages" className="text-sm font-semibold text-primary hover:underline">Ver todas</Link>
          </div>
          <ul className="divide-y divide-gray-100">
            {messages.loading && <li className="p-6 text-center text-primary"><Spinner /></li>}
            {messages.data?.slice(0, 5).map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-4 px-6 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-800">{m.name}{m.company ? ` · ${m.company}` : ''}</p>
                  <p className="truncate text-sm text-gray-500">{m.message}</p>
                </div>
                {m.status === 'new' && <Badge tone="green">Nova</Badge>}
              </li>
            ))}
            {messages.data?.length === 0 && <li className="px-6 py-8 text-center text-sm text-gray-500">Ainda não há mensagens.</li>}
          </ul>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
