import React, { useState } from "react";
import PropTypes from "prop-types";

const jwtParser = (token) => {
  try {
    const result = JSON.parse(atob(token.split(".")[1]));
    return result;
  } catch (error) {
    return null;
  }
};

export default function TokenExpiredVerify({ history, logOut }) {
  history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const decodedJwt = jwtParser(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  });

  return <></>;
}

TokenExpiredVerify.propTypes = {
  history: PropTypes.func,
  logOut: PropTypes.func,
};
