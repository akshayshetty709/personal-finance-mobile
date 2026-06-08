import { api } from '@/src/services/api';
import type { SpendingSummary } from '@/src/types';

export const aiService = {
  /** Claude-generated plain-English spending summary. Can be slow; may fail. */
  async getSpendingSummary(): Promise<SpendingSummary> {
    const { data } = await api.get<SpendingSummary>('/api/ai/spending-summary');
    return data;
  },
};
