import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Techniques from "./pages/Techniques";
import HomePage from "./pages/HomePage";
import React from "react";
import RandomChuckNorrisJoke from "./pages/RandomChuckNorrisJoke";
import StartPage from "./pages/StartPage";
import CreateProfile from "./pages/CreateProfile";
import MartialArtists from "./pages/MartialArtists";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AddTechnique from "./pages/AddTechnique";
import EditTechnique from "./pages/EditTechnique";
import TechniqueDetailsPage from "./pages/TechniqueDetailsPage";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/test"
            element={
              <IsPrivate>
                <CreateProfile />{" "}
              </IsPrivate>
            }
          />
          <Route path="/" element={<StartPage />} />
          <Route
            path="/home-page"
            element={
              <IsPrivate>
                <HomePage />{" "}
              </IsPrivate>
            }
          />

          <Route
            path="/create-profile-page"
            element={
              <IsPrivate>
                <CreateProfile />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/privacy-policy-page"
            element={
              <IsPrivate>
                <PrivacyPolicy />{" "}
              </IsPrivate>
            }
          />

          <Route
            path="/techniques"
            element={
              <IsPrivate>
                <Techniques />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/add-technique"
            element={
              <IsPrivate>
                <AddTechnique />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/technique-details-page/:techniqueId"
            element={
              <IsPrivate>
                <TechniqueDetailsPage />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/edit-technique/:techniqueId"
            element={
              <IsPrivate>
                <EditTechnique />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/martial-artists"
            element={
              <IsPrivate>
                <MartialArtists />{" "}
              </IsPrivate>
            }
          />

          <Route
            path="/techniques/:techniqueId"
            element={
              <IsPrivate>
                <Techniques />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/random-chuck"
            element={
              <IsPrivate>
                <RandomChuckNorrisJoke />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/quiz"
            element={
              <IsPrivate>
                <Quiz />{" "}
              </IsPrivate>
            }
          />

          <Route
            path="/signup"
            element={
              <IsAnon>
                {" "}
                <Signup />{" "}
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                {" "}
                <Login />{" "}
              </IsAnon>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
