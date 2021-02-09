const Welcome = ({ route, showResorts, dispatch }) => {
  return (
    <div className='welcome'>
      <h1>Welcome to THE Montana Ski Area Website!</h1>
      {(route === 'home' || route === 'nonuser') && (
        <button
          onClick={() => dispatch({ type: 'TOGGLE_RESORTS' })}
          className='f6 grow no-underline br-pill ba bw1 ph3 mb2 dib show'
        >
          {showResorts ? 'Hide Resort List' : 'Show Resort List'}
        </button>
      )}
    </div>
  );
};

export default Welcome;
