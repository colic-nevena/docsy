import { Button, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 480, //1280
  height: 480, //720
  facingMode: "user", // environment
};

interface Props {
  imgSrc: any;
  handleClose: () => void;
  handleSetImage: (image: string | null) => void;
}

export default function Camera(props: Props) {
  const webcamRef = useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      props.handleSetImage(imageSrc);
    }
  }, [webcamRef, props]);

  const retake = () => {
    props.handleSetImage(null);
  };

  return (
    <div className="container">
      {props.imgSrc ? (
        <img src={props.imgSrc} alt="webcam" />
      ) : (
        <Webcam
          mirrored={true}
          audio={false}
          height={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          videoConstraints={videoConstraints}
        />
      )}

      <Grid container justifyContent={"space-between"}>
        {props.imgSrc ? (
          <Button variant="text" onClick={retake}>
            Retake
          </Button>
        ) : (
          <Button variant="text" onClick={capture}>
            Capture photo
          </Button>
        )}
        <Button variant="text" onClick={props.handleClose}>
          Close
        </Button>
      </Grid>
    </div>
  );
}
