import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileUpload: (event: File[]) => void;
}

export default function CustomDropZone(props: Props) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      props.onFileUpload(acceptedFiles);
    },
    [props]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}
