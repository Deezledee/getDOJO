import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../services/api.service";
import EditTechnique from "./EditTechnique";
import Navbar from "../components/Navbar";
import { Box, Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";




function TechniqueDetailsPage (props) {
  const [technique, setTechnique] = useState(null);
  const { techniqueId } = useParams();


  
  
  const getTechnique = useCallback(() => {

    

    service.getTechnique(techniqueId)    
      .then((response) => {
        const oneTechnique = response.data;
        setTechnique(oneTechnique);
      })
      .catch((error) => console.log(error));
  }, [techniqueId]);
  
  
  useEffect(()=> {
    getTechnique();
  }, [getTechnique] );

  
  return (
    <Box className="techniqueDetails">
      <Navbar />
      <Container maxWidth="md">
        <Card elevation={0} sx={{ borderRadius: 3 }}>
          <CardContent>
            {technique && (
              <>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.2 }}>
                  {technique.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#475569", mb: 2 }}>
                  {technique.description}
                </Typography>
              </>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mb: 1.8 }}>
              <Button component={Link} to="/techniques" variant="contained">
                Back to Techniques
              </Button>
              <Button component={Link} to={`/techniques/edit/${techniqueId}`} variant="outlined">
                Edit Technique
              </Button>
            </Stack>

            <EditTechnique refreshTechnique={getTechnique} techniqueId={techniqueId} />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default TechniqueDetailsPage;