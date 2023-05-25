import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  FormControl,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { UpTransition } from "../../../common/components/UpTransition";
import { hideDialog } from "../../../redux/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { shareDocumentCommand } from "../documentListCommands";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const SHARE_DOCUMENT_DIALOG = "SHARE_DOCUMENT_DIALOG";

const segmentLabels = [
  { key: "Everyone", value: "all" },
  { key: "English", value: "english" },
  { key: "Math 1", value: "math" },
  { key: "AIP", value: "aip" },
  { key: "Physics", value: "physics" },
  { key: "ETH1", value: "eth1" },
];

export default function ShareDocumentDialog() {
  const { show, type, data } = useAppSelector((state) => state.dialog);

  const [segments, setSegments] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof segments>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("all")) {
      setSegments(["all"]);
    } else {
      setSegments(typeof value === "string" ? value.split(",") : value);
    }

    setError(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(hideDialog());
    };
  }, [dispatch]);

  const closeDialog = useCallback(() => {
    dispatch(hideDialog());
  }, [dispatch]);

  const handleShareDocument = () => {
    if (segments.length === 0) {
      setError(true);
    } else {
      dispatch(shareDocumentCommand(data.document.id, segments));
      setError(false);
    }
  };

  if (type !== SHARE_DOCUMENT_DIALOG) return null;
  return (
    <Dialog
      open={show}
      TransitionComponent={UpTransition}
      keepMounted
      onClose={closeDialog}
      aria-describedby="document-details-dialog"
    >
      <DialogContent>
        <Grid container justifyContent={"center"} mb={2}>
          <Typography variant="h5">Share document</Typography>
        </Grid>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Typography id="demo-multiple-name-label">Choose groups to share with:</Typography>
            <Select
              error={error}
              sx={{ mt: 0.5 }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={segments}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {segmentLabels.map((label) => (
                <MenuItem key={label.key} value={label.value}>
                  {label.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <DialogActions sx={{ mt: 3 }}>
          <Button sx={{ mr: 1 }} onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={handleShareDocument}>
            Share
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
