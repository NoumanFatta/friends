import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useRef } from "react";
import { auth } from "../firebase-config";
import { updateEmail, updatePassword } from "firebase/auth";
import { useSelector } from "react-redux";

export default function SettingContent() {
  const userDetails = useSelector(state => state.user.user);

  const fNameChange = useRef(null);
  const lNameChange = useRef(null);
  const emailChange = useRef(null);
  const passwordChange = useRef(null);
  const [expanded, setExpanded] = React.useState(false);

  const [buttonState, setButtonState] = React.useState({
    nameButton: true,
    emailButton: true,
    passwordButton: true
  })

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const updateUser = (e) => {
    const elementid = e.target.id;
    const firstName = fNameChange.current.value;
    const lastName = lNameChange.current.value;
    const name = firstName.toLowerCase().replace(/\s/g, '')+lastName.toLowerCase().replace(/\s/g);
    const email = emailChange.current.value;
    const password = passwordChange.current.value;
    const docRef = doc(db, "users", userDetails.uid);
    if (elementid === "email") {
      if (email === "") alert("Textbox must not be empty");
      else {
        setButtonState({ ...buttonState, emailButton: false });
        updateEmail(auth.currentUser, email)
          .then(() => {
            setDoc(
              docRef,
              {
               email
              },
              { merge: true }
            ).then(() => {
              alert("Email has been updated");
              window.location.reload(false);
            });
          })
          .catch((error) => {
            alert(error.message);
            setButtonState({ ...buttonState, emailButton: true });
          });
      }
    } else if (elementid === "password") {
      if (password === "") alert("Textbox must not be empty");
      else {
        setButtonState({ ...buttonState, passwordButton: false });

        updatePassword(auth.currentUser, password)
          .then(() => {
            setDoc(
              docRef,
              {
                password
              },
              { merge: true }
            ).then(() => {
              alert("Password has been updated");
              window.location.reload(false);
            });
          })
          .catch((error) => {
            alert(error.message);
            setButtonState({ ...buttonState, passwordButton: true });
          });
      }
    } else if (elementid === "name") {
      if (firstName === "" || lastName === '' ) alert("Textbox must not be empty");
      else {
        setButtonState({ ...buttonState, nameButton: false });
        setDoc(
          docRef,
          {
            firstName,
            lastName,
            name
          },
          { merge: true }
        ).then(() => {
          alert("Succesfully name changed");
          window.location.reload(false);
        });
      }
    }
  };
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Name</Typography>
          <Typography sx={{ color: "text.secondary" }}> {userDetails && `${userDetails.firstName} ${userDetails.lastName}` }  </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            inputRef={fNameChange}
            autoComplete="off"
            helperText=" "
            label="First Name"
          />
          <TextField
            inputRef={lNameChange}
            autoComplete="off"
            helperText=" "
            label="Last Name"
          />
          <div
            style={{
              display: "inline-block",
              marginLeft: "13px",
              marginTop: "9px",
            }}
          >
            {buttonState.nameButton ? (
              <Button
                id="name"
                onClick={(e) => updateUser(e)}
                variant="contained"
                endIcon={<PublishedWithChangesIcon />}
              >
                Update
              </Button>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<PublishedWithChangesIcon />}
                variant="outlined"
              >
                Updating
              </LoadingButton>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Email</Typography>
          <Typography sx={{ color: "text.secondary" }}>{userDetails?.email}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            inputRef={emailChange}
            autoComplete="off"
            helperText=" "
            label="Email"
          />
          <div
            style={{
              display: "inline-block",
              marginLeft: "13px",
              marginTop: "9px",
            }}
          >
            {buttonState.emailButton ? (
              <Button
                id="email"
                onClick={(e) => updateUser(e)}
                variant="contained"
                endIcon={<PublishedWithChangesIcon />}
              >
                Update
              </Button>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<PublishedWithChangesIcon />}
                variant="outlined"
              >
                Updating
              </LoadingButton>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Password</Typography>
          <Typography sx={{ color: "text.secondary" }}>*******</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            type="password"
            inputRef={passwordChange}
            autoComplete="off"
            helperText=" "
            label="password"
          />
          <div
            style={{
              display: "inline-block",
              marginLeft: "13px",
              marginTop: "9px",
            }}
          >
            {buttonState.passwordButton ? (
              <Button
                id="password"
                onClick={(e) => updateUser(e)}
                variant="contained"
                endIcon={<PublishedWithChangesIcon />}
              >
                Update
              </Button>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<PublishedWithChangesIcon />}
                variant="outlined"
              >
                Updating
              </LoadingButton>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            lorem ipsum
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
