import { DocumentViewModel } from "../features/home/model/DocumentViewModel";

export interface DocumentDTO {
  id: string;
  name: string;
  path: string;
  size: string;
  type: string;
  owner: string;
  createdAt: string;
}

export default interface DocumentRepository {
  getDocuments(label: string): Promise<DocumentViewModel[]>;
  shareDocument(documentId: string, segments: string[]): Promise<void>;
  deleteDocument(documentId: string): Promise<void>;
  downloadDocument(documentId: string): Promise<void>;
}
