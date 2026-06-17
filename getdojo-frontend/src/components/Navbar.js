import { useContext, useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import axios from "axios";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [picture, setPicture] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    if (!isLoggedIn || !user?._id || !API_URL) {
      return;
    }

    axios
      .get(`${API_URL}/api/create-profile-page/${user._id}`)
      .then((response) => {
        setPicture(response.data.picture);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [API_URL, isLoggedIn, user?._id]);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navItems = [
    { label: "Home", to: "/home-page" },
    { label: "Techniques", to: "/techniques" },
    { label: "Add Technique", to: "/add-technique" },
    { label: "Martial Artists", to: "/martial-artists" },
    { label: "Quiz", to: "/quiz" },
    { label: "My Profile", to: "/create-profile-page" },
  ];

  const drawerContent = (
    <Box sx={{ width: 280, p: 2 }} role="presentation" onClick={handleDrawerToggle}>
      <Stack spacing={1.2}>
        {isLoggedIn ? (
          <>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                sx={{ justifyContent: "flex-start", textTransform: "none", fontWeight: 700 }}
              >
                {item.label}
              </Button>
            ))}
            <Button onClick={logOutUser} color="error" sx={{ justifyContent: "flex-start", textTransform: "none", fontWeight: 700 }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/signup" sx={{ justifyContent: "flex-start", textTransform: "none", fontWeight: 700 }}>
              Sign Up
            </Button>
            <Button component={Link} to="/login" sx={{ justifyContent: "flex-start", textTransform: "none", fontWeight: 700 }}>
              Login
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );


  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.94)",
          borderBottom: "1px solid #e6e9ef",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 74 }}>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ flexGrow: 1 }}>
              <Avatar
                src="https://res.cloudinary.com/iujg6ghfdf/image/upload/v1689337930/getdojo-logo_xqikq7.png"
                alt="getDOJO-logo"
                sx={{ width: 42, height: 42 }}
              />
              <Typography sx={{ color: "#111827", fontWeight: 900, letterSpacing: 0.5 }}>
                getDOJO
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.4} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              {isLoggedIn ? (
                <>
                  {navItems.map((item) => (
                    <Button key={item.to} component={Link} to={item.to} sx={{ textTransform: "none", fontWeight: 700, color: "#1f2937" }}>
                      {item.label}
                    </Button>
                  ))}
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 1.5 }}>
                    <Avatar src={picture || undefined} sx={{ width: 32, height: 32 }}>
                      {(user?.name || "U").charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" sx={{ color: "#334155", fontWeight: 700, maxWidth: 120 }} noWrap>
                      {user?.name}
                    </Typography>
                    <Button onClick={logOutUser} color="error" sx={{ textTransform: "none", fontWeight: 700 }}>
                      Logout
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Button component={Link} to="/signup" sx={{ textTransform: "none", fontWeight: 700, color: "#1f2937" }}>
                    Sign Up
                  </Button>
                  <Button component={Link} to="/login" sx={{ textTransform: "none", fontWeight: 700, color: "#1f2937" }}>
                    Login
                  </Button>
                </>
              )}
            </Stack>

            <IconButton
              edge="end"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#111827" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Navbar;
