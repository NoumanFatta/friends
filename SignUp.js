import React from "react";
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
import Checkbox from "@material-ui/core/Checkbox";
import { DatePicker } from "@material-ui/pickers";
import { app, db, storage } from "./FirebaseConfig";
import { useState, useEffect } from "react";
import {
  collection,
  setDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "@firebase/storage";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState("");
  const [dob, setDOB] = useState("");
  const [profPic, setProfPic] = useState("");



  const navigate = useNavigate();
  const SignUpUser = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Your Account Is Created");
        const user = userCredential.user;
        const uid = user.id;
        let d = new Date();
        let t = d.getTime();
        let files = document.getElementById("file").files[0];
        const storageRef = ref(storage, `/${email}/${t}`);
        const uploadTask = uploadBytesResumable(storageRef, files);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            alert("An Error Occured During Uploading Your Picture");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              let pic = downloadURL;
              setDoc(doc(db, "Accounts", email), {
                user: {
                  userName,
                  email,
                  gender,
                  phone,
                  password,
                  dob,
                  pic
                },
              });
              console.log(pic)
            });
          }
        );
        navigate("./home");

 
      })
      .catch((error) => {
        alert("An Error Occured");
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };



  const uploadPicture = () => {
    console.log("Working");

   
  };

  const userSignUp = (e) => {
    e.preventDefault();
    let terms = document.getElementById("check").checked;
    if (password === confirmPassword && password != "" && terms) {
      SignUpUser();
    }
  };
  return (
    <div className="form">
      <Grid id="main-form">
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
              onChange={(e) => {
                setUserName(e.target.value);
                console.log(e.target.value);
              }}
              fullWidth
              label="Name"
              placeholder="Enter your name"
            />
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }}
              fullWidth
              label="Email"
              placeholder="Enter your email"
            />
            <FormControl component="fieldset" style={marginTop}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log(e.target.value);
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
            <p className="text">Select Your Date Of Birth</p>
            <input
              onChange={(e) => {
                setDOB(e.target.value);
                console.log(e.target.value);
              }}
              className="dob"
              type="Date"
            />
            <div>
              <TextField
                onChange={(e) => {
                  setPhone(e.target.value);
                  console.log(e.target.value);
                }}
                fullWidth
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <TextField
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(e.target.value);
                }}
                fullWidth
                label="Password"
                placeholder="Enter your password"
              />
              <TextField
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  console.log(e.target.value);
                }}
                fullWidth
                label="Confirm Password"
                placeholder="Confirm your password"
              />
              <p className="text">Select Your Profile Picture</p>
              <input
                className="file"
                type="file"
                id="file"
                accept="image/*"
                name="Select Profile Picture"
              />
              <FormControlLabel
                control={<Checkbox id="check" name="checkedA" />}
                label="I accept the terms and conditions."
              />

              <Button
                onClick={userSignUp}
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign up
              </Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Signup;
