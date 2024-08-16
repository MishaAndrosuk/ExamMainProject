import React, { useEffect, useState } from "react";
import {
    AppBar,
    Button,
    Grid,
    Menu,
    MenuItem,
    Typography,
    Avatar,
    Select,
    FormControl,
    InputLabel,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { btnPageStyle } from "./style";
import { Link, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountBoxIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { toast } from "react-toastify";
import logo from "./images/logo.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { isAuth, user } = useSelector((state) => state.authReducer);
    const { theme } = useSelector((state) => state.themingReducer);
    const { logout, setTheme } = useAction();
    const navigate = useNavigate();
    const isAuthSuccess = localStorage.getItem("isAuthSuccess")


    const { t, i18n } = useTranslation();

    const pages = [{ id: "1", title: t("mainpage"), url: "/" }];

    const logoutHandler = () => {
        handleCloseUserMenu();
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthSuccess");
        logout();
        navigate("signin");
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const changeTheme = () => {
        const value = theme === "light" ? "dark" : "light";
        setTheme(value);
        toast.success(`${value} theme`);
    };

    const handleLanguageChange = (event) => {
        const language = event.target.value;
        i18n.changeLanguage(language);
        toast.success(`${t("languageChange")} ${language}`);
    };

    useEffect(() => {
        const themeLocal = localStorage.getItem("theme");
        if (themeLocal != null && themeLocal !== theme) {
            setTheme(themeLocal);
        }
    }, [theme, setTheme]);

    return (
        <AppBar position="static">
            <Grid container alignItems="center" sx={{ height: "100px" }}>
                <Grid
                    item
                    xs={2}
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                >
                    <IconButton
                        size="large"
                        aria-label="menu"
                        onClick={() => navigate("/")}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid
                    item
                    xs={7}
                    md={2}
                    sx={{
                        justifyContent: { xs: "start", md: "center" },
                        display: { xs: "flex", md: "block" },
                        paddingLeft: { md: 7 },
                    }}
                >
                    <Link to="/">
                        <img width={80} height={80} src={logo} alt="Logo" />
                    </Link>
                </Grid>
                <Grid
                    item
                    xs={7}
                    md={7}
                    sx={{
                        justifyContent: "space-evenly",
                        display: { xs: "none", md: "flex" },
                    }}
                >
                    {pages.map((page) => (
                        <Link key={page.id} to={page.url}>
                            <Button sx={btnPageStyle}>{page.title}</Button>
                        </Link>
                    ))}
                </Grid>
                <Grid item container xs={3} md={3} sx={{ textAlign: "end", pr: 3, display: 'flex', alignItems: 'center' }}>
                    <Grid item sx={{ mr: 1 }}>
                        <IconButton onClick={changeTheme} color="inherit">
                            {theme === "dark" ? (
                                <Brightness7Icon />
                            ) : (
                                <Brightness4Icon />
                            )}
                        </IconButton>
                    </Grid>
                    <Grid item sx={{ mr: 2 }}>
                        <FormControl variant="outlined" sx={{ minWidth: 100 }}>
                            <InputLabel id="language-select-label">
                                {t('language')}
                            </InputLabel>
                            <Select
                                labelId="language-select-label"
                                id="language-select"
                                value={i18n.language}
                                onChange={handleLanguageChange}
                                label={t('language')}
                            >
                                <MenuItem value="en">En</MenuItem>
                                <MenuItem value="ua">Ua</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        {!isAuthSuccess ? (
                            <>
                                <Link to="/signin">
                                    <Button sx={{ color: "white", ml: 2 }}>
                                        {t("signin")}
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button sx={{ color: "white", ml: 2 }}>
                                        {t("signup")}
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    sx={{ p: 0, ml: 2 }}
                                    onClick={handleOpenUserMenu}
                                >
                                    {isAuth ? (
                                        <Avatar alt="Avatar" src={user.picture} />
                                    ) : (
                                        <Avatar>
                                            <AccountBoxIcon />
                                        </Avatar>
                                    )}
                                </IconButton>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Link to="/profile">
                                            <Typography textAlign="center">
                                                {t("profile")}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={logoutHandler}>
                                        <Typography textAlign="center">
                                            {t("logout")}
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Navbar;
