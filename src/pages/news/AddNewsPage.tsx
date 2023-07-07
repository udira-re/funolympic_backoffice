import React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileUploader from "../../components/uploader/single";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CREATE_NEWS } from "../../service/news/mutation";

interface NewsFormData {
  title: string;
  image: File | any;
  date: string;
  url: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  image: yup.mixed().required("Image is required"),
  date: yup.string().required("Date is required"),
  url: yup.string().required("URL is required"),
});

const AddNewsPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: yupResolver(schema),
  });

  const createNewsMutation = useMutation(CREATE_NEWS, {
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        toast.success(data?.data?.message || "Success");
        setTimeout(() => {
          navigate("/news");
        }, 2000);
      } else {
        toast.error(data?.message || "Error");
      }
    },
  });

  const onSubmit = (data: NewsFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("date", data.date);
    formData.append("url", data.url);
    createNewsMutation.mutate(formData);
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Card sx={{ width: "100%", boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Add News
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Title"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <Controller
                control={control}
                name="image"
                rules={{
                  required: "Image is required",
                }}
                render={({ field }) => (
                  <FileUploader label="image" onChange={field.onChange} />
                )}
              />

              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]} sx={{ mt: 1 }}>
                      <DatePicker
                        label="Date"
                        format="YYYY-MM-DD"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        onChange={field.onChange}
                        disableFuture
                        slotProps={{
                          textField: {
                            error: !!errors.date,
                            helperText: errors.date?.message,
                          },
                        }}
                        sx={{ width: "100%" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />

              <TextField
                label="URL"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("url")}
                error={!!errors.url}
                helperText={errors.url?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Add
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
export default AddNewsPage;
