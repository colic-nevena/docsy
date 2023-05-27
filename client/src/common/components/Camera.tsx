import { Button, Grid, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

// const videoConstraints = {
//   width: 480, //1280
//   height: 480, //720
//   facingMode: "environment", // environment
// };

interface Props {
  imgSrc: any;
  handleClose: () => void;
  handleSetImage: (image: string | null) => void;
}

export default function Camera(props: Props) {
  const [frontCamera, setFrontCamera] = useState(false);

  const webcamRef = useRef<Webcam>(null);

  const switchCameras = () => setFrontCamera(!frontCamera);

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
        <>
          <Webcam
            mirrored={false}
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={{
              width: 720,
              height: 720,
              facingMode: frontCamera ? "user" : "environment",
            }}
          />
        </>
      )}

      <Grid container justifyContent={"space-between"}>
        {props.imgSrc ? (
          <Button variant="text" onClick={retake}>
            Retake
          </Button>
        ) : (
          <Button variant="text" onClick={capture}>
            Take photo
          </Button>
        )}

        {!props.imgSrc ? (
          <IconButton onClick={switchCameras}>
            <CameraswitchIcon color="primary" />
          </IconButton>
        ) : null}

        <Button variant="text" onClick={props.handleClose}>
          Close
        </Button>
      </Grid>
    </div>
  );
}
