import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
// import { dogApiSlice } from "../features/dogs/dogs-api-slice";
import taskManagementSlice from "../features/taskManagement/taskManagementSlice";
import planSlice from "../features/plan/planSlice";

// configureStore automatically calls the combineReducers function

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    taskManagement: taskManagementSlice,
    treatmentPlans: planSlice,
    // [dogApiSlice.reducerPath]: dogApiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(dogApiSlice.middleware);
  // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
