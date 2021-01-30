import { useState, React } from "react";

import SaveAndReset from "./forecastCompare/SaveAndReset";
import Welcome from "./Welcome";
import ResortList from "./Resorts/ResortList";
import Navigation from "./SignInRegister/Navigation";
import Fields from "./SignInRegister/Fields";
import CompareSnow from "./forecastCompare/CompareSnow";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState("nonuser");
  const [showResorts, setShowResorts] = useState(true);
  const [resortCompare, setResortCompare] = useState([]);
  const [id, setId] = useState("");

  const onRouteChange = (route) => {
    if (route === "signin" || route === "register") {
      setId("");
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    } else if (route === "nonuser") {
      setResortCompare([]);
      setShowResorts(true);
      setIsSignedIn(false);
      setId("");
    }
    setRoute(route);
  };

  const handleClick = (resort) => {
    if (!resortCompare.includes(resort.id)) {
      setResortCompare([...resortCompare, resort.id]);
    }
  };

  const hideResorts = () => {
    if (showResorts) {
      setShowResorts(false);
    } else {
      setShowResorts(true);
    }
  };

  const loadUser = (data) => {
    setResortCompare(data.resorts);
    setShowResorts(data.showresorts);
    setId(data.id);
  };

  const onSave = () => {
    fetch("https://calm-crag-40780.herokuapp.com/save", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        resorts: resortCompare,
        showResorts: showResorts,
      }),
    }).catch(console.log);
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Welcome
        route={route}
        showResorts={showResorts}
        hideResorts={hideResorts}
      />
      {route === "signin" || route === "register" ? (
        <Fields
          route={route}
          loadUser={loadUser}
          onRouteChange={onRouteChange}
        />
      ) : (
        <div>
          {showResorts ? (
            <ResortList
              handleClick={handleClick}
              resortCompare={resortCompare}
            />
          ) : (
            <></>
          )}
          <CompareSnow snow={resortCompare} />
        </div>
      )}
      {route === "nonuser" ? (
        <h3 onClick={() => onRouteChange("signin")} className="btm">
          Sign In to Save Resorts
        </h3>
      ) : route === "home" ? (
        <SaveAndReset onSave={onSave} setResortCompare={setResortCompare} />
      ) : (
        <></>
      )}
    </div>
  );
};

export { App };
