const Welcome = ({ hideResorts, route, showResorts }) => {
  return (
    <div>
      <h1>Welcome to THE Montana Ski Area Website!</h1>
      {route === "home" || route === "nonuser" ? (
        <button
          onClick={hideResorts}
          className="f6 grow no-underline br-pill ba bw1 ph3 mb2 dib show"
        >
          {showResorts ? "Hide Resort List" : "Show Resort List"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Welcome;
