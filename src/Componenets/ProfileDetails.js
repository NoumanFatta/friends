import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserDetails } from './Profile';
import Cards from './Cards';
import { db } from '../firebase-config';
import { onSnapshot, collection, where, query } from 'firebase/firestore'
function ProfileDetails() {
    const userDetails = useContext(UserDetails);
    const [postData, setPostData] = useState([])
    useEffect(() => {
        if (userDetails.uid) {
            onSnapshot(query(collection(db, 'posts'), where('postedBy', '==', userDetails.uid)), (snapshot) => {
                setPostData(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [userDetails]);
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
                <Avatar sx={{ width: 250, height: 250 }} style={{ cursor: 'pointer' }} alt="Remy Sharp" src={userDetails.img} />
                <h1>{userDetails.name}</h1>
               
                {postData.map((val,ind) => (
                    <div key = {ind} style={{ marginTop: '30px' }} >
                        <Cards postdata = {val} />
                    </div>
                ))}

            </div>
        </>
    )
}

export default ProfileDetails
