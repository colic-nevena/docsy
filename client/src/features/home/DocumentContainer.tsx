import { Button, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { viewUnloaded } from "./documentListSlice";
import { closeSnackCommand, loadDocumentsCommand } from "./documentListCommands";
import DocumentList from "./DocumentList";
import { DocumentViewModel } from "./model/DocumentViewModel";
import DocumentDetailsDialog, { DOCUMENT_DETAILS_DIALOG } from "./dialog/DocumentDetailsDialog";
import { showDialog } from "../../redux/dialogSlice";
import ShareDocumentDialog from "./dialog/ShareDocumentDialog";
import { RootState } from "../../redux/store";
import SnackBar from "../../common/components/SnackBar";
import DeleteDocumentDialog from "./dialog/DeleteDocumentDialog";
import UploadDocumentDialog, { UPLOAD_DOCUMENT_DIALOG } from "./dialog/UploadDocumentDialog";

const buttonStyle = {
  fontSize: 30,
  borderRadius: 100,
  color: "white",
  position: "absolute",
  bottom: 20,
  right: 20,
};

export default function DocumentContainer(props: { label: string }) {
  const { snackOpen, snackText } = useAppSelector((state: RootState) => state.dialog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDocumentsCommand(props.label));

    return () => {
      dispatch(viewUnloaded());
    };
  }, [dispatch, props.label]);

  const openEventDetailsDialog = (document: DocumentViewModel) => {
    dispatch(
      showDialog({
        type: DOCUMENT_DETAILS_DIALOG,
        data: { document },
      })
    );
  };

  const openUploadDialog = () => {
    dispatch(
      showDialog({
        type: UPLOAD_DOCUMENT_DIALOG,
        data: {},
      })
    );
  };

  const handleSnackBarClose = () => {
    dispatch(closeSnackCommand());
  };

  return (
    <Grid container mt={4}>
      <DocumentList selectDocument={openEventDetailsDialog} />
      <Button color="secondary" variant="contained" sx={buttonStyle} children={"+"} onClick={openUploadDialog} />

      <DocumentDetailsDialog />
      <ShareDocumentDialog />
      <DeleteDocumentDialog />
      <UploadDocumentDialog />

      {snackOpen && snackText ? (
        <SnackBar open={snackOpen} handleClose={handleSnackBarClose} message={snackText} />
      ) : null}
    </Grid>
  );
}
