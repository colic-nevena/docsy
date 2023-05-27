import { Command } from "../../redux/Command";
import { commandFailed, commandStarted, commandSucceeded } from "../../redux/commandSlice";
import { hideDialog, snackClosed, snackOpened } from "../../redux/dialogSlice";
import { pageLoadingFailed, pageLoadingStarted, pageLoadingSucceeded } from "../../redux/pageSlice";
import { documentDeleted, documentsLoaded } from "./documentListSlice";

export const openSnackCommand =
  (snackText: string): Command =>
  async (dispatch) => {
    dispatch(snackOpened(snackText));
  };

export const closeSnackCommand = (): Command => async (dispatch) => {
  dispatch(snackClosed());
};

export const loadDocumentsCommand =
  (label: string): Command =>
  async (dispatch, getState, { repositories }) => {
    try {
      dispatch(pageLoadingStarted());

      const list = await repositories.documentRepository.getDocuments(label);
      dispatch(documentsLoaded(list));

      dispatch(pageLoadingSucceeded());
    } catch (error: any) {
      dispatch(pageLoadingFailed(error.message));
    }
  };

export const shareDocumentCommand =
  (documentId: string, segments: string[]): Command =>
  async (dispatch, getState, { repositories }) => {
    try {
      dispatch(commandStarted());

      await repositories.documentRepository.shareDocument(documentId, segments);

      dispatch(commandSucceeded());
      dispatch(hideDialog());
      dispatch(openSnackCommand("Document shared successfully!"));
    } catch (error: any) {
      dispatch(hideDialog());
      dispatch(commandFailed(error.message));
    }
  };

export const deleteDocumentCommand =
  (documentId: string, documentName: string, documentPath: string): Command =>
  async (dispatch, getState, { repositories }) => {
    try {
      dispatch(commandStarted());

      await repositories.documentRepository.deleteDocument(documentId, documentName, documentPath);
      dispatch(documentDeleted({ id: documentId }));
      dispatch(commandSucceeded());
      dispatch(hideDialog());
      dispatch(openSnackCommand("Document deleted successfully!"));
    } catch (error: any) {
      dispatch(hideDialog());
      dispatch(commandFailed(error.message));
    }
  };

export const downloadDocumentCommand =
  (documentName: string, documentPath: string): Command =>
  async (dispatch, getState, { repositories }) => {
    try {
      dispatch(commandStarted());

      await repositories.documentRepository.downloadDocument(documentName, documentPath);

      dispatch(hideDialog());
      dispatch(commandSucceeded());
    } catch (error: any) {
      dispatch(commandFailed(error.message));
    }
  };

export const uploadDocumentsCommand =
  (documents: File[]): Command =>
  async (dispatch, getState, { repositories }) => {
    try {
      dispatch(commandStarted());

      await repositories.documentRepository.uploadDocuments(documents);
      dispatch(loadDocumentsCommand(""));
      dispatch(openSnackCommand("Document(s) uploaded successfully!"));
      dispatch(hideDialog());
      dispatch(commandSucceeded());
    } catch (error: any) {
      dispatch(hideDialog());
      dispatch(commandFailed(error.message));
    }
  };
