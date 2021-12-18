import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import PostData from './PostData';
import { ProfileName,ProfileImage } from './Profile';


function ProfileDetails() {
 const name = useContext(ProfileName);
 const image = useContext(ProfileImage);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
                <Avatar sx={{ width: 250, height: 250 }} style={{ cursor: 'pointer' }} alt="Remy Sharp" src={image} />
                <h1>{name}</h1>
                {/* <PostData /> */}
            </div>
        </>
    )
}

export default ProfileDetails
