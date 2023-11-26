import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface searchState {
  searchString: string;
}

const initialState: searchState = {
  // searchString: localStorage.getItem('search') || '',
  searchString: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchString(state, action: PayloadAction<searchState>) {
      state.searchString = action.payload.searchString;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.search,
      };
    },
  },
});

export default searchSlice.reducer;
