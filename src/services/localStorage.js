export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {}
};

export const setUserDataLocal = async (u) => {
  // debugger;
  // actual param
  // user={
  //   uid:,
  //   displayName:,
  //   email
  // }
  let user = {
    uid: u.uid,
    name: u.displayName,
    email: u.email,
  };
  localStorage.setItem("user-datas", JSON.stringify(user));
};

export const getUserDataLocal = () => {
  let user = localStorage.getItem("user-datas");
  return JSON.parse(user);
};

export const clearLS = () => {
  localStorage.setItem("user-datas", null);
  localStorage.setItem("state", undefined);
};
