import React from "react";

export interface DialogSupportProps {
  open: boolean;
  openDialog(): void;
  onClose(): void;
}

export default function withDialogSupport(
  WrappedComponent: React.ComponentType<DialogSupportProps>
) {
  return (props: any) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const openDialog = () => {
      return setOpen(true);
    };
    const onClose = () => {
      return setOpen(false);
    };

    return (
      <WrappedComponent open={open} openDialog={openDialog} onClose={onClose} />
    );
  };
}
