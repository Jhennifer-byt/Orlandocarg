import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Importa tus reducers aquí

const store = configureStore({
  reducer: rootReducer,
});

export default store;
