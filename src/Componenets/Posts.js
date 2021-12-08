import React from "react";
import { auth, db, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDoc, doc  } from "firebase/firestore";
import { useState } from "react";
// import Card from "./Card";
export default function Posts() {
  const [description, setDescription] = useState("");

  const show = () => {
    const user = auth.currentUser;
    console.log(user.email);
    const docRef = doc(db, "users", user.email);
    const docSnap =  getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const post = () => {
    const user = auth.currentUser;
    const img = document.getElementById("img").files[0];
    const storageRef = ref(storage, `${user.email}/posts/post1`);
    uploadBytes(storageRef, img).then((snapshot) => {
      getDownloadURL(ref(storage, `${user.email}/posts/post1`))
        .then((url) => {
          addDoc(collection(db, `users/${user.email}/posts`), {
            description: description,
            img: url,
          });

          alert("Post uploaded Successfully!");
        })
        .catch((error) => {
          alert(error);
        });
    });
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
      <input type="button" value="POST" onClick={post} />
      <input type="button" value="show" onClick={show} />

      {/* <Card /> */}
    </>
  );
}
