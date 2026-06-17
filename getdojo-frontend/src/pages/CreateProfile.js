import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import Navbar from "../components/Navbar";
import axios from "axios";
import service from "../services/api.service";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

function CreateProfile() {
  const [isChecked, setIsChecked] = useState(false);
  const [about, setAbout] = useState("");
  const [picture, setPicture] = useState("");
  const { user } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;
  const userInitial = (user?.name || "G").charAt(0).toUpperCase();

  useEffect(() => {
    if (!user?._id || !API_URL) {
      return;
    }

    axios
      .get(`${API_URL}/api/create-profile-page/${user._id}`)
      .then((response) => {
        setAbout(response.data.about);
        setPicture(response.data.picture);
        setIsChecked(response.data.termsAccepted);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [API_URL, user?._id]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handlePictureChange = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", event.target.files[0]);

    service
      .uploadImage(formData)
      .then((response) => {
        setPicture(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!API_URL || !user?._id) {
      alert("Server URL is missing. Please refresh and try again.");
      return;
    }

    axios
      .post(`${API_URL}/api/create-profile-page/${user._id}`, {
        about: about,
        termsAccepted: isChecked,
        picture: picture,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error updating details.");
      });
  };

  if (!user) {
    return null;
  }

  return (
    <Box className="createProfilePage">
      <Navbar />
      <Container maxWidth="lg" sx={{ pt: { xs: 11, md: 13 }, pb: 6 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid #e6e9ef",
            p: { xs: 2, sm: 3 },
            mb: 3,
            background: "linear-gradient(135deg, #f9fafc 0%, #eef2f9 100%)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={picture || undefined}
                sx={{ width: 68, height: 68, bgcolor: "#0f172a", fontWeight: 700 }}
              >
                {userInitial}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
                  Hey {user.name}, tune your profile
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569" }}>
                  This page is now responsive and optimized for mobile, tablet, and desktop.
                </Typography>
              </Box>
            </Stack>
            <Chip
              icon={<CheckCircleOutlineOutlinedIcon />}
              label={isChecked ? "Terms accepted" : "Terms pending"}
              color={isChecked ? "success" : "default"}
              variant={isChecked ? "filled" : "outlined"}
            />
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: { xs: 2.2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 0.5 }}>
                  About Me
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
                  Share your martial arts journey, goals, and background.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    id="about"
                    name="about"
                    multiline
                    minRows={6}
                    fullWidth
                    value={about}
                    onChange={handleAboutChange}
                    placeholder="Tell your story..."
                  />

                  <Stack spacing={1.2} sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                      label={
                        <Typography variant="body2" sx={{ color: "#334155" }}>
                          I agree to the{" "}
                          <Link to="/privacy-policy-page" target="_blank" className="termsAndConditionsLink">
                            Terms & Conditions
                          </Link>
                        </Typography>
                      }
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadOutlinedIcon />}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                      >
                        Upload Image
                        <input type="file" hidden id="picture" name="picture" onChange={handlePictureChange} />
                      </Button>

                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 800,
                          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                        }}
                      >
                        Save Changes
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827" }}>
                  Live Preview
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Stack spacing={2} alignItems="center">
                  <Avatar
                    src={picture || undefined}
                    sx={{ width: 112, height: 112, bgcolor: "#111827", fontSize: 38, fontWeight: 700 }}
                  >
                    {userInitial}
                  </Avatar>

                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a" }}>
                    {user.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#374151", textAlign: "center", width: "100%", maxWidth: 360 }}
                  >
                    {about || "Your profile text will appear here as you type."}
                  </Typography>

                  <Chip
                    size="small"
                    label={isChecked ? "Policy accepted" : "Policy not accepted"}
                    color={isChecked ? "success" : "warning"}
                    variant={isChecked ? "filled" : "outlined"}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CreateProfile;
