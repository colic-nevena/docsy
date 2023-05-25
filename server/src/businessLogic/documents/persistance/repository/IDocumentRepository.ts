export default interface IDocumentRepository {
  save(documentId: string, tagId: string): Promise<void>;
  delete(documentId: string, documentName: string, documentPath: string): Promise<void>;
}
