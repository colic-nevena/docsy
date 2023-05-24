export default class Document {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _path: string,
    private _size: string,
    private _type: string,
    private _owner: string,
    private _createdAt: Date
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get path(): string {
    return this._path;
  }

  get size(): string {
    return this._size;
  }

  get type(): string {
    return this._type;
  }

  get owner(): string {
    return this._owner;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
