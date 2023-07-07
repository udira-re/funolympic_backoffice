import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { GET_ALL_LIVE } from "../../service/live/query";
import { useQuery } from "react-query";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LiveListPage = () => {
  const iconFontSize = "medium";
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(["getAllHighlight"], GET_ALL_LIVE, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return null;
  }

  const reDirect = () => {
    navigate(`/add-live`);
  };
  const columns: GridColDef[] = [
    {
      field: "title",

      headerName: "Title" as string,
      flex: 1,
    },
    {
      field: "url",
      // valueGetter: (params: GridRowModel) => params.row.user.firstName,
      headerName: "Url",
      flex: 1,
      renderCell: (params: GridRowModel) => {
        const live = params.row;
        return (
          <Link rel="stylesheet" href={live.url} target="_blank">
            {live.url}
          </Link>
        );
      },
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1.5,
      renderCell: (params: GridRowModel) => {
        const live = params.row;
        return (
          <Link
            rel="stylesheet"
            href={`http://localhost:8000/uploads/${live.image}`}
            target="_blank"
          >
            {live.image}
          </Link>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action " as string,
      flex: 1,

      renderCell: (params: GridRowModel) => {
        const live = params.row.id;
        return (
          <Stack direction={"row"} alignItems={"center"} spacing={0.2}>
            <Tooltip title="View Commnet">
              <IconButton onClick={() => navigate(`/live/${live}`)}>
                <VisibilityIcon fontSize={iconFontSize} color="primary" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 1 }}
        color={"secondary"}
      >
        Live
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          onClick={reDirect}
          startIcon={<AddIcon style={{ color: "white" }} />}
          variant="contained"
        >
          Add Live
        </Button>
      </Box>
      <DataGrid rows={data?.data?.result ?? []} columns={columns} autoHeight />
    </Container>
  );
};

export default LiveListPage;
