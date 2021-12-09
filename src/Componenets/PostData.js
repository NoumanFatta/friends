import React from "react";
import { db } from "../firebase-config";
import { collection, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import Newsfeed from './Newsfeed';

import { query, onSnapshot } from "firebase/firestore";

function PostData() {
    const [data, setdata] = useState([])
    const show = () => {

        const q = query(collection(db, "posts"), orderBy("postedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    setdata(data => [...data, change.doc.data()]);
                }
                if (change.type === "removed") {
                    setdata(data => [...data, change.doc.data()]);
                }
            });
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
                        <Newsfeed img={val.img} key={ind} description={val.description} />
                    )
                })
            }
        </>
    )
}
export default PostData;