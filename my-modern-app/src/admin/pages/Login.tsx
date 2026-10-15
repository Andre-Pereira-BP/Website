import { FormEvent, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Button, Field, TextInput } from '../ui';
import AuthShell from '../AuthShell';



const Login = () => {
  const { status, signIn, sendPasswordReset } = useAuth();
  const location = useLocation();
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  if (status === 'admin' || status === 'not-admin') {
    const from = (location.state as { from?: string } | null)?.from;
    return <Navigate to={from && from.startsWith('/admin') && from !== '/admin/login' ? from : '/admin'} replace />;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn(email.trim(), password);
      } else {
        await sendPasswordReset(email.trim());
        setInfo('Se o email estiver registado, receberá uma ligação para definir uma nova palavra-passe.');
      }
    } catch (err) {
      const message = (err as Error).message || '';
      setError(/invalid login credentials/i.test(message) ? 'Email ou palavra-passe incorretos.' : /rate limit/i.test(message) ? 'Demasiadas tentativas. Aguarde alguns minutos.' : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title={mode === 'login' ? 'Iniciar sessão' : 'Recuperar palavra-passe'}
      subtitle={mode === 'login' ? 'Acesso exclusivo a gestores do website.' : 'Indique o seu email para receber uma ligação de recuperação.'}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <Field label="Email" htmlFor="admin-email">
          <TextInput id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        {mode === 'login' && (
          <Field
            label="Palavra-passe"
            htmlFor="admin-password"
            aside={
              <button type="button" onClick={() => setMode('forgot')} className="text-xs font-semibold text-primary hover:underline">
                Esqueceu-se?
              </button>
            }
          >
            <TextInput id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
        )}
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}
        {info && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 ring-1 ring-emerald-200">{info}</p>}
        <Button type="submit" loading={loading} className="w-full">
          {mode === 'login' ? 'Entrar' : 'Enviar ligação'}
        </Button>
        {mode === 'forgot' && (
          <button type="button" onClick={() => setMode('login')} className="w-full text-sm font-semibold text-gray-600 hover:text-gray-900">
            ← Voltar ao início de sessão
          </button>
        )}
      </form>
      <p className="mt-10 text-center text-xs text-gray-400">
        <Link to="/" className="hover:text-gray-600">← Voltar ao website</Link>
      </p>
    </AuthShell>
  );
};

export default Login;
