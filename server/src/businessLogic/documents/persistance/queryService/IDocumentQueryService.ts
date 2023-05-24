import { DocumentModel } from "./model/DocumentModel";

export default interface IDocumentQueryService {
  getOwnerDocuments(owner: string): Promise<DocumentModel[]>;
  getSegmentDocuments(segment: string): Promise<DocumentModel[]>;
}
