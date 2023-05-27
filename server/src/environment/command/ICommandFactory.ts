import Document from "src/businessLogic/documents/domain/Document";
import Command from "src/command/Command";

export interface ICommandFactory {
  getShareDocumentCommand(documentId: string, segments: string[]): Command;
  getDeleteDocumentCommand(documentId: string, documentName: string, documentPath: string): Command;
  getUploadDocumentsCommand(files: Document[]): Command;
}
