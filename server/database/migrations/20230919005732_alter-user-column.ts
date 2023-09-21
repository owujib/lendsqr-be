import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('access_tokens', (table: Knex.TableBuilder) => {
    table.bigint('expires_at_ms').alter();
  });
}

export async function down(knex: Knex): Promise<void> {}
