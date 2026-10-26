import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Cloudflare Turnstile ("I am not a robot" check) for the admin login and password reset.
 * Off until VITE_TURNSTILE_SITE_KEY is set. Once Supabase → Authentication → Attack Protection →
 * CAPTCHA is turned on with the matching secret, Supabase rejects sign-in and reset requests
 * without a valid token, so bots cannot call those endpoints directly either.
 */
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

interface Turnstile {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let scriptPromise: Promise<void> | null = null;

const loadScript = () =>
  (scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('turnstile'));
    };
    document.head.appendChild(script);
  }));

export function useCaptcha() {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        widget.current = window.turnstile.render(container.current, {
          sitekey: SITE_KEY,
          language: 'pt',
          theme: 'light',
          callback: (value: string) => setToken(value),
          'expired-callback': () => setToken(null),
          'error-callback': () => setToken(null),
        });
      })
      .catch(() => setError('Não foi possível carregar a verificação anti-robô. Verifique a ligação e recarregue a página.'));
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  /** Tokens are single-use: get a new one after every attempt. */
  const reset = useCallback(() => {
    setToken(null);
    if (widget.current) window.turnstile?.reset(widget.current);
  }, []);

  const element = SITE_KEY ? (
    <div>
      <div ref={container} className="min-h-[65px]" />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  ) : null;

  return { enabled: Boolean(SITE_KEY), token: token ?? undefined, ready: !SITE_KEY || Boolean(token), reset, element };
}
