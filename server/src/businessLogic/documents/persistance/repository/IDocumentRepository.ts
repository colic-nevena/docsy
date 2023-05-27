import Document from "../../domain/Document";

export default interface IDocumentRepository {
  saveSharedRelationship(documentId: string, tagId: string): Promise<void>;
  delete(documentId: string, documentName: string, documentPath: string): Promise<void>;
  saveDocument(document: Document): Promise<void>;
}
