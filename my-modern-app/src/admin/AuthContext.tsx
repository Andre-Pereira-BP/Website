import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '../lib/supabase';

type AdminStatus = 'loading' | 'signed-out' | 'not-admin' | 'admin';

interface AuthContextValue {
  status: AdminStatus;
  session: Session | null;
  email: string | null;
  recoveryMode: boolean;
  userId: string | null;
  checkError: string | null;
  signIn: (email: string, password: string, captchaToken?: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string, captchaToken?: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Admin rights are granted by a row in public.admin_users (checked here for UX, enforced by RLS). */
async function checkIsAdmin(userId: string) {
  const { data, error } = await (await getSupabase()).from('admin_users').select('user_id').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AdminStatus>('loading');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);

  const evaluate = useCallback(async (next: Session | null) => {
    setSession(next);
    if (!next) return setStatus('signed-out');
    try {
      setCheckError(null);
      setStatus((await checkIsAdmin(next.user.id)) ? 'admin' : 'not-admin');
    } catch (err) {
      console.error(err);
      setCheckError((err as Error).message || String(err));
      setStatus('not-admin');
    }
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;
    getSupabase()
      .then((supabase) => {
        if (cancelled) return;
        supabase.auth.getSession().then(({ data }) => evaluate(data.session));
        const { data: listener } = supabase.auth.onAuthStateChange((event, next) => {
          if (event === 'PASSWORD_RECOVERY') setRecoveryMode(true);
          if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'PASSWORD_RECOVERY' || event === 'USER_UPDATED') {
            // Defer to avoid calling Supabase inside the auth callback
            setTimeout(() => evaluate(next), 0);
          } else if (event === 'TOKEN_REFRESHED') {
            setSession(next);
          }
        });
        unsubscribe = () => listener.subscription.unsubscribe();
      })
      .catch(() => setStatus('signed-out'));
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [evaluate]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      email: session?.user.email ?? null,
      recoveryMode,
      userId: session?.user.id ?? null,
      checkError,
      signIn: async (email, password, captchaToken) => {
        const { error } = await (await getSupabase()).auth.signInWithPassword({ email, password, options: { captchaToken } });
        if (error) throw error;
      },
      signOut: async () => {
        await (await getSupabase()).auth.signOut();
      },
      sendPasswordReset: async (email, captchaToken) => {
        const { error } = await (await getSupabase()).auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin/reset-password`,
          captchaToken,
        });
        if (error) throw error;
      },
      updatePassword: async (password) => {
        const { error } = await (await getSupabase()).auth.updateUser({ password });
        if (error) throw error;
        setRecoveryMode(false);
      },
    }),
    [status, session, recoveryMode, checkError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
