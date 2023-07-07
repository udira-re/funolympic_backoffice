import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import { GET_ALL_NEWS } from "../../service/news/query";

const NewsListPage = () => {
  const navigate = useNavigate();

  const reDirect = () => {
    navigate(`/add-news`);
  };
  const { isLoading, data } = useQuery(["getAllHighlight"], GET_ALL_NEWS, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "title",
      // valueGetter: (params: GridRowModel) => params.row.user.firstName,
      headerName: "Title",
      flex: 1,
    },
    {
      field: "url",
      // valueGetter: (params: GridRowModel) => params.row.user.firstName,
      headerName: "Url",
      flex: 1,
      renderCell: (params: GridRowModel) => {
        const news = params.row;
        return (
          <Link rel="stylesheet" href={news.url} target="_blank">
            {news.url}
          </Link>
        );
      },
    },
    {
      field: "image",
      // valueGetter: (params: GridRowModel) => params.row.user.lastName,
      headerName: "Image",
      flex: 1,
      renderCell: (params: GridRowModel) => {
        const news = params.row;
        return (
          <Link
            rel="stylesheet"
            href={`http://localhost:8000/uploads/${news.image}`}
            target="_blank"
          >
            {news.image}
          </Link>
        );
      },
    },
    {
      field: "date",
      // valueGetter: (params: GridRowModel) => params.row.date,
      headerName: "Date",
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
        News
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          onClick={reDirect}
          startIcon={<AddIcon style={{ color: "white" }} />}
          variant="contained"
        >
          Add News
        </Button>
      </Box>
      <DataGrid
        rows={data?.data?.result.rows ?? []}
        columns={columns}
        autoHeight
      />
    </Container>
  );
};

export default NewsListPage;
