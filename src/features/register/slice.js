import { createSlice } from "@reduxjs/toolkit";

const register = createSlice({
  name: "register",
  initialState: { firstname: "", lastname:"",email: "test@gmail.com", password: "secret", passwordConfirm: "" },
  reducers: {
    updateVal(state, { payload: { val, key } }) {
      state[key] = val;
    },
  },
});

export const { updateVal } = register.actions;
export default register.reducer;
