import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist specific reducers (e.g., "auth")
};

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer
  
});

export default persistReducer(persistConfig, rootReducer);

