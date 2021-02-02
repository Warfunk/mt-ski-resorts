const SaveAndReset = ({ onSave, dispatch }) => {
  return (
    <div className="btm">
      {" "}
      <button
        onClick={onSave}
        className="f6 grow no-underline br-pill ba bw1 ph3 mb2 dib"
      >
        Save
      </button>
      <button
        onClick={() =>
          dispatch({ type: "SET_RESORT_COMPARE", resort: "reset" })
        }
        className="f6 grow no-underline br-pill ba bw1 ph3 mb2 dib"
      >
        Reset All
      </button>
    </div>
  );
};

export default SaveAndReset;
