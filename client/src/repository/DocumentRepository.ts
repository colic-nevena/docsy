import Api from "../dependency/Api";
import { DocumentViewModel } from "../features/home/model/DocumentViewModel";
import IDocumentRepository, { DocumentDTO } from "./IDocumentRepository";

export default class DocumentRepository implements IDocumentRepository {
  constructor(private readonly _api: Api) {}

  async getDocuments(label: string): Promise<DocumentViewModel[]> {
    try {
      const documents = await this._api.request<DocumentDTO[]>(`/documents?segment=${label}`, "GET", undefined, true);
      return documents.map((doc) => this.mapToViewModel(doc));
    } catch (error: any) {
      throw error;
    }
  }

  async shareDocument(documentId: string, segments: string[]): Promise<void> {
    try {
      await this._api.request(`/documents/${documentId}/share`, "POST", { segments }, true);
    } catch (error: any) {
      throw error;
    }
  }

  async deleteDocument(documentId: string): Promise<void> {
    try {
      console.log("API CALL - deleteDocument", documentId);
      //   API CALL
    } catch (error: any) {
      throw error;
    }
  }

  async downloadDocument(documentId: string): Promise<void> {
    try {
      console.log("API CALL - downloadDocument", documentId);
      //   API CALL
    } catch (error: any) {
      throw error;
    }
  }

  private mapToViewModel(doc: DocumentDTO): DocumentViewModel {
    return {
      id: doc.id,
      name: doc.name,
      path: doc.path,
      size: doc.size,
      owner: doc.owner,
      type: doc.type,
      createdAt: doc.createdAt,
    };
  }
}
