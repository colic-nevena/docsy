import { Client } from "onesignal-node";
import IOneSignal from "./IOneSignal";

export class OneSignalError extends Error {
  constructor(message: string) {
    super(`[OneSignal] Error - ${message}`);
  }
}

export default class OneSignal implements IOneSignal {
  private readonly _oneSignalClient: Client;

  constructor(oneSignalClient: Client) {
    this._oneSignalClient = oneSignalClient;
  }

  public async sendNotification(title: string, content: string, segments: string[]): Promise<void> {
    try {
      const notification = {
        headings: { en: title },
        contents: { en: content },
        included_segments: [...segments], // All, Math Segment or/and English Segment
      };
      await this._oneSignalClient.createNotification(notification);
    } catch (error: any) {
      throw new OneSignalError(`[sendNotification] - ${error.message}`);
    }
  }
}
