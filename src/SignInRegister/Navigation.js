import React from "react";
import "./Nav.css";

const Navigation = ({ isSignedIn, dispatch }) => {
  if (isSignedIn === true) {
    return (
      <nav className="nav">
        <p
          onClick={() => dispatch({ type: "ROUTE_CHANGE", route: "signin" })}
          className="fs link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <p
          onClick={() => dispatch({ type: "ROUTE_CHANGE", route: "signin" })}
          className="fs link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => dispatch({ type: "ROUTE_CHANGE", route: "register" })}
          className="fs link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
