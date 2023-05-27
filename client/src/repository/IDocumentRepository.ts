import { DocumentViewModel } from "../features/home/model/DocumentViewModel";

export interface DocumentDTO {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  owner: string;
  createdAt: string;
}

export default interface DocumentRepository {
  getDocuments(label: string): Promise<DocumentViewModel[]>;
  shareDocument(documentId: string, segments: string[]): Promise<void>;
  deleteDocument(documentId: string, documentName: string, documentPath: string): Promise<void>;
  downloadDocument(documentName: string, documentPath: string): Promise<void>;
  uploadDocuments(files: File[]): Promise<void>;
}
