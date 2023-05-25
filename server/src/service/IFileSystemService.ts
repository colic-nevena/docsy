export default interface IFileSystemService {
  removeDocument(documentName: string, documentPath: string): Promise<void>;
}
