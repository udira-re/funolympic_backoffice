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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { CREATE_HIGHLIGHT } from "../../service/highlight/mutation";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileUploader from "../../components/uploader/single";

interface HighlightFormData {
  title: string;
  video: File | any;
  date: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Highlight is required"),
  video: yup.mixed().required("Video is required"),
  date: yup.string().required("Date is required"),
});

const AddHighlightPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HighlightFormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const createHighlightMutation = useMutation(CREATE_HIGHLIGHT, {
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        toast.success(data?.data?.message || "Success");
        setTimeout(() => {
          navigate("/highlight");
        }, 2000);
      } else {
        toast.error(data?.message || "Error");
      }
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);

    formData.append("date", data.date);
    formData.append("video", data.video);

    createHighlightMutation.mutate(formData);
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
              Add Highlight
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
                name="video"
                rules={{
                  required: "Video is required",
                }}
                render={({ field }) => (
                  <FileUploader label="video" onChange={field.onChange} />
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

export default AddHighlightPage;
