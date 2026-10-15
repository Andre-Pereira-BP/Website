import { DependencyList, useCallback, useContext, useEffect, useState } from 'react';
import { PrerenderDataContext } from './ssr';

interface AsyncState<T> {
  data: T | undefined;
  error: unknown;
  loading: boolean;
  reload: () => void;
}

/**
 * Runs an async loader on mount / when deps change, ignoring stale responses.
 *
 * With a `key`, the result can be prerendered: at build time the loader runs before the page is
 * rendered, and in the browser the page starts from that embedded result (no loading state) and
 * refreshes it in the background, so content published after the build still shows up.
 */
export function useAsync<T>(loader: () => Promise<T>, deps: DependencyList = [], key?: string): AsyncState<T> {
  const prerendered = useContext(PrerenderDataContext);
  const seed = key !== undefined && prerendered && key in prerendered.values ? { data: prerendered.values[key] as T } : null;

  // Build-time render: register the loader so the prerender can run it and render again.
  if (key !== undefined && !seed && prerendered?.pending && !prerendered.pending.has(key)) {
    prerendered.pending.set(key, loader);
  }

  const [state, setState] = useState<{ data: T | undefined; error: unknown; loading: boolean }>(() =>
    seed ? { data: seed.data, error: null, loading: false } : { data: undefined, error: null, loading: true }
  );
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    setState((s) => (seed ? { data: seed.data, error: null, loading: false } : { ...s, loading: true, error: null }));
    loader()
      .then((data) => active && setState({ data, error: null, loading: false }))
      .catch((error) => {
        console.error(error);
        // A failed background refresh keeps showing the prerendered content
        if (active) setState((s) => (seed ? s : { data: undefined, error, loading: false }));
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  return { ...state, reload };
}
