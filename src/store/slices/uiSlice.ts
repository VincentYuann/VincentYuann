import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isCommandOpen: boolean;
  isProfileOpen: boolean;
  isSettingsOpen: boolean;
  activeSection: string;
}

const initialState: UiState = {
  isCommandOpen: false,
  isProfileOpen: false,
  isSettingsOpen: false,
  activeSection: 'home',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCommandOpen: (state, action: PayloadAction<boolean>) => {
      state.isCommandOpen = action.payload;
    },
    setProfileOpen: (state, action: PayloadAction<boolean>) => {
      state.isProfileOpen = action.payload;
    },
    setSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingsOpen = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    closeAllModals: (state) => {
      state.isCommandOpen = false;
      state.isProfileOpen = false;
      state.isSettingsOpen = false;
    },
  },
});

export const {
  setCommandOpen,
  setProfileOpen,
  setSettingsOpen,
  setActiveSection,
  closeAllModals,
} = uiSlice.actions;

export default uiSlice.reducer;
