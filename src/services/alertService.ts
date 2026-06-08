import { api } from '@/src/services/api';

export const alertService = {
  /** Number of unread alerts (for the dashboard badge). */
  async getUnreadCount(): Promise<number> {
    try {
      const { data } = await api.get<{ count: number } | number>('/api/alerts/count');
      return typeof data === 'number' ? data : data.count;
    } catch {
      // FIXME(backend): /api/alerts/count currently returns 500. Fall back to
      // counting the alerts list until the endpoint is fixed.
      const { data } = await api.get<unknown[]>('/api/alerts');
      return data.length;
    }
  },
};
