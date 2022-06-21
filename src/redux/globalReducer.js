import ActionType from "./globalActionType";

const globalState = {
  userData: {
    uid: "",
    email: "",
    name: "",
  },
  countFromRedux: 0,
};

//Reducer
const rootReducer = (state = globalState, action) => {
  switch (action.type) {
    case ActionType.SET_USERDATA:
      return {
        ...state,
        userData: {
          uid: action.data.userData.uid,
          email: action.data.userData.email,
          name: action.data.userData.name,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
