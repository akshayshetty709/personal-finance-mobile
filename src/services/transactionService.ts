import { api } from '@/src/services/api';
import type { Transaction } from '@/src/types';
import { getCurrentMonthRange } from '@/src/utils/dates';

export const transactionService = {
  /** Transactions dated within the current calendar month. */
  async getCurrentMonth(): Promise<Transaction[]> {
    const { startDate, endDate } = getCurrentMonthRange();
    const { data } = await api.get<Transaction[]>('/api/transactions', {
      params: { startDate, endDate },
    });
    return data;
  },
};
