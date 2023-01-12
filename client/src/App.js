import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import HomePage from "views/homepage"
import LoginPage from "views/login";
import UserProfile from "views/userprofile";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthenticated = Boolean(useSelector((state) => state.token));
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}/>
            <Route path="/profile/:userId" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
