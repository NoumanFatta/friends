import React from "react";
import { db } from "../firebase-config";
import { collection, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import Newsfeed from "./Newsfeed";

import { query, onSnapshot } from "firebase/firestore";

function PostData() {
  const [data, setdata] = useState([]);
  const show = () => {
    const q = query(collection(db, "posts"), orderBy("postedOn", "desc"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setdata((prevdata) => [...prevdata, change.doc.data()]);
        }
      });
    });
  };
  useEffect(() => {
    show();
  }, []);

  return (
    <>
      {data.map((val, ind) => {
        return (
          <Newsfeed
            img={val.img}
            usrename={val.username}
            key={ind}
            description={val.description}
            userdp={val.dp}
          />
        );
      })}
    </>
  );
}
export default PostData;
