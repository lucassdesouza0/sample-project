/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Users } from "@/app/types/users";

const initialState: Users[] = [];

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<Users>) => {
      action.payload.id = state.length + 2;
      state.push(action.payload);
    },
    load: (state, action: PayloadAction<Users[]>) => {
      return (state = action.payload);
    },
    decrement: (state) => {
      state = state;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     });
  // },
});
