import { Request, Response } from "express";
import { Client } from "onesignal-node";

export default class NotificationsController {
  constructor(private readonly _oneSignalClient: Client) {}

  async sendNotification(req: Request, res: Response): Promise<void> {
    try {
      // Retrieve the notification data from the request body
      const { title, content } = req.body;

      // Create the notification payload
      const notification = {
        headings: { en: title },
        contents: { en: content },
        included_segments: ["All"],
      };

      // Send the notification using the OneSignal client
      const response = await this._oneSignalClient.createNotification(notification);

      // Return the response
      res.status(200).json(response.body);
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
}
