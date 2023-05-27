import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, Divider } from "@mui/material";
import { useCallback, useEffect } from "react";
import { UpTransition } from "../../../common/components/UpTransition";
import { hideDialog, showDialog } from "../../../redux/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SHARE_DOCUMENT_DIALOG } from "./ShareDocumentDialog";
import { DELETE_DOCUMENT_DIALOG } from "./DeleteDocumentDialog";
import { downloadDocumentCommand } from "../documentListCommands";
import { RootState } from "../../../redux/store";

export const DOCUMENT_DETAILS_DIALOG = "DOCUMENT_DETAILS_DIALOG";

export default function DocumentDetailsDialog() {
  const { show, type, data } = useAppSelector((state: RootState) => state.dialog);

  const { document } = data;

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(hideDialog());
    };
  }, [dispatch]);

  const closeDialog = useCallback(() => {
    dispatch(hideDialog());
  }, [dispatch]);

  const shareDocument = () => {
    closeDialog();
    dispatch(
      showDialog({
        type: SHARE_DOCUMENT_DIALOG,
        data: { document },
      })
    );
  };

  const deleteDocument = () => {
    closeDialog();
    dispatch(
      showDialog({
        type: DELETE_DOCUMENT_DIALOG,
        data: { document },
      })
    );
  };

  const downloadDocument = () => {
    dispatch(downloadDocumentCommand(document.name, document.path));
  };

  if (type !== DOCUMENT_DETAILS_DIALOG) return null;
  return (
    <Dialog
      open={show}
      TransitionComponent={UpTransition}
      keepMounted
      onClose={closeDialog}
      aria-describedby="document-details-dialog"
      sx={{ cursor: "default" }}
    >
      <DialogContent>
        <Grid container justifyContent={"center"} mb={1}>
          <Typography sx={{ mt: 0.25, mr: 1 }} variant="h5">
            {document.name}
          </Typography>
        </Grid>
        <Divider />
        <Grid container direction={"row"} mb={1} mt={2}>
          <Typography sx={{ mr: 1, fontWeight: "bold" }}>Owner:</Typography>
          <a href={`mailto:${data.owner}`} style={{ color: "#03a9f4", textDecoration: "none" }}>
            <Typography>{document.owner}</Typography>
          </a>
        </Grid>
        <Grid container direction={"row"} mb={1}>
          <Typography sx={{ mr: 1, fontWeight: "bold" }}>Type:</Typography>
          <Typography>{document.type}</Typography>
        </Grid>
        <Grid container direction={"row"} mb={1}>
          <Typography sx={{ mr: 1, fontWeight: "bold" }}>Size:</Typography>
          <Typography>{document.size} kB</Typography>
        </Grid>
        <Grid container direction={"row"} mb={2}>
          <Typography sx={{ mr: 1, fontWeight: "bold" }}>Created at:</Typography>
          <Typography>{document.createdAt}</Typography>
        </Grid>
        <Divider />
        <DialogActions>
          <Grid container direction={{ xs: "column", md: "row" }} mb={0.5} mt={1} justifyContent={{ xs: "flex-start", sm: "center" }}>
            <Grid mb={1.5}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 1, fontWeight: "bold", color: "white", borderRadius: 5 }}
                onClick={shareDocument}
              >
                Share
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 1, fontWeight: "bold", color: "white", borderRadius: 5 }}
                onClick={downloadDocument}
              >
                Download
              </Button>
            </Grid>
            <Grid ml={{ sm: 2 }}>
              <Button variant="text" color={"primary"} onClick={deleteDocument}>
                Delete
              </Button>
              <Button variant="text" color={"primary"} onClick={closeDialog}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
