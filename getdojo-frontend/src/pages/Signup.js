import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./../services/auth.service";
import "../index.css";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription =
          error?.response?.data?.message ||
          "Signup failed. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 12% 12%, rgba(59,130,246,0.18), transparent 35%), radial-gradient(circle at 85% 18%, rgba(100,116,139,0.18), transparent 42%), linear-gradient(180deg, #f8fbff 0%, #eef2f8 100%)",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #dbe2ec",
            overflow: "hidden",
            background: "#ffffffcc",
            backdropFilter: "blur(6px)",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ p: { xs: 2.5, sm: 4, md: 5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", mb: 1 }}>
                  Create your account
                </Typography>
                <Typography variant="body1" sx={{ color: "#475569", mb: 3 }}>
                  Join getDOJO and build your martial arts profile.
                </Typography>

                <Box component="form" onSubmit={handleSignupSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmail}
                      fullWidth
                    />
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlePassword}
                      fullWidth
                    />
                    <TextField
                      label="Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleName}
                      fullWidth
                    />

                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </Box>

                <Divider sx={{ my: 2.5 }} />

                <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
                  Already have an account?
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                >
                  Login
                </Button>
              </CardContent>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                className="authVisualPanel"
                sx={{
                  height: { xs: 260, md: "100%" },
                  minHeight: { md: 560 },
                  backgroundImage:
                    "url(https://res.cloudinary.com/iujg6ghfdf/image/upload/v1689279691/7n_shanghaidawnishappening00_fggjye.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}

export default Signup;
