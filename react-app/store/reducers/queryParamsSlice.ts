import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QueryParams } from '../../types/types';
import { DEFAULT_LIMIT } from '../../components/constants';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: QueryParams = {
  search: null,
  limit: DEFAULT_LIMIT,
  page: '1',
};

export const querySlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setQueryParams(state, action: PayloadAction<QueryParams>) {
      state.page = action.payload.page;
      state.search = action.payload.search;
      state.limit = action.payload.limit;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.queryParams,
      };
    },
  },
});

export const { setQueryParams } = querySlice.actions;
export default querySlice.reducer;
