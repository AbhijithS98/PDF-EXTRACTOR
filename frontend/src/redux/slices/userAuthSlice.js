import { createSlice } from '@reduxjs/toolkit';


const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
      userId: null,
      name: null,
      email: null,
      isAuthenticated: false,  
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.userId = null;
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  }
});


export const { setCredentials, clearCredentials } = userAuthSlice.actions;
export default userAuthSlice.reducer;