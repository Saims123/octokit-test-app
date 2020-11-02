export const initialState = {
  isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user") || "" ) || null,
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  client_secret: process.env.REACT_APP_CLIENT_SECRET
};

export const reducer = (state: any, action: { type: any; payload: { isLoggedIn: any; user: any; }; }) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      console.log(action.payload.isLoggedIn)
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      };
    }
    case "LOGOUT": {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    default:
      return state;
  }
};