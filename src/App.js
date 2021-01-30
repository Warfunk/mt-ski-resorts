import { useState, useReducer, useMemo } from 'react';

import SaveAndReset from './forecastCompare/SaveAndReset';
import Welcome from './Welcome';
import ResortList from './Resorts/ResortList';
import Navigation from './SignInRegister/Navigation';
import Fields from './SignInRegister/Fields';
import CompareSnow from './forecastCompare/CompareSnow';

const initialState = {
  isSignedIn: false,
  route: 'nonuser',
  showResorts: true,
  resortCompare: [],
  id: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ROUTE_CHANGE': {
      if (route === 'signin' || route === 'register') {
        return {
          ...state,
          id: '',
          isSignedIn: true,
          route: action.route,
        };
      }
      if (route === 'home') {
        return {
          ...state,
          isSignedIn: true,
          route: action.route,
        };
      }
      if (route === 'nonuser') {
        return {
          ...state,
          resortCompare: [],
          showResorts: true,
          isSignedIn: false,
          id: '',
          route: action.route,
        };
      }
    }
    default:
      return state;
  }
};

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // then you would use it like this:
  // dispatch({ type: 'ROUTE_CHANGE', route: newRoute });
  // I'm not going to change everything out for the sake of time
  // Honestly most juniors won't know how to use useReducer, but it's good to practice and get use to it
  // there are a lot of patterns outside of React that will be similar
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState('nonuser');
  const [showResorts, setShowResorts] = useState(true);
  const [resortCompare, setResortCompare] = useState([]);
  const [id, setId] = useState('');

  const onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      setId('');
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    } else if (route === 'nonuser') {
      setResortCompare([]);
      setShowResorts(true);
      setIsSignedIn(false);
      setId('');
    }
    setRoute(route);
  };

  const handleClick = (resort) => {
    if (!resortCompare.includes(resort.id)) {
      setResortCompare([...resortCompare, resort.id]);
    }
  };

  const hideResorts = () => {
    // when state is based on the current state, you the callback method like below to set it
    setShowResorts((s) => !s);
  };

  const loadUser = (data) => {
    setResortCompare(data.resorts);
    setShowResorts(data.showresorts);
    setId(data.id);
  };

  const onSave = () => {
    fetch('https://calm-crag-40780.herokuapp.com/save', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        resorts: resortCompare,
        showResorts: showResorts,
      }),
    }).catch(console.log);
  };

  const saveUi = useMemo(() => {
    if (route === 'nonuser') {
      return (
        <h3 onClick={() => onRouteChange('signin')} className="btm">
          Sign In to Save Resorts
        </h3>
      );
    }
    if (route === 'home') {
      return (
        <SaveAndReset onSave={onSave} setResortCompare={setResortCompare} />
      );
    }
    return null;
  }, [route, onSave, setResortCompare, onRouteChange]);

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Welcome
        route={route}
        showResorts={showResorts}
        hideResorts={hideResorts}
      />
      {route === 'signin' || route === 'register' ? (
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
          ) : null}
          <CompareSnow snow={resortCompare} />
        </div>
      )}
      {saveUi}
    </div>
  );
};

export { App };
