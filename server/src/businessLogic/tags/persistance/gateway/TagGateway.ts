import ITagGateway, { TagTableData } from "./ITagGateway";
import { Knex } from "knex";

export class TagGatewayError extends Error {
  constructor(message: string) {
    super(`[TagGateway] Error - ${message}`);
  }
}
export default class TagGateway implements ITagGateway {
  private readonly table = "tag";

  constructor(private readonly _knex: Knex<any, unknown[]>) {}

  async getTagByKey(key: string): Promise<TagTableData[]> {
    try {
      return await this._knex.table(this.table).where({ key });
    } catch (error) {
      throw new TagGatewayError(`[getTagByKey] - ${(error as Error).message}`);
    }
  }
}
