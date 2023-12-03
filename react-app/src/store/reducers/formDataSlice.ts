import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'Man' | 'Woman';
  terms: boolean;
}

const initialState: FormData[] = [];

export const querySlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormData>) {
      state.push(action.payload);
    },
  },
});

export default querySlice.reducer;
