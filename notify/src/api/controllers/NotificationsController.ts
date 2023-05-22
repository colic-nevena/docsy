import { Request, Response } from "express";
import { ICommandFactory } from "../../environment/command/ICommandFactory";

export default class NotificationsController {
  constructor(private readonly commandFactory: ICommandFactory) {}

  async sendNotification(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, segments } = req.body;

      if (title === undefined || content === undefined || segments.length === 0) {
        throw new Error("Parameters cannot be undefined.");
      }

      const command = this.commandFactory.createSendNotificationCommand(title, content, segments);
      await command.execute();

      res.status(200).json();
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
