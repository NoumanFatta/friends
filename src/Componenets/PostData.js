import React, { useContext } from "react";
import { db } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Newsfeed from "./Newsfeed";
import CircularProgress from '@mui/material/CircularProgress';
import { ID } from './Home'
function PostData() {
  const [data, setData] = useState(['loading']);
  const uid = useContext(ID)
  useEffect(() => {
    if (uid) {
      onSnapshot(collection(db, 'users', uid, "posts"), (snapshot) => {
        setData(snapshot.docs.map((doc) => doc.data()))
      })
    }
  }, [uid]);


  return (
    <>
      {data[0] === 'loading' ?
        <CircularProgress style={{ height: '250px', width: '250px', marginTop: '100px' }} color="secondary" />
        : data.map((val, ind) => {
          return (
            <Newsfeed
              img={val.img}
              key={ind}
              description={val.description}
              date={val.postedOn.toDate().toDateString()}
              time={val.postedOn.toDate().toLocaleTimeString()}
            />
          );
        })}


    </>
  );
}
export default PostData;
