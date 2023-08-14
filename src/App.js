import { Routes, Route } from "react-router-dom";
import { Box, Button } from "@mui/material";

import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "./components";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {authUser ? (
        <Box sx={{ backgroundColor: "#000" }}>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
          </Routes>
        </Box>
      ) : (
        <Routes>
          <Route
            path="/signup"
            element={
              <SignUp
                handleSignUp={handleSignUp}
                setShowSignUp={setShowSignUp}
              />
            }
          />
          <Route
            path="/"
            element={
              <Login handleLogin={handleLogin} setShowSignUp={setShowSignUp} />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
