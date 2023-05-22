import Command from "src/command/Command";

export interface ICommandFactory {
  createSendNotificationCommand(title: string, content: string, segments: string[]): Command;
}
