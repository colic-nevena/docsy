import { Request, Response } from "express";
import { Client } from "onesignal-node";

export default class NotificationsController {
  constructor(private readonly _oneSignalClient: Client) {}

  async sendNotification(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, segments } = req.body;

      const notification = {
        headings: { en: title },
        contents: { en: content },
        included_segments: [...segments], // All, Math Segment or/and English Segment
      };

      const response = await this._oneSignalClient.createNotification(notification);
      res.status(200).json(response.body);
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
}
