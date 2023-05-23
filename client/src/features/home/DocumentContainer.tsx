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

  const handleSnackBarClose = () => {
    dispatch(closeSnackCommand());
  };

  return (
    <Grid container mt={4}>
      <DocumentList selectDocument={openEventDetailsDialog} />
      <Button color="secondary" variant="contained" sx={buttonStyle} children={"+"} />

      <DocumentDetailsDialog />
      <ShareDocumentDialog />
      <DeleteDocumentDialog />

      {snackOpen && snackText ? (
        <SnackBar open={snackOpen} handleClose={handleSnackBarClose} message={snackText} />
      ) : null}
    </Grid>
  );
}
