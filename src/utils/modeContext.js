import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { changeTheme } from '../theme';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme(changeTheme(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
