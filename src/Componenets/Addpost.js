import React from "react";
import { auth, db, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import uuid from 'react-uuid';
// import Card from "./Card";
export default function Posts() {
  const [description, setDescription] = useState("");
  const [uid, setuid] = useState("");
  // const show = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }

  // useEffect(() => {
  //   show();
  // }, [])

  const post = () => {
    setuid(uuid());
    const user = auth.currentUser;
    const img = document.getElementById("img").files[0];
    if (img) {
      const storageRef = ref(storage, `${user.email}/posts/${uid}`);
      uploadBytes(storageRef, img).then((snapshot) => {
        getDownloadURL(ref(storage, `${user.email}/posts/${uid}`))
          .then((url) => {
            addDoc(collection(db, `posts`), {
              description: description,
              img: url,
              postedBy: user.email
            });
            alert("Post uploaded Successfully!");
          })
          .catch((error) => {
            alert(error);
          });
      });
    } else {
      addDoc(collection(db, `posts`), {
        description: description,
        postedBy: user.email
      }).then(() => {
        alert("Pst added successfully!")
      })
        .catch((error) => {
          alert(error)
        });
    }
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input type="file" accept="image/*" id="img" />
      <br />
      <br />
      <input type="button" value="POST" onClick={post} />
      {/* <Card /> */}
    </>
  );
}
