export type TagTableData = {
  id: string;
  key: string;
  created_at: string;
};

export default interface ITagGateway {
  getTagByKey(key: string): Promise<TagTableData[]>;
}
