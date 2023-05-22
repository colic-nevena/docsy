import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", (table) => {
    table.string("email").unique().primary;
    table.timestamp("created_at").notNullable();
    table.timestamp("modified_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user");
}
