import { Grid, Divider, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import docImage from "../../assets/documents.png";
import { DocumentViewModel } from "./model/DocumentViewModel";
import { useState } from "react";

interface Props {
  selectDocument: (document: DocumentViewModel | null) => void;
}

export default function DocumentList(props: Props) {
  const { documentList } = useAppSelector((state) => state.documentList);

  const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");

  const selectDocument = (doc: DocumentViewModel) => () => {
    if (selectedDocumentId === doc.id) {
      setSelectedDocumentId("");
      props.selectDocument(null);
    } else {
      setSelectedDocumentId(doc.id);
      props.selectDocument(doc);
    }
  };

  return documentList.length > 0 ? (
    <Grid container gap={6}>
      {documentList.map((doc, ind) => (
        <Grid
          key={ind}
          sx={{
            cursor: "pointer",
          }}
          onClick={selectDocument(doc)}
        >
          <Grid container justifyContent={"center"} sx={{ mb: 1.5 }}>
            <img src={docImage} height={70} width={70} alt="docImage" />
          </Grid>
          <Divider />
          <Typography
            sx={{
              mt: 0.25,
              color: selectedDocumentId === doc.id ? "#2198F3" : "black",
              "&:hover": {
                color: "#2198F3",
              },
            }}
          >
            {doc.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>Nothing to see yet...</Typography>
  );
}
