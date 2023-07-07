import { AccountCircle } from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    // handle login logic here
    navigate("auth/login");
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
        <Card sx={{ width: "100%", boxShadow: 3, background: "#f5f5f5" }}>
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center", mb: 1 }}
              color={"primary"}
            >
              Forgot Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <Button variant="contained" type="submit" color="secondary">
                Send Email
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ForgetPasswordPage;
