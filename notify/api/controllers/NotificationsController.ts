import { Request, Response } from "express";
import IOneSignal from "service/IOneSignal";
import SendNotification, { SendNotificationRequest } from "src/command/SendNotification";

export default class NotificationsController {
  constructor(private readonly oneSignal: IOneSignal) {}

  async sendNotification(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, segments } = req.body;

      if (title === undefined || content === undefined || segments.length === 0) {
        throw new Error("Parameters cannot be undefined.");
      }

      const command = new SendNotification({ title, content, segments }, this.oneSignal);
      await command.execute();

      res.status(200).json();
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
