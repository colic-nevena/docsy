import Tag from "../../domain/Tag";

export default interface ITagRepository {
  getTagByKey(key: string): Promise<Tag>;
}
