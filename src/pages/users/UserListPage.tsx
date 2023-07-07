import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import {
  Container,
  Typography,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { GET_ALL_USER } from "../../service/user/query";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { DELETE_USER } from "../../service/user/mutation";

const UserListPage = () => {
  const iconFontSize = "medium";

  const createHighlightMutation = useMutation(DELETE_USER, {
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
    ["getAllHighlight"],
    GET_ALL_USER,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "email",
      // valueGetter: (params: GridRowModel) => params.row.user.email,
      headerName: "Email" as string,
      flex: 2,
      sortable: true,
      filterable: true,
    },
    {
      field: "firstName",
      // valueGetter: (params: GridRowModel) => params.row.user.firstName,
      headerName: "First Name" as string,
      flex: 1,
      sortable: true,
      filterable: true,
    },
    {
      field: "lastName",
      // valueGetter: (params: GridRowModel) => params.row.user.lastName,

      headerName: "Last Name" as string,
      flex: 1,
    },
    {
      field: "role",
      // valueGetter: (params: GridRowModel) => params.row.user.lastName,

      headerName: "Role" as string,
      flex: 1,
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
        const user = params.row.id;
        return (
          <Stack direction={"row"} alignItems={"center"} spacing={0.2}>
            <Tooltip title="Delete">
              <IconButton onClick={() => createHighlightMutation.mutate(user)}>
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
        User List
      </Typography>

      <DataGrid rows={data?.data?.result ?? []} columns={columns} autoHeight />
    </Container>
  );
};

export default UserListPage;
