import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebase-config";
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
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Signup = () => {
  const navigate = useNavigate();
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const [signUpName, setSignUpName] = useState("");
  const [signUpemail, setsignUpemail] = useState("");
  const [signUpGender, setSignUpGender] = useState("");
  const [signUppassword, setsignUppassword] = useState("");
  const [signUpNumber, setSignUpNumber] = useState("");
  const singUpFunction = () => {
    createUserWithEmailAndPassword(auth, signUpemail, signUppassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const img = document.getElementById("img").files[0];
        const storageRef = ref(storage, `${user.email}/dp`);
        uploadBytes(storageRef, img).then((snapshot) => {
          getDownloadURL(ref(storage, `${user.email}/dp`))
            .then((url) => {
              setDoc(doc(db, "users", user.email), {
                name: signUpName,
                email: signUpemail,
                password: signUppassword,
                gender: signUpGender,
                number: signUpNumber,
                img: url
              });
              alert("User created Successfully!");
              navigate("/home");
            })
            .catch((error) => {});
        });
      })
      .catch((error) => {
        alert(error);
      });
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
            <TextField
              fullWidth
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => {
                setSignUpName(e.target.value);
              }}
            />
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
                onChange={(e) => {
                  setSignUpGender(e.target.value);
                }}
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
              onChange={(e) => {
                setsignUppassword(e.target.value);
              }}
              fullWidth
              label="Password"
              placeholder="Enter your password"
            />
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
              onChange={(e) => {
                setSignUpNumber(e.target.value);
              }}
            />

            <input
              // onChange={handleFileSelected}
              type="file"
              id="img"
              accept="image/*"
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
