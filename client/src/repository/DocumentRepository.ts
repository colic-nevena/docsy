import Api from "../dependency/Api";
import TokenManager from "../dependency/TokenManager";
import { DocumentViewModel } from "../features/home/model/DocumentViewModel";
import IDocumentRepository, { DocumentDTO } from "./IDocumentRepository";
import axios from "axios";
export default class DocumentRepository implements IDocumentRepository {
  private readonly _axios: any;

  constructor(private readonly _api: Api, private readonly _tokenManager: TokenManager, baseUrl: string) {
    this._axios = axios.create({
      baseURL: `${baseUrl}`,
    });
  }

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

  async deleteDocument(documentId: string, documentName: string, documentPath: string): Promise<void> {
    try {
      await this._api.request(`/documents/${documentId}`, "POST", { documentName, documentPath }, true);
    } catch (error: any) {
      throw error;
    }
  }

  async downloadDocument(documentName: string, documentPath: string): Promise<void> {
    try {
      const token = this._tokenManager.token();
      return await this._axios
        .post(
          "/documents",
          { documentName, documentPath },
          { headers: { Authorization: `Bearer ${token}` }, responseType: "arraybuffer" }
        )
        .then((response: any) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", documentName);
          document.body.appendChild(link);
          link.click();
        });
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
      createdAt: new Date(doc.createdAt).toLocaleDateString("en-UK", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }
}
