import IDocumentRepository from "src/businessLogic/documents/persistance/repository/IDocumentRepository";
import ITagRepository from "src/businessLogic/tags/persistance/repository/ITagRepository";
import Command from "src/command/Command";
import ShareDocument from "src/command/ShareDocument";
import INotifyService from "src/service/INotifyService";

export default class CommandFactory {
  constructor(
    private readonly notify: INotifyService,
    private readonly documentRepository: IDocumentRepository,
    private readonly tagRepository: ITagRepository
  ) {}

  getShareDocumentCommand(documentId: string, segments: string[]): Command {
    return new ShareDocument({ documentId, segments }, this.notify, this.documentRepository, this.tagRepository);
  }
}
