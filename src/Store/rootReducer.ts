import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/Store/user/user-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
