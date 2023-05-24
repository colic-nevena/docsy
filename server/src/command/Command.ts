export default interface Command {
  execute(): Promise<void>;
}
