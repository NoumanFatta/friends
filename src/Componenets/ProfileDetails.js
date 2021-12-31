import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserDetails } from './Profile';
import Cards from './Cards';
import { db } from '../firebase-config';
import CircularProgress from '@mui/material/CircularProgress';
import { onSnapshot, collection, where, query,orderBy } from 'firebase/firestore';
import AddPostButton from './AddPostButton';
import { useSelector } from 'react-redux';

function ProfileDetails() {
    const userDetails = useContext(UserDetails);
    const [postData, setPostData] = useState(['loading']);
    const [isAdmin, setIsAdmin] = useState(false);
    const currentUserDetails = useSelector(state => state.user.user);
    
    useEffect(
        () => {
            if (userDetails.uid) {
                const q = query(collection(db, 'posts'), where('postedBy', '==', userDetails.uid), orderBy('postedOn', 'desc'))
                const unsub = onSnapshot(q, (snapshot) =>
                    setPostData(snapshot.docs.map((doc) => doc.data()))
                );
                if ((userDetails.uid && currentUserDetails?.uid) && userDetails.uid === currentUserDetails?.uid) setIsAdmin(true);
                else setIsAdmin(false);
                return unsub;
            }
        }, [userDetails, currentUserDetails?.uid]);
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
                <Avatar sx={{ width: 250, height: 250 }} style={{ cursor: 'pointer' }} alt="user profile" src={userDetails.img} />
               {userDetails?.firstName && <h1>{`${userDetails.firstName} ${userDetails.lastName}`}</h1> }

                {isAdmin ? <AddPostButton /> : null}
                {postData[0] === 'loading' ?
                    <CircularProgress style={{ height: '100px', width: '100px', marginTop: '100px', color: '#1976d2' }} />
                    : postData.map((val, ind) => (
                        <div key={ind} style={{ marginTop: '30px' }} >
                            <Cards postdata={val} />
                        </div>
                    ))}

            </div>
        </>
    )
}

export default ProfileDetails
