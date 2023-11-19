import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QueryParams } from "../../types";
import { DEFAULT_LIMIT } from "../../constants";

const initialState: QueryParams = {
  search: undefined,
  limit: DEFAULT_LIMIT,
  page: "1",
};

export const querySlice = createSlice({
  name: "queryParams",
  initialState,
  reducers: {
    setQueryParams(state, action: PayloadAction<QueryParams>) {
      state.page = action.payload.page;
      state.search = action.payload.search;
      state.limit = action.payload.limit;
    },
  },
});

export default querySlice.reducer;
