import Notification from "src/businessLogic/notifications/domain/Notification";

export default interface INotifyService {
  sendNotification(notification: Notification): Promise<void>;
}
