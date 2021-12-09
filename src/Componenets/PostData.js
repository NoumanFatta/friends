import React from "react";
import { db } from "../firebase-config";
import { collection, getDocs, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import PostCard from './PostCard';
function PostData() {
    const [data, setdata] = useState([])
    const show = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            // setdata(arr => [...arr, doc.data().img]);
            setdata(data => [...data, doc.data()]);
        });
    }
    useEffect(() => {
        show();
    }, [])

    return (
        <>
            {
                data.map((val, ind) => {
                    return (
                        <PostCard img={val.img} key={ind} description = {val.description} />
                    )
                })
            }
        </>
    )
}
export default PostData;