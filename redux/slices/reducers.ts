import { combineReducers } from "@reduxjs/toolkit";
import sortBlogsReducer from "./sortBlogsSlice";

export const rootReducer = combineReducers({
  sortBlogs: sortBlogsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
