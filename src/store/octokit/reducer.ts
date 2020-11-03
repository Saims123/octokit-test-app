export const initialState = {
  access_token: localStorage.getItem("access_token")
};

export const reducer = (state: any, action: { type: any; payload: { isLoggedIn: any; user: any; access_token: string }; }) => {

  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("access_token", JSON.stringify(action.payload.access_token))
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        access_token: action.payload.access_token
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