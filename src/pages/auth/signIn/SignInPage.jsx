import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useAction } from "../../../hooks/useAction";
import { useTranslation } from "react-i18next";


const SignInPage = () => {
    const { signIn } = useAction();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();


    const handleSubmit = (values) => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        
        if (values.email === storedEmail) {
            if (values.password === storedPassword) {
                localStorage.setItem("isAuthSuccess", "true")
                navigate("/");
            } else {
                setError("Невірний пароль");
            }
        } else {
            setError("Користувача не існує");
        }
    };

    const googleSuccessHandler = (credentials) => {
        const token = credentials.credential;
        signIn(token);
        const user = jwtDecode(token);
        localStorage.setItem("user", token);
        localStorage.setItem("isAuthSuccess", "true");
        localStorage.setItem("firstName", user.given_name);
        navigate("/");
    };

    const googleErrorHandler = () => {
        console.log("Google auth error");
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Пошта обов'язкова")
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Не вірний формат пошти"
            ),
        password: Yup.string()
            .required("Вкажіть пароль")
            .min(6, "Мінімальна довжина паролю 6 символів"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <Container component="main" maxWidth="xs" sx={{ mb: 6 }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "linear-gradient(145deg, #e0e0e0, #ffffff)",
                    borderRadius: "20px",
                    boxShadow: "6px 6px 12px #b0b0b0, -6px -6px 12px #ffffff",
                    padding: 2,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    {t("signin")}
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{ width: "100%" }}
                >
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="email"
                        label={t("email")}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        sx={{
                            borderRadius: "10px",
                            background: "#f0f0f0",
                            boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                        }}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                            {formik.errors.email}
                        </Typography>
                    ) : null}
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label={t("password")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        sx={{
                            borderRadius: "10px",
                            background: "#f0f0f0",
                            boxShadow: "inset 4px 4px 8px #d0d0d0, inset -4px -4px 8px #ffffff",
                        }}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                            {formik.errors.password}
                        </Typography>
                    ) : null}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={t("remember")}
                        sx={{ mb: 1 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 2,
                            mb: 1,
                            borderRadius: "10px",
                            background: "linear-gradient(145deg, #6200ea, #3700b3)",
                            boxShadow: "4px 4px 8px rgba(0,0,0,0.3), -4px -4px 8px rgba(255,255,255,0.5)",
                            position: "relative",
                            backgroundColor: "#100720",
                            "&::after": {
                                content: '""',
                                width: "100%",
                                height: "100%",
                                backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2%)",
                                filter: "blur(15px)",
                                zIndex: -1,
                                position: "absolute",
                                left: 0,
                                top: 0,
                            },
                            "&:active": {
                                transform: "scale(0.9) rotate(3deg)",
                                backgroundImage: "radial-gradient(circle farthest-corner at 10% 20%, rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2%)",
                                transition: "0.5s",
                            },
                        }}
                    >
                        {t("signin")}
                    </Button>
                    <Box sx={{ mb: 1 }}>
                        <GoogleLogin
                            size="large"
                            width="100%"
                            onSuccess={googleSuccessHandler}
                            onError={googleErrorHandler}
                        />
                    </Box>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                            <Link to="/signup" style={{ textDecoration: 'none' }}>
                                {t("dontHaveAccount")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignInPage;
