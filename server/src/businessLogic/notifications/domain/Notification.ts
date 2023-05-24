export default class Notification {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _content: string,
    private _segments: string[]
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get segments(): string[] {
    return this._segments;
  }
}
