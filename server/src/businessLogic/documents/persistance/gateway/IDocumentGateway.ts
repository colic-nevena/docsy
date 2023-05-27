export interface DocumentTableData {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  owner: string;
}

export default interface IDocumentGateway {
  delete(documentId: string): Promise<void>;
  insert(document: DocumentTableData): Promise<void>;
}
