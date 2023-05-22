import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("document_tag_map", (table) => {
    table.increments("id").primary();
    table.integer("documentId", 255).index().references("id").inTable("document").onUpdate("CASCADE");
    table.integer("tagId", 255).index().references("id").inTable("tag").onUpdate("CASCADE");
    table.timestamp("created_at").notNullable();
    table.unique(["documentId", "tagId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("document_tag_map");
}
