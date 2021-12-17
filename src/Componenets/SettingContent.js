import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { Name, ID } from './Home'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useRef } from 'react'

export default function SettingContent() {

  const username = React.useContext(Name);
  const userID = React.useContext(ID);
  const nameChange = useRef(null)
  const [expanded, setExpanded] = React.useState(false);
  const [buttonState, setButtonState] = React.useState(true);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const updateName = () => {
    const name = nameChange.current.value;
    if (name === "")
      alert("Textbox must not be empty")
    else {
      setButtonState(false);
      const docRef = doc(db, 'users', userID);
      setDoc(docRef, {
        name
      }, { merge: true })
        .then(() => {
          alert("Succesfully name changed");
          window.location.reload(false);
        });
    }
  }
  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {username}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            inputRef={nameChange}
            autoComplete='off'
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Name"
          />
          <div style={{ display: 'inline-block', marginLeft: '13px', marginTop: '9px' }} >
            {buttonState ?
              <Button onClick={updateName} variant="contained" endIcon={<PublishedWithChangesIcon />}>
                Update
              </Button> :
              <LoadingButton
                onClick={updateName}
                loading
                loadingPosition="start"
                startIcon={<PublishedWithChangesIcon />}
                variant="outlined"
              >
                Updating
              </LoadingButton>
            }
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
