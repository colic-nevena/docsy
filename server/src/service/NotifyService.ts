import { NotifyConfig } from "src/environment/config/Config";
import axios from "axios";
import INotifyService from "./INotifyService";
import Notification from "../businessLogic/notifications/domain/Notification";

export class NotifyServiceError extends Error {
  constructor(message: string) {
    super(`[NotifyService] Error - ${message}`);
  }
}

export default class NotifyService implements INotifyService {
  private readonly axios: any;

  constructor({ url }: NotifyConfig) {
    this.axios = axios.create({
      baseURL: `${url}`,
    });
  }

  async sendNotification(notification: Notification): Promise<void> {
    try {
      const dto = { title: notification.title, content: notification.content, segments: notification.segments };
      await this.axios.post(`/notifications`, dto);
    } catch (error: any) {
      throw new NotifyServiceError(`[sendNotification] - ${error.message}`);
    }
  }
}
