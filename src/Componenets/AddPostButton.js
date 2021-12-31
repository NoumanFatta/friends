import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { auth, db, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore";
import uuid from 'react-uuid';



export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState('');
    const [disable, setDisable] = useState(false);
    const [UniqueId, setUniqueId] = useState(uuid());
    useEffect(() => {
        if (description === '' && (!image[1])) setDisable(true);
        else setDisable(false);
    }, [image, description])

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage([URL.createObjectURL(event.target.files[0]), event.target.files[0]]);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setDisable(true);
        setOpen(false);
        setImage([]);
        setDescription('')
    };

    const post = () => {
        setDisable(true);
        setUniqueId(uuid());
        const user = auth.currentUser;
        if (image[1]) {
            const storageRef = ref(storage, `${user.uid}/posts/${UniqueId}`);
            uploadBytes(storageRef, image[1])
                .then(() => {
                    getDownloadURL(ref(storage, `${user.uid}/posts/${UniqueId}`))
                        .then((url) => {
                            const docRef = doc(collection(db, "posts"));
                            setDoc(docRef, {
                                description: description,
                                img: url,
                                postedOn: new Date(),
                                postedBy: user.uid,
                                likes: [],
                                postID: docRef.id
                            }).then(() => {
                                handleClose();
                            }).catch((error) => {
                                console.log(error)
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        } else {
            const docRef = doc(collection(db, "posts"));
            setDoc(docRef, {
                description: description,
                postedOn: new Date(),
                postedBy: user.uid,
                likes: [],
                postID: docRef.id
            }).then(() => {
                handleClose();
            }).catch((error) => {
                alert(error);
            });
        }
    };

    return (
        <div>
            <Button fullWidth sx={{
                height: '50px'
            }} variant="outlined" onClick={handleClickOpen}>
                Add a post
            </Button>
            <Dialog fullWidth={true}
                maxWidth='sm' open={open}>
                <DialogTitle>Add Your Post
                    <CloseIcon sx={{
                        float: 'right',
                        color: '#1976d2',
                        transition: '0.3s',
                        border: '1px solid #1976d2',
                        borderRadius: '50%'
                    }} onClick={handleClose} className="crossIcon" />
                </DialogTitle>
                <DialogContent>

                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        onChange={(e) => (setDescription(e.target.value))}
                        multiline
                        rows={4}
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <label htmlFor="contained-button-file">
                        <input onChange={onImageChange} accept="image/*" id="contained-button-file" hidden type="file" />
                        <Button fullWidth variant="contained" component="span">
                            <PhotoCamera />
                            Add a photo
                        </Button>
                    </label>

                    {
                        image[0] ?
                            <>
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    marginTop: '2rem',
                                }} >
                                    <img alt='img-prievew'
                                        style={{
                                            maxWidth: '100%',
                                            border: '3px solid black'
                                        }}
                                        src={image[0]}
                                    />
                                </div>
                            </>
                            : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={post} disabled={disable} variant="contained" fullWidth>post your status</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
