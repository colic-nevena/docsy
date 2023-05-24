import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import TabPanel from "../../common/components/TabPanel";
import DocumentContainer from "./DocumentContainer";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My documents" {...a11yProps(0)} />
          <Tab label="English classroom" {...a11yProps(1)} />
          <Tab label="Math classroom" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <DocumentContainer label={""} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DocumentContainer label={"english"} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DocumentContainer label={"math"} />
      </TabPanel>
    </Box>
  );
}
