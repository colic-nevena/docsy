import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router";
import { styled } from "@mui/material/styles";

const AppBreadcrumbsTab = styled(Breadcrumbs)(({ theme }) => ({
  paddingBottom: theme.spacing(2)
}));

export default function AppBreadcrumbs() {
  const location = useLocation();

  const paths = React.useMemo(() => {
    return location.pathname.split("/").filter((item) => item !== undefined && item.length > 0);
  }, [location]);

  const crumbs = paths
    .filter((path) => path !== "app")
    .map((_, index) => {
      return paths.filter((path) => path !== "app").slice(0, index + 1);
    });

  return paths.length >= 3 ? (
    <AppBreadcrumbsTab aria-label="breadcrumb" separator=">">
      {crumbs.map((item, index) =>
        paths.length - 2 !== index ? (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={item.slice(0, index + 1).join("/")}
          >
            {item[index]}
          </Link>
        ) : (
          <Typography key={index} color="text.primary" sx={{ cursor: "default" }}>
            {item[index]}
          </Typography>
        )
      )}
    </AppBreadcrumbsTab>
  ) : null;
}
