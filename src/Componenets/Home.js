import React from "react";
import { Button } from "@material-ui/core";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
  }
});

export default function Home() {
  const logoutFunction = () => {
    signOut(auth).then(() => {
      alert("Logout");
    });
  };
  return (
    <>
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
