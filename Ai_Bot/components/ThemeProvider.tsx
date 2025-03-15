import React, { createContext, useContext, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext<ThemeType>('light');

interface ThemeProviderProps {
  children: ReactNode;
  value: ThemeType;
}


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, value }) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeType => {
  return useContext(ThemeContext);
}; 