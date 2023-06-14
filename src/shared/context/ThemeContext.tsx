import React, { createContext, useCallback, useContext, useMemo, useState} from "react";
import { Box, ThemeProvider } from "@mui/material";
import { DarkTheme } from "../themes/Dark";
import { LightTheme } from "../themes/Light";

interface IThemeContextData {
  themeName: 'light' | 'dark',
  toggleTheme: () => void,
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}


export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark' >('light');
  
  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  },[]);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100w" height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}