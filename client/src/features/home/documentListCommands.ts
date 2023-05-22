import { Command } from "../../redux/Command";
import { pageLoadingFailed, pageLoadingStarted, pageLoadingSucceeded } from "../../redux/pageSlice";
import { documentsLoaded } from "./documentListSlice";

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
