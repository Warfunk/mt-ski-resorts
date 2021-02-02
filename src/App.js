import { useReducer, useMemo, useCallback } from 'react';

import SaveAndReset from './forecastCompare/SaveAndReset';
import Welcome from './Welcome';
import ResortList from './Resorts/ResortList';
import Navigation from './SignInRegister/Navigation';
import Fields from './SignInRegister/Fields';
import CompareSnow from './forecastCompare/CompareSnow';
import reducer from './reducer.js';

const initialState = {
  isSignedIn: false,
  route: 'nonuser',
  showResorts: true,
  resortCompare: [],
  id: '',
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSave = useCallback(() => {
    fetch('https://calm-crag-40780.herokuapp.com/save', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: state.id,
        resorts: state.resortCompare,
        showResorts: state.showResorts,
      }),
    }).catch(console.log);
  }, [state.id, state.resortCompare, state.showResorts]);

  const saveUi = useMemo(() => {
    if (state.route === 'nonuser') {
      return (
        <h3
          onClick={() => dispatch({ type: 'ROUTE_CHANGE', route: 'signin' })}
          className='btm'
        >
          Sign In to Save Resorts
        </h3>
      );
    }
    if (state.route === 'home') {
      return <SaveAndReset onSave={onSave} dispatch={dispatch} />;
    }
    return null;
  }, [state.route, dispatch, onSave]);

  return (
    <div className='App'>
      <Navigation isSignedIn={state.isSignedIn} dispatch={dispatch} />
      <Welcome
        route={state.route}
        showResorts={state.showResorts}
        dispatch={dispatch}
      />
      {state.route === 'register' || state.route === 'signin' ? (
        <Fields route={state.route} dispatch={dispatch} />
      ) : (
        <div>
          {state.showResorts ? <ResortList dispatch={dispatch} /> : null}
          <CompareSnow snow={state.resortCompare} />
        </div>
      )}
      {saveUi}
    </div>
  );
};

export { App };
