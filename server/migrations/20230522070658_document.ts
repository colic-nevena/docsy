import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("document", (table) => {
    table.increments("id").primary();
    table.string("name", 255).unique().notNullable();
    table.string("path").unique().notNullable();
    table.string("size").notNullable();
    table.string("type").notNullable();
    table.string("owner", 255).index().references("email").inTable("user").onUpdate("CASCADE");
    table.timestamp("created_at").notNullable();
    table.timestamp("modified_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("document");
}
