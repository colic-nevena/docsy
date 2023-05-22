import { Button, Grid, Typography } from "@mui/material";
import { DocumentViewModel } from "./model/DocumentViewModel";

const getDocumentType = (type: string) => {
  switch (type) {
    case "pdf" || "docx":
      return `Document (application/${type})`;

    default:
      return `Image (image/${type})`;
  }
};

export default function DocumentPreview(props: { document: DocumentViewModel }) {
  const { document } = props;

  return (
    <Grid sx={{ ml: 1, cursor: "default" }}>
      <Grid container justifyContent={"center"} mb={2} mt={2}>
        <Typography variant="h5">{document.name}</Typography>
      </Grid>

      <Grid container direction={"row"} mb={1}>
        <Typography sx={{ mr: 1, fontWeight: "bold" }}>Owner:</Typography>
        <a href={`mailto:${document.owner}`} style={{ color: "#2196f3", textDecoration: "none" }}>
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

      <Grid container direction={"row"} mb={10}>
        <Typography sx={{ mr: 1, fontWeight: "bold" }}>Created at:</Typography>
        <Typography>{document.createdAt}</Typography>
      </Grid>

      <Grid container direction={"column"} mb={0.5}>
        <Grid sx={{ mb: 2 }}>
          <Button variant="outlined">Share</Button>
        </Grid>
        <Grid>
          <Button variant="outlined">Download</Button>
          <Button variant="outlined" color={"error"} sx={{ ml: 1 }}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

//sx={{ color: "#2196f3" }}
