export default interface IDocumentGateway {
  delete(documentId: string): Promise<void>;
}
