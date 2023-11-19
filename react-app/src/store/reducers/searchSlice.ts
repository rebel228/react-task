import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface searchState {
  searchString: string;
}

const initialState: searchState = {
  searchString: localStorage.getItem("search") || "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchString(state, action: PayloadAction<searchState>) {
      state.searchString = action.payload.searchString;
    },
  },
});

export default searchSlice.reducer;
