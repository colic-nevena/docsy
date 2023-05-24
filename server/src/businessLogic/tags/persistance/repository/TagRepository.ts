import Tag from "../../domain/Tag";
import ITagGateway, { TagTableData } from "../gateway/ITagGateway";
import ITagRepository from "./ITagRepository";

export class TagRepositoryError extends Error {
  constructor(message: string) {
    super(`[TagRepository] Error - ${message}`);
  }
}

export default class TagRepository implements ITagRepository {
  constructor(private readonly _tagGateway: ITagGateway) {}

  async getTagByKey(key: string): Promise<Tag> {
    try {
      const tagDTO = await this._tagGateway.getTagByKey(key);
      return this.toTag(tagDTO[0]);
    } catch (e) {
      throw new TagRepositoryError(`[getTagByKey] - ${(e as Error).message}`);
    }
  }

  private toTag(tagTD: TagTableData): Tag {
    return new Tag(tagTD.id, tagTD.key, new Date(tagTD.created_at.toString()));
  }
}
