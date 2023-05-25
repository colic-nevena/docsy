import IDocumentRepository from "src/businessLogic/documents/persistance/repository/IDocumentRepository";
import ITagRepository from "src/businessLogic/tags/persistance/repository/ITagRepository";
import Command from "src/command/Command";
import DeleteDocument from "src/command/DeleteDocument";
import ShareDocument from "src/command/ShareDocument";
import IFileSystemService from "src/service/IFileSystemService";
import INotifyService from "src/service/INotifyService";

export default class CommandFactory {
  constructor(
    private readonly notify: INotifyService,
    private readonly documentRepository: IDocumentRepository,
    private readonly tagRepository: ITagRepository,
    private readonly fileSystemService: IFileSystemService
  ) {}

  getShareDocumentCommand(documentId: string, segments: string[]): Command {
    return new ShareDocument({ documentId, segments }, this.notify, this.documentRepository, this.tagRepository);
  }

  getDeleteDocumentCommand(documentId: string, documentName: string, documentPath: string): Command {
    return new DeleteDocument(
      { documentId, documentName, documentPath },
      this.documentRepository,
      this.fileSystemService
    );
  }
}
