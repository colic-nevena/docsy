import Command from "src/command/Command";
import SendNotification from "src/command/SendNotification";
import IOneSignal from "../../service/IOneSignal";

export default class CommandFactory {
  constructor(private readonly oneSignal: IOneSignal) {}

  createSendNotificationCommand(title: string, content: string, segments: string[]): Command {
    return new SendNotification({ title, content, segments }, this.oneSignal);
  }
}
