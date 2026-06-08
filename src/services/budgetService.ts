import { api } from '@/src/services/api';
import type { BudgetStatus } from '@/src/types';

export const budgetService = {
  async getStatus(): Promise<BudgetStatus[]> {
    try {
      const { data } = await api.get<BudgetStatus[]>('/api/budgets/status');
      return data;
    } catch {
      // FIXME(backend): /api/budgets/status currently returns 500. The plain
      // list has the same shape (incl. spentAmount/limitAmount) so we compute
      // status client-side from it until the endpoint is fixed.
      const { data } = await api.get<BudgetStatus[]>('/api/budgets');
      return data;
    }
  },
};
