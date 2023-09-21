import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_wallets', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned();
    table.integer('balance').notNullable().defaultTo(0);
    // Add any other wallet-related columns here.

    // Add a foreign key constraint to link the wallet to a user.

    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_wallets');
}
