import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("document_tag_map", (table) => {
    table.increments("id").primary();
    table.string("document_id", 255).index().references("id").inTable("document").onUpdate("CASCADE");
    table.string("tag_id", 255).index().references("id").inTable("tag").onUpdate("CASCADE");
    table.timestamp("created_at").notNullable();
    table.unique(["document_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("document_tag_map");
}
