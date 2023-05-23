import Api from "../dependency/Api";
import { DocumentViewModel } from "../features/home/model/DocumentViewModel";
import IDocumentRepository, { DocumentDTO } from "./IDocumentRepository";

const mockData = [
  {
    id: "1",
    name: "example.pdf",
    path: "/src/assets/uploads",
    size: "2000",
    owner: "mrsnevenac@gmail.com",
    type: "pdf",
    createdAt: "15.6.2023.",
  },
  {
    id: "2",
    name: "nekomnogodugackoimefajla.jpeg",
    path: "/src/assets/uploads",
    size: "2000",
    owner: "mrsnevenac@gmail.com",
    type: "jpeg",
    createdAt: "15.6.2023.",
  },
  {
    id: "3",
    name: "nekitamofajl.docx",
    path: "/src/assets/uploads",
    size: "2000",
    owner: "mrsnevenac@gmail.com",
    type: "docx",
    createdAt: "15.6.2023.",
  },
  {
    id: "4",
    name: "example222.pdf",
    path: "/src/assets/uploads",
    size: "2000",
    owner: "mrsnevenac@gmail.com",
    type: "pdf",
    createdAt: "15.6.2023.",
  },
  {
    id: "5",
    name: "slicica123456789.jpeg",
    path: "/src/assets/uploads",
    size: "2000",
    owner: "mrsnevenac@gmail.com",
    type: "jpeg",
    createdAt: "15.6.2023.",
  },
  {
    id: "6",
    name: "blablalala.docx",
    path: "/src/assets/uploads",
    size: "2000",
    owner: "mrsnevenac@gmail.com",
    type: "docx",
    createdAt: "15.6.2023.",
  },
];

export default class DocumentRepository implements IDocumentRepository {
  constructor(private readonly _api: Api) {}

  async getDocuments(label: string): Promise<DocumentViewModel[]> {
    try {
      //   const documents = await this._api.request<DocumentDTO[]>(`/documents/${label}`, "GET", undefined, true);
      //   return documents.map(doc => this.mapToViewModel(doc))
      return mockData;
    } catch (error: any) {
      throw error;
    }
  }

  async shareDocument(documentId: string, segments: string[]): Promise<void> {
    try {
      console.log("API CALL - shareDocument", documentId, segments);
      //   API CALL
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
