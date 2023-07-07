import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowProps,
} from "@mui/x-data-grid";

import React from "react";
import { StyledDataGrid } from ".";
import { Link } from "@mui/material";

interface ICustomDataGrid {
  data: [[GridRowProps]] | [];
  handleAlertOpen: (actionType: string) => void;
  setSortBy: (value: string) => void;
  setSortDir: (value: string) => void;
}

const HighlightDataGrid: React.FC<ICustomDataGrid> = ({ data }) => {
  //   const isSuperAdmin = useRoleCheck("Super Admin");
  //   const isAdmin = useRoleCheck("Admin");

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "date",
      headerName: "date",
      flex: 1,
    },
    {
      field: "video",
      headerName: "Video",
      flex: 1.5,
      renderCell: (params: GridRowModel) => {
        const highlight = params.row;
        return (
          <Link
            rel="stylesheet"
            href={`http://localhost:8000/uploads/${highlight.video}`}
            target="_blank"
          >
            {highlight.video}
          </Link>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1.5,
    },
  ];
  return (
    <StyledDataGrid>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection={false}
        disableRowSelectionOnClick
        autoHeight
        hideFooter
        disableColumnMenu
      />
    </StyledDataGrid>
  );
};

export default HighlightDataGrid;
