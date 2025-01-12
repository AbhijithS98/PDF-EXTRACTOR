import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem("userInfo") ?
  JSON.parse(localStorage.getItem("userInfo")) : null
}

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setToken: (state, action) => {
      if (state.userInfo) {
        state.userInfo.token = action.payload;
        localStorage.setItem("userInfo", JSON.stringify({ ...state.userInfo, token: action.payload }));
      }
    }
  }
});


export const { setCredentials, clearCredentials, setToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;