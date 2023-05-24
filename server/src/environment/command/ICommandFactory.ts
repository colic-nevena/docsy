import Command from "src/command/Command";

export interface ICommandFactory {
  getShareDocumentCommand(documentId: string, segments: string[]): Command;
}
