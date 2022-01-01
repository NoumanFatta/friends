import React, { useContext, useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserDetails } from './Profile';
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { db } from "../firebase-config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { collection, setDoc, onSnapshot, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Cards(props) {
    const userDetails = useContext(UserDetails);
    const [expanded, setExpanded] = useState(false);
    const currentUserDetails = useSelector(state => state.user.user);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentName, setCommentName] = useState([])
    const commentRef = useRef(null)
    useEffect(() => {
        const likes = props.postdata.likes;
        setIsLiked(likes.includes(currentUserDetails.uid));
        // getDocs(collection(db, "posts", props.postdata.postID, "comments"))
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((docs) => {
        //             const nameRef = doc(db, "users", docs.data().commentedBy);
        //             getDoc(nameRef).then((docSnap) => {
        //                 setCommentName((prev) => [...prev, { comment: docs.data().comment, commentedBy: docSnap.data().firstName, commentedByID: docs.data().commentedBy }])
        //             });
        //         });
        //     });

        const docRef = query(collection(db, "posts", props.postdata.postID, "comments"), orderBy('commentedOn', 'desc'));
        onSnapshot(docRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const nameRef = doc(db, "users", change.doc.data().commentedBy);
                    getDoc(nameRef).then((docSnap) => {
                        setComments((prev) => [{ data: change.doc.data(), name: docSnap.data().firstName },...prev]);
                    });
                }
            });
        });

    }, [currentUserDetails?.uid, props.postdata.likes, props.postdata.postID])
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const commentNow = () => {
        const docRef = doc(collection(db, "posts", props.postdata.postID, "comments"));
        setDoc(docRef, {
            commentID: docRef.id,
            comment: commentRef.current.value,
            commentedOn: new Date(),
            commentedBy: currentUserDetails.uid
        }).then(() => {
            console.log("commented")
        }).catch((error) => {
            alert(error);
        });
    }

    const likePost = () => {
        if (isLiked) {
            const postRef = doc(db, "posts", props.postdata.postID);
            updateDoc(postRef, {
                likes: arrayRemove(currentUserDetails.uid)
            }).then(() => {
                setIsLiked(false)
            });
        } else {
            const postRef = doc(db, "posts", props.postdata.postID);
            updateDoc(postRef, {
                likes: arrayUnion(currentUserDetails.uid)
            }).then(() => {
                setIsLiked(true)
            });
        }
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Remy Sharp"
                        src={userDetails.img}
                        sx={{ width: 60, height: 60 }}
                    />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${userDetails.firstName} ${userDetails.lastName}`}
                subheader={`${props.postdata.postedOn.toDate().toDateString()} ${props.postdata.postedOn.toDate().toLocaleTimeString()}`}
            />
            {props.postdata.img ?
                <CardMedia
                    component="img"
                    height="194"
                    image={props.postdata.img}
                    alt="Post"
                />
                : null
            }

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.postdata.likes.length}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <IconButton onClick={likePost} aria-label="add to favorites">
                    <FavoriteIcon color={isLiked ? 'warning' : ''} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {props.postdata.description}
                    </Typography>
                    <TextField
                        autoComplete="off"
                        helperText=" "
                        label="Comment"
                        inputRef={commentRef}
                    />
                    <Button
                        onClick={commentNow}
                        variant="contained"
                    >
                        Comment
                    </Button>
                    {comments.map((val, ind) => {
                        return (<p key={ind}> <span> {val.name}- </span> {val.data.comment} </p>)
                    })
                    }

                    {/* {
                        commentName.map((val, ind) => {
                            return (
                                <p key={ind}>  <span> <Link to={`/${val.commentedByID}`}> {val.commentedBy} </Link> - </span> {val.comment}  </p>
                            )
                        })
                    } */}

                </CardContent>
            </Collapse>
        </Card>
    );
}
