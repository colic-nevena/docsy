import { Grid, Typography } from "@mui/material";
import { DocumentViewModel } from "./model/DocumentViewModel";
import docImg from "../../assets/doc.png";
import documentsImg from "../../assets/documents.png";
import excelImg from "../../assets/excel.png";
import jsImg from "../../assets/js-file.png";
import pictureImg from "../../assets/image.png";
import musicImg from "../../assets/music.png";
import pdfImg from "../../assets/pdf.png";
import phpImg from "../../assets/php.png";
import pptImg from "../../assets/ppt.png";
import svgImg from "../../assets/svg.png";
import rarImg from "../../assets/rar-file.png";
import videoImg from "../../assets/video.png";
import zipImg from "../../assets/zip.png";
import textImg from "../../assets/text.png";

const getImageByType = (type: string) => {
  if (type.toLocaleLowerCase().includes("wordprocessingml")) return docImg;
  else if (type.toLocaleLowerCase().includes("presentation")) return pptImg;
  else if (type.toLocaleLowerCase().includes("spreadsheetml")) return excelImg;
  else {
    switch (type.toLocaleLowerCase()) {
      case "application/javascript":
        return jsImg;

      case "text/plain":
        return textImg;

      case "application/pdf":
        return pdfImg;

      case "image/jpg":
      case "image/jpeg":
      case "image/png":
      case "image/gif":
      case "application/octet-stream":
        return pictureImg;

      case "application/x-php":
        return phpImg;

      case "application/mp3":
      case "application/wav":
      case "application/m4a":
      case "application/aiff":
      case "application/aac":
        return musicImg;

      case "application/php":
        return phpImg;

      case "application/rar":
        return rarImg;

      case "application/svg":
        return svgImg;

      case "application/zip":
      case "application/7z":
      case "application/tar.gz":
      case "application/tar":
      case "application/tar.7z":
        return zipImg;

      case "application/mp4":
      case "application/mov":
      case "application/avi":
      case "application/mkv":
        return videoImg;

      default:
        return documentsImg;
    }
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
