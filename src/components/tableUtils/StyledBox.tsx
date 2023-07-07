import { PropsWithChildren } from "react";
import { Box } from "@mui/material";

const StyledBox = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default StyledBox;
