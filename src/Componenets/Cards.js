import React, { useContext, useState, useEffect } from 'react';
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
import { db } from "../firebase-config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

    useEffect(() => {
        const likes = props.postdata.likes
        setIsLiked(likes.includes(currentUserDetails.uid))
    }, [currentUserDetails?.uid, props.postdata.likes])
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
                <IconButton onClick={(e) => likePost(e)} aria-label="add to favorites">
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
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
