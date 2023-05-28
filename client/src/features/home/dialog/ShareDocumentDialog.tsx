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
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
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
];

export default function ShareDocumentDialog() {
  const { show, type, data } = useAppSelector((state) => state.dialog);

  const [segments, setSegments] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof segments>) => {
    const {
      target: { value },
    } = event;
    if (value.length > 0) setError(false);

    if (value.includes("all")) {
      setSegments(["all"]);
    } else setSegments(typeof value === "string" ? value.split(",") : value);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setSegments([]);
      setError(false);
      dispatch(hideDialog());
    };
  }, [dispatch]);

  const closeDialog = useCallback(() => {
    dispatch(hideDialog());
    setSegments([]);
    setError(false);
  }, [dispatch]);

  const handleShareDocument = () => {
    if (segments.length === 0) {
      setError(true);
    } else {
      dispatch(shareDocumentCommand(data.document.id, segments));
      setError(false);
      setSegments([]);
    }
  };

  const renderSelectedValues = (selectedValues: string[]): string[] => {
    let result: string[] = [];
    segmentLabels.forEach((label) => {
      selectedValues.forEach((selected, ind) => {
        if (label.value === selected) {
          if (ind === selectedValues.length - 1) result.push(label.key);
          else result.push(`${label.key}, `);
        }
      });
    });
    return result;
  };

  if (type !== SHARE_DOCUMENT_DIALOG) return null;
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
        <Grid container justifyContent={"center"} mb={2}>
          <Typography variant="h5">Share document</Typography>
        </Grid>

        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Choose a class to share with</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              error={error}
              value={segments}
              onChange={handleChange}
              input={<OutlinedInput label="Choose a class to share with" />}
              renderValue={renderSelectedValues}
              MenuProps={MenuProps}
            >
              {segmentLabels.map((label) => (
                <MenuItem key={label.key} value={label.value}>
                  <Checkbox disabled={segments.indexOf("all") > -1 && label.value !== "all"} checked={segments.indexOf(label.value) > -1} />
                  <ListItemText primary={label.key} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <DialogActions sx={{ mt: 3 }}>
          <Grid container justifyContent={"center"}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 1, borderRadius: 5, color: "white", fontWeight: "bold" }}
              onClick={handleShareDocument}
            >
              Share
            </Button>
            <Button onClick={closeDialog}>Cancel</Button>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
