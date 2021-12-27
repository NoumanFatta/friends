import React,{ useState,useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebase-config";

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

  const [gender, setGender] = useState("");
  
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const numberRef = useRef(null)


  

  const singUpFunction = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const number = numberRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const img = document.getElementById("img").files[0];
        const storageRef = ref(storage, `${user.uid}/dp`);
        uploadBytes(storageRef, img).then((snapshot) => {
          getDownloadURL(ref(storage, `${user.uid}/dp`))
            .then((url) => {
              setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                password,
                gender,
                number,
                img: url,
                name: firstName.toLowerCase().replace(/\s/g, '')+lastName.toLowerCase().replace(/\s/g, ''),
                uid: user.uid
              })
                .then(() => {
                  alert("User created Successfully!");
                  navigate("/home");
                  window.location.reload();
                });
            })
            .catch((error) => { });
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
              label="First Namme"
              placeholder="Enter your Last Name"
              inputRef={firstNameRef}
            />
            <TextField
              fullWidth
              label="Last Name"
              placeholder="Enter your Last Name"
              inputRef={lastNameRef}
            />
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email"
              inputRef={emailRef}
            />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                onChange={(e) => {
                  setGender(e.target.value);
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
             inputRef={passwordRef}
              fullWidth
              label="Password"
              placeholder="Enter your password"
            />
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
              inputRef={numberRef}
            />

            <input
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
