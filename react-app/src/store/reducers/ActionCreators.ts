import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk("/", async (_, thunkApi) => {
  try {
    const response = "as";
    return response;
  } catch {
    return thunkApi.rejectWithValue("1asd");
  }
});
