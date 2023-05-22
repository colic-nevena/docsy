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
}
