import React from "react";
import { Box, Pagination } from "@mui/material";

interface CustomPaginationProps {
  totalPages: number;
  page: number;
  handlePaginationChange: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  page,
  handlePaginationChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePaginationChange}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Box>
  );
};

export default CustomPagination;
