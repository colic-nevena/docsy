import { Grid, Typography } from "@mui/material";
import { DocumentViewModel } from "./model/DocumentViewModel";
import docImg from "../../assets/doc.png";
import documentsImg from "../../assets/documents.png";
import excelImg from "../../assets/excel.png";
import htmlImg from "../../assets/html.png";
import pictureImg from "../../assets/image.png";
import jsImg from "../../assets/js-file.png";
import musicImg from "../../assets/music.png";
import pdfImg from "../../assets/pdf.png";
import phpImg from "../../assets/php.png";
import pptImg from "../../assets/ppt.png";
import svgImg from "../../assets/svg.png";
import rarImg from "../../assets/rar-file.png";
import videoImg from "../../assets/video.png";
import zipImg from "../../assets/zip.png";

const getImageByType = (type: string) => {
  switch (type.toLocaleLowerCase()) {
    case "docx":
      return docImg;

    case "xlsx":
      return excelImg;

    case "html":
      return htmlImg;

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return pictureImg;

    case "js":
      return jsImg;

    case "mp3":
    case "wav":
    case "m4a":
    case "aiff":
    case "aac":
      return musicImg;

    case "pdf":
      return pdfImg;

    case "php":
      return phpImg;

    case "pptx":
    case "ppt":
      return pptImg;

    case "rar":
      return rarImg;

    case "svg":
      return svgImg;

    case "zip":
    case "7z":
    case "tar.gz":
    case "tar":
    case "tar.7z":
      return zipImg;

    case "mp4":
    case "mov":
      return videoImg;

    default:
      return documentsImg;
  }
};

interface Props {
  document: DocumentViewModel;
  selectedId: string;
}

export default function CustomDocument(props: Props) {
  const { document, selectedId } = props;

  return (
    <>
      <Grid container justifyContent={"center"} sx={{ mb: 1.5 }}>
        <img src={getImageByType(document.type)} height={70} width={70} alt="docImage" />
      </Grid>
      <Grid container justifyContent={"center"}>
        <Typography
          noWrap
          sx={{
            mt: 0.25,
            color: selectedId === document.id ? "#2198F3" : "black",
            "&:hover": {
              color: "#2198F3",
            },
          }}
        >
          {document.name}
        </Typography>
      </Grid>
    </>
  );
}
