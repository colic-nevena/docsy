import { Button, ButtonProps } from "@mui/material";
import React from "react";

export interface DialogProps<T> {
  open: boolean;
  data: T;
  handleClose(): void;
  handleConfirm(data: T): void;
}

interface AreYouSureProps<T> {
  data: T;
  handleConfirm(data: T): void;
}

export default function withConfirmDialog<T>(
  Dialog: React.ComponentType<DialogProps<T>>
) {
  return (props: AreYouSureProps<T> & ButtonProps) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const { data, handleConfirm, ...buttonProps } = props;

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Button {...buttonProps} onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          data={data}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />
      </>
    );
  };
}
