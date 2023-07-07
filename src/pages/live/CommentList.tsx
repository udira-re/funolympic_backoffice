import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { GET_LIVE_COMMENT } from "../../service/live/query";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { DELETE_COMMENT } from "../../service/live/mutation";
import { Cancel } from "@mui/icons-material";

const LiveCommnetListPage = () => {
  const iconFontSize = "medium";
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteComment = useMutation(DELETE_COMMENT, {
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        toast.success(data?.data?.message || "Success");
        refetch();
      } else {
        toast.error(data?.message || "Error");
      }
    },
  });
  const { isLoading, data, refetch } = useQuery(
    ["getAllHighlight", id],
    GET_LIVE_COMMENT,
    {
      enabled: !!id,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return null;
  }
  const onBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title" as string,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Gmail",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1.5,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "content",
      headerName: "Comment",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action " as string,
      flex: 1,

      renderCell: (params: GridRowModel) => {
        const id = params.row.id;
        return (
          <Stack direction={"row"} alignItems={"center"} spacing={0.2}>
            <Tooltip title="View Commnet">
              <IconButton onClick={() => deleteComment.mutate(id)}>
                <Cancel fontSize={iconFontSize} color="primary" />
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
        Live Comment
      </Typography>
      <Button
        size="large"
        onClick={onBackClick}
        color="primary"
        sx={{ mb: 1 }}
        variant="contained"
      >
        Back
      </Button>
      <DataGrid rows={data?.data?.result ?? []} columns={columns} autoHeight />
    </Container>
  );
};

export default LiveCommnetListPage;
