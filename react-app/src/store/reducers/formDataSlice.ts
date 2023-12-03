import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserFormData } from '../../types/types';

const initialState: UserFormData[] = [];

export const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<UserFormData>) {
      state.push(action.payload);
    },
  },
});

export default formSlice.reducer;
