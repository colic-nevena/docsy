export default class Tag {
  constructor(private readonly _id: string, private _key: string, private _createdAt: Date) {}

  get id(): string {
    return this._id;
  }

  get key(): string {
    return this._key;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
