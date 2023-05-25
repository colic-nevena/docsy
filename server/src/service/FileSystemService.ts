import fs from "fs";

export default class FileSystemService {
  private readonly path: string[];

  constructor() {
    this.path = __dirname.split("/src");
  }

  async removeDocument(documentName: string, documentPath: string): Promise<void> {
    fs.unlink(`${this.path[0]}${documentPath}/${documentName}`, (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
  }
}
