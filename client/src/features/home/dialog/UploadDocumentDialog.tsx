import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { UpTransition } from "../../../common/components/UpTransition";
import { hideDialog } from "../../../redux/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";
import { RootState } from "../../../redux/store";
import CustomDropZone from "../../../common/components/CustomDropZone";
import Camera from "../../../common/components/Camera";

export const UPLOAD_DOCUMENT_DIALOG = "UPLOAD_DOCUMENT_DIALOG";

export default function UploadDocumentDialog() {
  const { show, type } = useAppSelector((state: RootState) => state.dialog);

  const [files, setFiles] = useState<File[]>([]);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgName, setImgName] = useState<string>("");
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setFiles([]);
      setImgSrc(null);
      dispatch(hideDialog());
    };
  }, [dispatch]);

  const closeDialog = useCallback(() => {
    setFiles([]);
    setImgSrc(null);
    dispatch(hideDialog());
  }, [dispatch]);

  const handleShowCamera = () => setShowCamera(!showCamera);

  const onFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const convertImgToBlob = (imageSrc: string, contentType = "", sliceSize = 512) => {
    const byteCharacters = window.atob(imageSrc.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const handleSubmit = () => {
    // TODO:
    // dispatch action with FILES and IMAGE
  };

  const handleSetImage = (image: string | null) => {
    if (image === null) {
      const updated = files.filter((file) => !file.name.includes(imgName));
      setFiles(updated);
    } else {
      const blob = convertImgToBlob(image);
      const blobName = `${new Date().getTime()}_img`;
      setImgName(blobName);
      setFiles([...files, new File([blob], blobName)]);
    }

    setImgSrc(image);
  };

  console.log(files);

  if (type !== UPLOAD_DOCUMENT_DIALOG) return null;
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
        <Grid container justifyContent={"center"}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload a new document
          </Typography>
        </Grid>
        <Typography>
          To upload a new document either upload it from your computer or take it with your camera.
        </Typography>
        <DialogActions>
          <Grid container direction={{ xs: "column", md: "row" }} mb={0.5} mt={2} justifyContent={"center"}>
            <Grid mb={1}>
              <Grid sx={{ border: "2px dashed black", borderRadius: 5, padding: 2, cursor: "pointer" }}>
                <CustomDropZone onFileUpload={onFileUpload} />
              </Grid>

              <Grid container justifyContent={"center"} sx={{ mt: 1.5 }}>
                {!showCamera ? (
                  <IconButton size="small" color="primary" onClick={handleShowCamera}>
                    <CameraAltIcon />
                  </IconButton>
                ) : (
                  <Camera handleClose={handleShowCamera} handleSetImage={handleSetImage} imgSrc={imgSrc} />
                )}
              </Grid>

              {files && files.length > 0 ? (
                <Grid container direction={"column"}>
                  {files.map((file, ind) => (
                    <Typography key={ind} mt={2}>
                      {file.name}
                    </Typography>
                  ))}
                </Grid>
              ) : null}

              <Grid container justifyContent={"center"}>
                <Button
                  variant="contained"
                  sx={{ mr: 1, mt: 10, color: "white", fontWeight: "bold", borderRadius: 5 }}
                  onClick={handleSubmit}
                  color="secondary"
                  disabled={files.length === 0 && !imgSrc}
                >
                  Submit
                </Button>
                <Button variant="text" sx={{ mr: 1, mt: 10 }} onClick={closeDialog}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
