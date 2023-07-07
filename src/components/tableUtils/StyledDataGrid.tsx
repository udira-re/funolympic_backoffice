import { PropsWithChildren } from "react";
import { Box } from "@mui/material";

const StyledDataGrid = ({ children }: PropsWithChildren) => {
  return <Box sx={{ minHeight: "60vh", width: "100%" }}>{children}</Box>;
};

export default StyledDataGrid;
