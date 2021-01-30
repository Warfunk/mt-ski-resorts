const SaveAndReset = ({ onSave, setResortCompare }) => {
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
        onClick={() => setResortCompare([])}
        className="f6 grow no-underline br-pill ba bw1 ph3 mb2 dib"
      >
        Reset All
      </button>
    </div>
  );
};

export default SaveAndReset;
