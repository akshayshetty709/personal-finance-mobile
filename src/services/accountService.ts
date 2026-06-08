import { api } from '@/src/services/api';
import type { Account } from '@/src/types';

export const accountService = {
  async getAccounts(): Promise<Account[]> {
    const { data } = await api.get<Account[]>('/api/accounts');
    return data;
  },
};
