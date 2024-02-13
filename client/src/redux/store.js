import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./services/apiSlice";
import userSliceReducer from "./features/user/userSlice";
import authSliceReducer from "./features/auth/authSlice";
import themeSliceReducer from "./features/theme/themeSlice";

const rootReducer = combineReducers({
  // Agrega el reductor generado como un segmento específico de nivel superior
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userSliceReducer,
  auth: authSliceReducer,
  theme: themeSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Agregar el middleware de API permite el almacenamiento en caché, la invalidación, el sondeo,
  // y otras funciones útiles de `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

export const persistor = persistStore(store);

// opcional, pero obligatorio para los comportamientos refetchOnFocus/refetchOnReconnect
// ver documentos `setupListeners` - toma una devolución de llamada opcional como segundo argumento para la personalización
setupListeners(store.dispatch);
