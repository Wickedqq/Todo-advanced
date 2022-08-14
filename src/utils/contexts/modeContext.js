import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { changeTheme } from '..//..//theme';

export const ThemeContext = createContext();

export const useTheming = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider = (props) => {
  const [mode, setMode] = useState(window.localStorage.getItem('mode') || 'light');

  const saveCurrentMode = (mode) => {
    window.localStorage.setItem('mode', mode);
    const currMode = window.localStorage.getItem('mode');
    setMode(currMode);
  };

  const theme = useMemo(() => createTheme(changeTheme(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, saveCurrentMode }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
