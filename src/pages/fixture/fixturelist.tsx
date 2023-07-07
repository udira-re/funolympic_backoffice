import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { GET_ALL_FIXTURE } from "../../service/fixture/query";
import { useQuery } from "react-query";

const FixtureListPage = () => {
  const navigate = useNavigate();

  const reDirect = () => {
    navigate(`/add-fixture`);
  };
  const { isLoading, data } = useQuery(["getAllHighlight"], GET_ALL_FIXTURE, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "country1",
      // valueGetter: (params: GridRowModel) => params.row.user.firstName,
      headerName: "Country",
      flex: 1,
    },
    {
      field: "country2",
      // valueGetter: (params: GridRowModel) => params.row.user.firstName,
      headerName: "Country",
      flex: 1,
    },
    {
      field: "type",
      // valueGetter: (params: GridRowModel) => params.row.user.lastName,
      headerName: "Type",
      flex: 1,
    },
    {
      field: "date",
      // valueGetter: (params: GridRowModel) => params.row.date,
      headerName: "Date",
      flex: 1,
    },
    {
      field: "time",
      // valueGetter: (params: GridRowModel) => params.row.time,
      headerName: "Time",
      flex: 1,
    },
  ];

  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 1 }}
        color="secondary"
      >
        Fixture
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          onClick={reDirect}
          startIcon={<AddIcon style={{ color: "white" }} />}
          variant="contained"
        >
          Add Fixture
        </Button>
      </Box>
      <DataGrid rows={data?.data?.result ?? []} columns={columns} autoHeight />
    </Container>
  );
};

export default FixtureListPage;
