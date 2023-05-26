import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { DocumentViewModel } from "./model/DocumentViewModel";
import { useState } from "react";
import CustomDocument from "./CustomDocument";

interface Props {
  selectDocument: (document: DocumentViewModel) => void;
}

export default function DocumentList(props: Props) {
  const { documentList } = useAppSelector((state) => state.documentList);

  const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");

  const selectDocument = (doc: DocumentViewModel) => () => {
    setSelectedDocumentId(doc.id);
    props.selectDocument(doc);
  };

  return documentList.length > 0 ? (
    <Grid container justifyContent={"flex-start"}>
      {documentList.map((doc) => (
        <Grid
          key={doc.id}
          item
          xs={4}
          sm={3}
          md={2}
          lg={1}
          onClick={selectDocument(doc)}
          sx={{
            cursor: "pointer",
            mb: 5,
            mr: 3,
            ml: 3,
          }}
        >
          <CustomDocument document={doc} selectedId={selectedDocumentId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid container justifyContent={"center"} mt={10}>
      <Typography variant="h5">Nothing to see yet...</Typography>
    </Grid>
  );
}
