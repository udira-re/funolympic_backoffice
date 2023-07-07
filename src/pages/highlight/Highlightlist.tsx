import React from "react";
import { Button, Typography, Box } from "@mui/material";

import { StyledBox, StyledContainer } from "../../components/tableUtils";

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import HighlightDataGrid from "../../components/tableUtils/HighlightDataGrid";
import { useQuery } from "react-query";
import { GET_ALL_HIGHLIGHT } from "../../service/highlight/query";

const HighlightListPage: React.FC = () => {
  const navigate = useNavigate();

  const reDirect = () => {
    navigate(`/add-highlight`);
  };
  const { isLoading, data } = useQuery(["getAllHighlight"], GET_ALL_HIGHLIGHT, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return null;
  }

  return (
    <StyledContainer>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 1 }}
        color={"secondary"}
      >
        HighLight
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          onClick={reDirect}
          startIcon={<AddIcon style={{ color: "white" }} />}
          variant="contained"
        >
          Add Highlight
        </Button>
      </Box>

      <StyledBox>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        ></div>
      </StyledBox>
      <HighlightDataGrid
        data={data?.data.result}
        handleAlertOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
        setSortBy={function (): void {
          throw new Error("Function not implemented.");
        }}
        setSortDir={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </StyledContainer>
  );
};

export default HighlightListPage;
