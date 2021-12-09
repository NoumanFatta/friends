import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState } from 'react';
import { auth, db, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import uuid from 'react-uuid';
function SimpleDialog(props) {
    const { onClose, open } = props;
    const [description, setDescription] = useState("");
    const [uid, setuid] = useState(uuid());
    const handleClose = () => {
        onClose();
    };


    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const PreviewImage = () => {
        if (image) {
            return (
                <>
                    <ListItem>
                        <div>
                            <img style={{
                                height: '227px',
                                width: '100%'
                            }} src={image}
                                alt="preview"
                            />
                        </div>
                    </ListItem>
                </>

            )
        }
        else {
            return (null)
        }
    }

    const post = () => {
        setuid(uuid());
        const user = auth.currentUser;
        const img = document.getElementById("img").files[0];
        console.log(uid);
        if (img) {
            const storageRef = ref(storage, `${user.email}/posts/${uid}`);
            uploadBytes(storageRef, img).then((snapshot) => {
                getDownloadURL(ref(storage, `${user.email}/posts/${uid}`))
                    .then((url) => {
                        addDoc(collection(db, `posts`), {
                            description: description,
                            img: url,
                            postedBy: user.email,
                            postedOn: new Date()
                        });
                        alert("Post uploaded Successfully!");
                    })
                    .catch((error) => {
                        alert(error);
                    });
            });
        } else {
            addDoc(collection(db, `posts`), {
                description: description,
                postedBy: user.email,
                postedOn: new Date()
            }).then(() => {
                alert("Post added successfully!")
            })
                .catch((error) => {
                    alert(error)
                });
        }
    };


    return (

        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add a post</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem>
                    <ListItemText />
                    <TextareaAutosize
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        maxRows={4}
                        aria-label="maximum height"
                        style={{ width: '100%', height: 150, resize: 'none', fontSize: 30 }}
                    />
                </ListItem>
                <ListItem>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        <PhotoCamera />
                        <span style={{
                            marginLeft: '10px'
                        }}>Upload</span>
                        <input id="img"
                            onChange={onImageChange}
                            type="file"
                            hidden
                            accept="image/*"
                        />
                    </Button>
                </ListItem>
                <PreviewImage />
                <ListItem>
                    <Button onClick={post} style={{
                        width: '100%'
                    }} variant="contained">
                        POST
                    </Button>
                </ListItem>
            </List>
        </Dialog>
    );
}


export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Button variant="outlined" onClick={handleClickOpen}>
                Add a post
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
