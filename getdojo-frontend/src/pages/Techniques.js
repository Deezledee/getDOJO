import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";


function Techniques() {
  const [techniques, setTechniques] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [like, setLike] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL


  useEffect(() => {
    axios
      .get(`${API_URL}/api/techniques`)
      .then((response) => {
        console.log("response.data", response.data);
        setTechniques(response.data);
      })
      .catch((error) => console.log(error));
      const storedLikedTechniques = JSON.parse(localStorage.getItem("likedTechniques")) || [];
      setLike(storedLikedTechniques);
  }, [API_URL]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/api/techniques/${id}`)
      .then((response) => {
        console.log(response.data);
        setTechniques(techniques.filter((technique) => technique._id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleLike = (id) => {
    const updatedLikedTechniques = like.includes(id)
      ? like.filter((likedId) => likedId !== id)
      : [...like, id];
  
    setLike(updatedLikedTechniques);
    localStorage.setItem("likedTechniques", JSON.stringify(updatedLikedTechniques));
  };

  const filteredTechniques = techniques.filter((technique) => {
    return technique.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Box sx={{ minHeight: "100vh", background: "var(--dojo-bg)" }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ pt: 13, pb: 5 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} justifyContent="space-between" alignItems={{ xs: "stretch", md: "center" }} sx={{ mb: 2.2 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>
            Techniques
          </Typography>
          <TextField
            type="text"
            placeholder="Search for a technique..."
            onChange={handleSearch}
            sx={{ width: { xs: "100%", md: 380 } }}
          />
        </Stack>

        <Grid container spacing={2.2}>
          {filteredTechniques.map((technique) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={technique._id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3 }}>
                <CardMedia component="img" height="190" image={technique.image} alt={technique.title} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    {technique.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569" }}>
                    {technique.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: 0, display: "grid", gap: 1 }}>
                  <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                    <Chip
                      label={`Like ${like.includes(technique._id) ? "💖" : "♡"}`}
                      color={like.includes(technique._id) ? "primary" : "default"}
                      onClick={() => handleLike(technique._id)}
                      variant={like.includes(technique._id) ? "filled" : "outlined"}
                    />
                    <Button component={Link} to={`/techniques/${technique._id}`} size="small" variant="text">
                      Details
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} to={`/edit-technique/${technique._id}`} fullWidth variant="outlined" size="small">
                      Edit
                    </Button>
                    <Button fullWidth color="error" variant="contained" size="small" onClick={() => handleDelete(technique._id)}>
                      Delete
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Button component={Link} to="/random-chuck" variant="contained" size="large">
            Take me to a random Chuck Norris fact
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Techniques;
