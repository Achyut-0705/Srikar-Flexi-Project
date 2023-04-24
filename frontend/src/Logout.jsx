// import React from "react";

function Logout() {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
    window.location = "/";
  }
}

export default Logout;
