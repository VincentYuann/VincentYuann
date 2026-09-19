import React from 'react';
import { Toaster } from 'sonner';
import { useTheme } from '../context/ThemeContext';

export const ThemedToaster: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      theme={theme === 'night' ? 'dark' : 'light'}
      gap={10}
      offset={24}
      toastOptions={{
        duration: 4000,
        className: 'font-sans text-xs border rounded-xl',
      }}
      richColors
    />
  );
};
