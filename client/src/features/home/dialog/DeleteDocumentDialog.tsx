import { Dialog, DialogContent, DialogActions, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { UpTransition } from "../../../common/components/UpTransition";
import { hideDialog } from "../../../redux/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteDocumentCommand } from "../documentListCommands";

export const DELETE_DOCUMENT_DIALOG = "DELETE_DOCUMENT_DIALOG";

export default function DeleteDocumentDialog() {
  const { show, type, data } = useAppSelector((state) => state.dialog);

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

  const handleDelete = () => {
    dispatch(deleteDocumentCommand(document.id));
  };

  if (type !== DELETE_DOCUMENT_DIALOG) return null;
  return (
    <Dialog
      open={show}
      TransitionComponent={UpTransition}
      keepMounted
      onClose={closeDialog}
      aria-describedby="document-details-dialog"
    >
      <DialogContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Delete document?
        </Typography>
        <Typography>{`Document: ${document.name} - will be permanently deleted. This action is irreversible.`}</Typography>
        <DialogActions>
          <Grid container direction={{ xs: "column", md: "row" }} mb={0.5} mt={2} justifyContent={"flex-start"}>
            <Grid mb={1}>
              <Button sx={{ mr: 1 }} onClick={closeDialog}>
                Cancel
              </Button>
              <Button variant="outlined" sx={{ mr: 1 }} color={"error"} onClick={handleDelete}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
