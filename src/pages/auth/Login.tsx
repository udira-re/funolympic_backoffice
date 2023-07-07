import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { setLocalSession } from "../../utils/storage.utils";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { LOGIN } from "../../service/auth/mutation";

const LoginPage = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { setIsAuthenticated, setAuthToken, setUser } = useAuth();

  const loginMutation = useMutation(LOGIN, {
    onSuccess: (data: any) => {
      if (data?.status === 200) {
        setAuthToken(data?.data?.result?.accessToken);
        setUser(data?.data?.result);
        console.log(data.data.result);
        setLocalSession("@fun-token", data?.data?.result?.accessToken);
        setLocalSession("@fun-email", data?.data?.result?.email);
        setLocalSession("@fun-userId", data?.data?.result?.id.toString());
        setIsAuthenticated(true);
        toast.success(data?.data?.message || "Success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data?.message || "Error");
      }
    },
  });

  const handleLogin = (data: any) => {
    // Perform login logic with the submitted data
    loginMutation.mutate(data);
  };

  const handleForgetPassword = () => {
    navigate("/auth/forgotPassword");
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ width: "100%", boxShadow: 3, background: "white" }}>
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center", mb: 1 }}
              color="secondary"
            >
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleLogin)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <TextField
                label="Email"
                type="email"
                required
                fullWidth
                margin="normal"
                {...register("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                required
                fullWidth
                margin="normal"
                {...register("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end"></IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button variant="contained" type="submit" color="primary">
                Login
              </Button>
            </Box>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 1, mb: 1, ml: 30 }}
            >
              <Link
                onClick={handleForgetPassword}
                sx={{ bgcolor: "primary", cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
