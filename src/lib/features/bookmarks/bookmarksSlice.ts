import { Bookmark } from "@/app/Modal";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarksState {
	bookmarks: Bookmark[];
}

const initialState: BookmarksState = {
	bookmarks: [],
};

export const bookmarksSlice = createSlice({
	name: "bookmarks",
	initialState,
	reducers: {
		addBookmark: (state, action: PayloadAction<Bookmark>) => {
			state.bookmarks.push(action.payload);
		},
		deleteBookmark: (state, action: PayloadAction<string>) => {
			state.bookmarks = state.bookmarks.filter(
				(bookmark) => bookmark.id !== action.payload
			);
		},
		editBookmark: (state, action: PayloadAction<Bookmark>) => {
			const index = state.bookmarks.findIndex(
				(bookmark) => bookmark.id === action.payload.id
			);
			if (index === -1) return;

			state.bookmarks[index] = { ...action.payload };
		},
	},
});

export const { addBookmark } = bookmarksSlice.actions;
export const { deleteBookmark } = bookmarksSlice.actions;
export const { editBookmark } = bookmarksSlice.actions;
export const selectBookmarks = (state: { bookmarks: BookmarksState }) =>
	state.bookmarks.bookmarks;

export default bookmarksSlice.reducer;
