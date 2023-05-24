import INotifyService from "src/service/INotifyService";
import Command from "./Command";
import Notification from "src/businessLogic/notifications/domain/Notification";
import crypto from "crypto";
import IDocumentRepository from "src/businessLogic/documents/persistance/repository/IDocumentRepository";
import ITagRepository from "src/businessLogic/tags/persistance/repository/ITagRepository";
import { NOTIFICATION_CONTENT, NOTIFICATION_TITLE } from "src/assets/strings";

export class SendNotificationError extends Error {
  constructor(message: string) {
    super(`[SendNotification] Error - ${message}`);
  }
}

export class ShareDocumentRequest {
  constructor(public readonly documentId: string, public readonly segments: string[]) {}
}

export default class ShareDocument implements Command {
  constructor(
    private request: ShareDocumentRequest,
    private readonly notify: INotifyService,
    private readonly documentRepository: IDocumentRepository,
    private readonly tagRepository: ITagRepository
  ) {}

  async execute(): Promise<any> {
    const title = NOTIFICATION_TITLE;
    const segments = this.request.segments.reduce((acc, curr) => `${curr}, ${acc}`, "").slice(0, -2);
    const content = `${NOTIFICATION_CONTENT} ${segments}`;
    const notification = new Notification(crypto.randomUUID(), title, content, this.request.segments);

    await this.notify.sendNotification(notification);

    for (let segment of this.request.segments) {
      const tag = await this.tagRepository.getTagByKey(segment);
      await this.documentRepository.save(this.request.documentId, tag.id);
    }
  }
}
