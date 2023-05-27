import crypto from "crypto";
import Document from "./Document";

export default class DocumentFactory {
  static createDocument(data: any, email: string): Document {
    const uuid = crypto.randomUUID();

    return new Document(uuid, data.originalname, data.destination, data.size, data.mimetype, email, new Date());
  }
}
