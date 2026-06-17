import { Box, CircularProgress, Stack, Typography } from "@mui/material";

function AppLoader({ label = "Loading dojo..." }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at 12% 12%, rgba(59,130,246,0.18), transparent 38%), radial-gradient(circle at 86% 20%, rgba(71,85,105,0.16), transparent 40%), linear-gradient(180deg, #f8fbff 0%, #eef2f8 100%)",
      }}
    >
      <Stack spacing={1.2} alignItems="center">
        <CircularProgress size={42} thickness={4.4} />
        <Typography variant="h6" sx={{ color: "#1e293b", fontWeight: 800 }}>
          getDOJO
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          {label}
        </Typography>
      </Stack>
    </Box>
  );
}

export default AppLoader;