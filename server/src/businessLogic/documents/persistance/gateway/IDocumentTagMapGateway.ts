export type DocumentTagMapTableData = {
  documentId: string;
  tagId: string;
  createdAt: string;
};

export default interface IDocumentTagMapGateway {
  insert(data: DocumentTagMapTableData): Promise<void>;
  deleteByDocumentId(documentId: string): Promise<void>;
}
