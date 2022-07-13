import ActionType from "./globalActionType";

const globalState = {
  detailNote: null,
  bgNotes: "#ba9c9c",
  countFromRedux: 0,
};

//Reducer
const rootReducer = (state = globalState, action) => {
  switch (action.type) {
    // case ActionType.SET_USERDATA:
    //   return {
    //     ...state,
    //     userDatas: {
    //       uid: action.data.userData.uid,
    //       email: action.data.userData.email,
    //       name: action.data.userData.name,
    //     },
    //   };
    case ActionType.SET_DETAIL_NOTE:
      return {
        ...state,
        detailNote: {
          id: action.data.id,
          data: {
            title: action.data.data.title,
            note: action.data.data.note,
            bg: action.data.data.bg,
          },
        },
      };
    // case ActionType.SET_BGNOTES:
    //   console.log("reducer SET_BGNOTES", action.data);
    //   return {
    //     ...state,
    //     bgNotes: action.data,
    //   };

    default:
      return state;
  }
};

export default rootReducer;
