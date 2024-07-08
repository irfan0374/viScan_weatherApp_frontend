import React from "react";
import { Navigate } from "react-router-dom";

const UserPublic = (props) => {
  try {
    const token = localStorage.getItem("usertoken");
    if (token) {
      return <Navigate to="/weather" />;
    } else {
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
    return null; // Handle error gracefully
  }
};

export default UserPublic;
