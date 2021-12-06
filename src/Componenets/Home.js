import React from "react";
import { Button } from "@material-ui/core";
import { auth } from "../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Home() {
  const [showUserName, setshowUserName] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.email;
      setshowUserName(uid);
    } else {
      navigate("/");
    }
  });
  const navigate = useNavigate();
  const user = auth.currentUser;

  const logoutFunction = () => {
    signOut(auth).then(() => {
      alert("Logout");
      navigate("/");
    });
  };
  return (
    <>
      <h1>Welcome: {showUserName}</h1>
      <h1>Home page</h1>
      <Button
        onClick={logoutFunction}
        type="button"
        variant="contained"
        color="primary"
      >
        log out
      </Button>
    </>
  );
}
