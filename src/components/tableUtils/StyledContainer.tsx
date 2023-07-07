import { PropsWithChildren } from "react";
import { Container } from "@mui/material";

const StyledContainer = ({ children }: PropsWithChildren) => {
  return (
    <Container
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      {children}
    </Container>
  );
};

export default StyledContainer;
