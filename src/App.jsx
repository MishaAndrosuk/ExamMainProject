import React, { useEffect } from "react";
import MainPage from "./pages/mainPage/MainPage";
import NotFound from "./pages/notFound/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./theming/lightTheme";
import darkTheme from "./theming/darkTheme";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/auth/signIn/SignInPage";
import SignUpPage from "./pages/auth/signUp/SignUpPage";
import DefaultLayout from "./components/layout/DefaultLayout"
import ProfilePage from "./pages/profilePage/ProfilePage";
import NotePage from "./pages/note/NotePage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { useAction } from "./hooks/useAction";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css"

const App = () => {
    const clientId =
        "47235399203-5dbvs4krmn7oao0p2fk1102dpam9vgsb.apps.googleusercontent.com";
    const { theme } = useSelector((state) => state.themingReducer);
    const currentTheme = theme === "dark" ? darkTheme : lightTheme;

    const { signIn } = useAction();

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token != null) {
            signIn(token);
        }
    }, []);

    return (
        <ThemeProvider theme={currentTheme}>
            <GoogleOAuthProvider clientId={clientId}>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="note" element={<NotePage/>} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={true}
                    closeOnClick
                    rtl={false}
                    theme={theme === "light" ? "dark" : "light"}
                    pauseOnHover={false}
                />
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
};

export default App;