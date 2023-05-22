import IOneSignal from "src/service/IOneSignal";
import Command from "./Command";

export class SendNotificationError extends Error {
  constructor(message: string) {
    super(`[SendNotification] Error - ${message}`);
  }
}

export class SendNotificationRequest {
  constructor(public readonly title: string, public readonly content: string, public readonly segments: string[]) {}
}

export default class SendNotification implements Command {
  constructor(private request: SendNotificationRequest, private readonly oneSignalService: IOneSignal) {}

  async execute(): Promise<any> {
    const { title, content, segments } = this.request;

    await this.oneSignalService.sendNotification(title, content, segments);
  }
}
