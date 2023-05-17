import { styled } from "@mui/material/styles";

interface EmptyRowProps {
  space?: number;
}

export const EmptyRow = styled("div", {
  shouldForwardProp: (prop) => prop !== "space"
})<EmptyRowProps>(({ theme, space }) => ({
  padding: theme.spacing(space || 1)
}));
