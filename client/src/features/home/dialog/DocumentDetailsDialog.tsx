import { Dialog, DialogContent, DialogActions, Button, Grid, Typography, Divider } from "@mui/material";
import { useCallback, useEffect } from "react";
import { UpTransition } from "../../../common/components/UpTransition";
import { hideDialog, showDialog } from "../../../redux/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SHARE_DOCUMENT_DIALOG } from "./ShareDocumentDialog";
import { DELETE_DOCUMENT_DIALOG } from "./DeleteDocumentDialog";
import { downloadDocumentCommand } from "../documentListCommands";
import { RootState } from "../../../redux/store";

const getDocumentType = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
    case "docx":
      return `Document (application/${type})`;

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
      return `Image (image/${type})`;

    case "zip":
    case "7z":
    case "tar.gz":
    case "tar":
    case "tar.7z":
    case "rar":
      return `Archive (application/${type})`;

    case "pptx":
    case "ppt":
      return `Presentation (application/${type})`;

    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
      return `Video (video/${type})`;

    default:
      return "Unknown";
  }
};

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
          <Typography variant="h5">{document.name}</Typography>
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
          <Typography>{getDocumentType(document.type)}</Typography>
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
          <Grid container direction={{ xs: "column", md: "row" }} mb={0.5} mt={1} justifyContent={"flex-start"}>
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
            <Grid>
              <Button variant="text" color={"primary"} onClick={deleteDocument}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
