import { Knex } from 'knex';
import { WalletAttributes } from '../../interface/models';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_wallets').del();

  // Inserts seed entries
  await knex<WalletAttributes>('user_wallets').insert([
    { id: 1, balance: 100_000, user_id: 1 },
    { id: 2, balance: 100_000, user_id: 2 },
    { id: 3, balance: 100_000, user_id: 3 },
  ]);
}
