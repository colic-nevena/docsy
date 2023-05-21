export default interface IOneSignal {
  sendNotification(title: string, content: string, segments: string[]): Promise<void>;
}
