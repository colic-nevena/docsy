import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tag", (table) => {
    table.increments("id", { primaryKey: true });
    table.string("key").notNullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("modified_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("tag");
}
