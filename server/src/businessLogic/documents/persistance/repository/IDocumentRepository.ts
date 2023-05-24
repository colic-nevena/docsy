export default interface IDocumentRepository {
  save(documentId: string, tagId: string): Promise<void>;
}
