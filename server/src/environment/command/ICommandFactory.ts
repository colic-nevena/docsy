import Command from "src/command/Command";

export interface ICommandFactory {
  getShareDocumentCommand(documentId: string, segments: string[]): Command;
  getDeleteDocumentCommand(documentId: string, documentName: string, documentPath: string): Command;
}
