import React from 'react'

function Posts(props) {
  // console.log(props.img);
  return (
    <>
      <h1> {props.description} </h1>
      <img src={props.img} alt="post" />
    </>
  )
}

export default Posts
