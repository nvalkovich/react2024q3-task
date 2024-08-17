import { createSlice } from '@reduxjs/toolkit';
import { supportedThemes } from '../../services/theme/types';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: supportedThemes.light,
  },
  reducers: {
    setThemeValue(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setThemeValue } = themeSlice.actions;

export default themeSlice.reducer;
