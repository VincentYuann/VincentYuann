import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const initialMode = getInitialTheme();

// Apply initial class on document
if (typeof document !== 'undefined') {
  if (initialMode === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
}

const initialState: ThemeState = {
  mode: initialMode,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-theme', action.payload);
        if (action.payload === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }
    },
    toggleTheme: (state) => {
      const nextMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = nextMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-theme', nextMode);
        if (nextMode === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
        }
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
