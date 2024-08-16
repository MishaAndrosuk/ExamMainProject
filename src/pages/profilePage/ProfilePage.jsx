import React, { useEffect, useState } from "react";
import { Container, Avatar, Typography, Box } from "@mui/material";

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        email: ''
    });

    useEffect(() => {
        // Отримання даних з localStorage
        const firstName = localStorage.getItem("firstName");
        const email = localStorage.getItem("email");

        if (firstName || email) {
            setUserData({
                firstName: firstName || '',
                email: email || ''
            });
        }
    }, []);

    return (
        <Container component="main" maxWidth="xs" sx={{ mb: 10 }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    {userData.firstName.charAt(0)}
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                    {userData.firstName}
                </Typography>
                <Typography component="h2" variant="h6" sx={{ mt: 1 }}>
                    {userData.email}
                </Typography>
            </Box>
        </Container>
    );
};

export default ProfilePage;
