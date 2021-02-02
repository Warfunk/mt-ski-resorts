const reducer = (state, action) => {
  switch (action.type) {
    case 'ROUTE_CHANGE': {
      if (action.route === 'signin' || action.route === 'register') {
        return {
          ...state,
          id: '',
          showResorts: false,
          resortCompare: [],
          isSignedIn: false,
          route: action.route,
        };
      }
      if (action.route === 'home') {
        return {
          ...state,
          isSignedIn: true,
          route: action.route,
        };
      }
      if (action.route === 'nonuser') {
        return {
          ...state,
          resortCompare: [],
          showResorts: true,
          isSignedIn: false,
          id: '',
          route: action.route,
        };
      }
      break;
    }
    case 'TOGGLE_RESORTS': {
      if (state.showResorts) {
        return {
          ...state,
          showResorts: false,
        };
      } else {
        return {
          ...state,
          showResorts: true,
        };
      }
    }
    case 'SET_RESORT_COMPARE': {
      if (action.resort === 'reset') {
        return {
          ...state,
          resortCompare: [],
        };
      }
      if (!state.resortCompare.includes(action.resort)) {
        return {
          ...state,
          resortCompare: [...state.resortCompare, action.resort],
        };
      }
      break;
    }
    case 'LOAD_USER': {
      return {
        ...state,
        resortCompare: action.data.resorts,
        showResorts: action.data.showresorts,
        id: action.data.id,
      };
    }
    default:
      return state;
  }
};

export default reducer;
