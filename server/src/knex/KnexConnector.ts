import knex, { Knex } from "knex";
import knexFile from "../../knexfile";

export default class KnexConnector {
  public readonly knex: Knex;

  constructor() {
    const { pool, migrations, ...config } = (knexFile as any)[process.env.NODE_ENV as string];
    this.knex = knex(config);
  }
  protected null(value: any): any {
    if (value === null) return undefined;
    return value;
  }
}
