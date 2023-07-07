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

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation } from "react-query";
import { CREATE_FIXTURE } from "../../service/fixture/mutation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface HighlightFormData {
  country1: string;
  country2: string;
  date: string;
  time: string;
  type: string;
}

const schema = yup.object().shape({
  country1: yup.string().required("Country 1 is required"),
  country2: yup.string().required("Country 2 is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  type: yup.string().required("Sport type is required"),
});

const AddFixturePage: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HighlightFormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const createFixtureMutation = useMutation(CREATE_FIXTURE, {
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        toast.success(data?.data?.message || "Success");
        setTimeout(() => {
          navigate("/fixture");
        }, 2000);
      } else {
        toast.error(data?.message || "Error");
      }
    },
  });

  const onSubmit = (data: HighlightFormData) => {
    createFixtureMutation.mutate(data);
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
              Add Fixture
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Country"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("country1")}
                error={!!errors.country1}
                helperText={errors.country1?.message}
              />
              <TextField
                label="Country"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("country2")}
                error={!!errors.country2}
                helperText={errors.country2?.message}
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
                label="Time"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("time")}
                error={!!errors.time}
                helperText={errors.time?.message}
              />

              <TextField
                label="Sport Type"
                fullWidth
                margin="normal"
                variant="outlined"
                {...register("type")}
                error={!!errors.type}
                helperText={errors.type?.message}
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

export default AddFixturePage;
