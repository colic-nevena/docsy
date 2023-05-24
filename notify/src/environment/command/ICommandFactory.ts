import Command from "src/command/Command";

export interface ICommandFactory {
  getSendNotificationCommand(title: string, content: string, segments: string[]): Command;
}
