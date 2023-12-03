import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../../models/counties';

const initialState: string[] = countries;

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
