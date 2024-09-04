import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bultos: [],
  precioFinal: 0,
};

const guiaSlice = createSlice({
  name: 'guia',
  initialState,
  reducers: {
    addBulto: (state, action) => {
      state.bultos.push(action.payload);
    },
    setPrecioFinal: (state, action) => {
      state.precioFinal = action.payload;
    },
    resetCalculadora: (state) => {
      state.bultos = [];
      state.precioFinal = 0;
    },
  },
});

export const { addBulto, setPrecioFinal, resetCalculadora } = guiaSlice.actions;
export default guiaSlice.reducer;
