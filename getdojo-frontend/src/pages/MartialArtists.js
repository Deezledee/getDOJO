import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";


function MartialArtists() {
  const [martialArtists, setMartialArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    axios
      .get(`${API_URL}/api/martial-artists`)
      .then((response) => {
        setMartialArtists(response.data);
      })
      .catch((error) => console.log(error));
  }, [API_URL]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMartialArtists = martialArtists.filter((martialArtist) =>
    martialArtist.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="martialArtistsPage">
      <Navbar />
      <Container maxWidth="xl" sx={{ pt: 13, pb: 5 }}>
        <Stack spacing={2} sx={{ mb: 2.4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>
            Martial Artists
          </Typography>
          <Typography variant="body1" sx={{ color: "#475569" }}>
            Here are influential personalities who practiced martial arts.
          </Typography>
          <TextField
            type="text"
            placeholder="Search for a Martial Artist..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            sx={{ width: { xs: "100%", md: 420 } }}
          />
        </Stack>

        <Grid container spacing={2.2}>
          {filteredMartialArtists.map((martialArtist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={martialArtist._id}>
              <Card sx={{ height: "100%", borderRadius: 3 }}>
                <CardMedia component="img" height="210" image={martialArtist.image} alt={martialArtist.title} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {martialArtist.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569", mt: 1 }}>
                    {martialArtist.about}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#1d4ed8", mt: 1.1, fontWeight: 700 }}>
                    Ranking: {martialArtist.ranking}
                  </Typography>
                </CardContent>
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

export default MartialArtists;
