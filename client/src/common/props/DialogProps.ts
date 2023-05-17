export interface DialogProps {
    open: boolean;
    handleClose(): void;
    action(): void;
}