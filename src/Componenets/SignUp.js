import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
// import { Link } from "react-router-dom";

const Signup = () => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const [signUpemail, setsignUpemail] = useState("");
  const [signUppassword, setsignUppassword] = useState("");

  const singUpFunction = () => {
    // createUserWithEmailAndPassword(auth, signUpemail, signUppassword)
    console.log(signUpemail);
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });
  };
  return (
    <div className="form">
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account !
            </Typography>
          </Grid>
          <form>
            <TextField fullWidth label="Name" placeholder="Enter your name" />
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => {
                setsignUpemail(e.target.value);
              }}
            />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                style={{ display: "initial" }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <TextField
              onChange={(e) => {
                setsignUppassword(e.target.value);
              }}
              fullWidth
              label="Password"
              placeholder="Enter your password"
            />

            <Button
              onClick={singUpFunction}
              type="button"
              variant="contained"
              color="primary"
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Signup;
