import { Knex } from 'knex';
import { UserAttributes } from '../../interface/models';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex<UserAttributes>('users').insert([
    {
      id: 1,
      email: 'user1@email.com',
      fullname: 'John Doe',
      password: '$2a$10$8e0x3MGqJu684PuOd4Ed.u/jgkMXcwPxEtQ3NJKDWllZ5fa8pwt0G',
    },
    {
      id: 2,
      email: 'user2@email.com',
      password: '$2a$10$8e0x3MGqJu684PuOd4Ed.u/jgkMXcwPxEtQ3NJKDWllZ5fa8pwt0G',
    },
    {
      id: 3,
      email: 'user3@email.com',
      password: '$2a$10$8e0x3MGqJu684PuOd4Ed.u/jgkMXcwPxEtQ3NJKDWllZ5fa8pwt0G',
    },
  ]);
}
