import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AuthShell from '../AuthShell';
import { Button, Field, Spinner, TextInput } from '../ui';

const ResetPassword = () => {
  const { status, session, updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 10) return setError('A palavra-passe deve ter pelo menos 10 caracteres.');
    if (password !== confirm) return setError('As palavras-passe não coincidem.');
    setLoading(true);
    try {
      await updatePassword(password);
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <AuthShell title="Definir nova palavra-passe" subtitle="Escolha uma palavra-passe forte, com pelo menos 10 caracteres.">
      {!session ? (
        <div className="space-y-4">
          <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
            A ligação de recuperação é inválida ou expirou. Peça uma nova na página de início de sessão.
          </p>
          <Link to="/admin/login" className="text-sm font-semibold text-primary hover:underline">← Início de sessão</Link>
        </div>
      ) : done ? (
        <div className="space-y-4">
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 ring-1 ring-emerald-200">Palavra-passe atualizada com sucesso.</p>
          <Link to="/admin" className="inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light">
            Ir para o painel
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <Field label="Nova palavra-passe" htmlFor="new-password">
            <TextInput id="new-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          <Field label="Confirmar palavra-passe" htmlFor="confirm-password">
            <TextInput id="confirm-password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </Field>
          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">Guardar palavra-passe</Button>
        </form>
      )}
    </AuthShell>
  );
};

export default ResetPassword;
