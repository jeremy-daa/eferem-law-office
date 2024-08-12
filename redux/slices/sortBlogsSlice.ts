import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SortBlogsByNewestState {
    value: boolean;
}

const initialState: SortBlogsByNewestState = {
    value: true,
};

export const sortBlogsSlice = createSlice({
    name: "sortBlogs",
    initialState,
    reducers: {
        setSortBlogsByNewest: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { setSortBlogsByNewest } = sortBlogsSlice.actions;

export const selectSortBlogsByNewest = (state: RootState) => state.sortBlogs.value;

export default sortBlogsSlice.reducer;