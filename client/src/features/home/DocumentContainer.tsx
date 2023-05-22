import { Button, Grid } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { viewUnloaded } from "./documentListSlice";
import { loadDocumentsCommand } from "./documentListCommands";
import DocumentList from "./DocumentList";
import DocumentPreview from "./DocumentPreview";
import { DocumentViewModel } from "./model/DocumentViewModel";

export default function DocumentContainer(props: { label: string }) {
  const [selectedDocument, setSelectedDocument] = useState<DocumentViewModel | null>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDocumentsCommand(props.label));

    return () => {
      dispatch(viewUnloaded());
    };
  }, [dispatch, props.label]);

  const selectDocument = (doc: DocumentViewModel | null) => setSelectedDocument(doc);

  return (
    <Grid container>
      <Grid item xs={selectedDocument ? 10 : 12} mt={4}>
        <DocumentList selectDocument={selectDocument} />
        <Button
          variant="contained"
          sx={{
            fontSize: 30,
            borderRadius: 100,
            backgroundColor: "#ffea00",
            position: "absolute",
            bottom: 30,
            right: 30,
          }}
        >
          +
        </Button>
      </Grid>
      {selectedDocument ? (
        <Grid item xs={2} sx={{ borderLeft: "1px solid lightGrey" }}>
          <DocumentPreview document={selectedDocument} />
        </Grid>
      ) : null}
    </Grid>
  );
}
