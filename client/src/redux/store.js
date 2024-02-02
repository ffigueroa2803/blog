import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./services/apiSlice";
import userSliceReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    // Agrega el reductor generado como un segmento específico de nivel superior
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSliceReducer,
  },
  // Agregar el middleware de API permite el almacenamiento en caché, la invalidación, el sondeo,
  // y otras funciones útiles de `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// opcional, pero obligatorio para los comportamientos refetchOnFocus/refetchOnReconnect
// ver documentos `setupListeners` - toma una devolución de llamada opcional como segundo argumento para la personalización
setupListeners(store.dispatch);
