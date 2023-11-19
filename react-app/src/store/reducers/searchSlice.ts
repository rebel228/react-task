import { createSlice } from "@reduxjs/toolkit";

interface searchState {
  searchString: string;
}

const initialState: searchState = {
  searchString: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
});

export default searchSlice.reducer;
