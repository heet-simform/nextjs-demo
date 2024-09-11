import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  id: string | null;
  username: string;
};

const initialState: userState = {
  id: null,
  username: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<userState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
  },
});

export const { updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
