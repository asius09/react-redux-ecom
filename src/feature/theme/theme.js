import { createSlice } from "@reduxjs/toolkit";
const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "dark",
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice;
