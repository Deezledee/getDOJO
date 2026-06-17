import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import authService from "./../services/auth.service";
import axios from "axios";
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

function Login(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, setIsLoading, setIsLoggedIn, setUser } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);

        const storedToken = localStorage.getItem("authToken");
        return axios.get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
      })
      .then((response) => {
        const user = response.data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
        navigate("/create-profile-page");
      })
      .catch((error) => {
        const errorDescription =
          error?.response?.data?.message ||
          "Login failed. Please check your credentials and try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 8% 12%, rgba(30,64,175,0.2), transparent 38%), radial-gradient(circle at 88% 18%, rgba(71,85,105,0.2), transparent 40%), linear-gradient(180deg, #f8fbff 0%, #eef2f8 100%)",
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
                  Welcome back
                </Typography>

                <Typography variant="body1" sx={{ color: "#475569", mb: 3 }}>
                  Login to continue training your getDOJO journey.
                </Typography>

                <Box component="form" onSubmit={handleLoginSubmit}>
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
                      Login
                    </Button>
                  </Stack>
                </Box>

                <Divider sx={{ my: 2.5 }} />

                <Typography variant="body2" sx={{ color: "#64748b", mb: 1 }}>
                  Don't have an account yet?
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/signup")}
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                >
                  Sign up
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
                    "url(https://res.cloudinary.com/iujg6ghfdf/image/upload/v1689324688/chucknorris1_rbskqk.jpg)",
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

export default Login;
