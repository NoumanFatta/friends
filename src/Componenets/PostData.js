import React from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Newsfeed from './Newsfeed';
function PostData() {
    const [data, setdata] = useState([])
    const show = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
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
                        <Newsfeed img={val.img} key={ind} description = {val.description} />
                    )
                })
            }
        </>
    )
}
export default PostData;