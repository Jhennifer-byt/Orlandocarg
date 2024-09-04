import { combineReducers } from '@reduxjs/toolkit';
import guiaReducer from './guiaSlice'; // El archivo del reducer que creaste

const rootReducer = combineReducers({
  guia: guiaReducer,
});

export default rootReducer;
