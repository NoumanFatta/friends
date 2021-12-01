import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = ({ handleChange }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginFunction = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <div className="form">
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <TextField
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
          />
          <Button
            onClick={loginFunction}
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          <Typography>
            {/* <Link href="#">Forgot password ?</Link> */}
          </Typography>
          <Typography>
            Don't you have an account ?<Link to="/signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
