import { useCallback, useState } from 'react';

// A tiny data-fetching hook: it wraps an async function and tracks the three
// states every screen needs (data / loading / error), plus a `reload` to
// re-run it. Each dashboard section gets its OWN useApi instance, which is how
// we get independent loading/error states per section.
//
// It does NOT auto-run on mount — the caller decides when (we trigger `reload`
// from useFocusEffect so the data refreshes every time the tab is focused).
export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useApi<T>(fetcher: () => Promise<T>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetcher());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  return { data, loading, error, reload };
}
