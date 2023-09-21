import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    'access_tokens',
    (table: Knex.TableBuilder) => {
      table.increments('id').primary();
      table.boolean('revoked').defaultTo(false);
      table.string('token').notNullable();
      table.string('expires_at');
      table.integer('expires_at_ms');
      table.integer('user_id').unsigned();

      /**add foriegn key constraint */
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('access_tokens');
}
