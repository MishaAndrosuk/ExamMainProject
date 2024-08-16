import React from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./NotePage.css"; 
import { useAction } from "../../hooks/useAction";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const NotePage = () => {
    const query = useQuery();  
    const initialId = query.get("id"); 
    const initialTitle = query.get("title");
    const initialText = query.get("text");
    const initialTag = query.get("tag");
    const navigate = useNavigate();
    const {editNote, addNote} = useAction();

    const onSubmitHandler = (values) => {
        const formattedTag = values.tag.split(' ').filter(tag => tag.trim() !== '').map(tag => `#${tag.trim()}`);
        
        const updatedNote = {   
            id: initialId,  
            title: values.title,
            text: values.text,
            tag: formattedTag, 
        };
    
        if (initialId) {
            editNote(updatedNote);  
        } else {
            addNote(updatedNote);  
        }
        navigate("/"); 
    };

    const onBackHandler = () => {
        navigate("/");
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Поле обов'язкове"),
        text: Yup.string().required("Поле обов'язкове"),
        tag: Yup.string(), 
    });

    const formik = useFormik({
        initialValues: {
            title: initialTitle || "",
            text: initialText || "",
            tag: initialTag || "", 
        },
        onSubmit: onSubmitHandler,
        validationSchema: validationSchema,
    });

    return (
        <Container className="note-container">
            <Typography variant="h4" gutterBottom>
                {initialId ? "Edit Note" : "Add Note"}
            </Typography>
            <form onSubmit={formik.handleSubmit} className="note-form">
                <Box className="note-box">
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        variant="outlined"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="note-textfield"
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="error-text">{formik.errors.title}</div>
                    ) : null}
                </Box>
                <Box className="note-box">
                    <TextField
                        fullWidth
                        id="text"
                        name="text"
                        label="Text"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="note-textfield"
                    />
                    {formik.touched.text && formik.errors.text ? (
                        <div className="error-text">{formik.errors.text}</div>
                    ) : null}
                </Box>
                <Box className="note-box">
                    <TextField
                        fullWidth
                        id="tag"
                        name="tag"
                        label="#Теги"
                        variant="outlined"
                        placeholder="#Теги"
                        value={formik.values.tag}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="note-textfield"
                    />
                    {formik.touched.tag && formik.errors.tag ? (
                        <div className="error-text">{formik.errors.tag}</div>
                    ) : null}
                </Box>
                <Box className="note-submit-box">
                    <Button variant="contained" color="primary" type="submit" style={{ marginRight: "10px" }}>
                        {initialId ? "Save Changes" : "Save"}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onBackHandler}>
                        Back
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default NotePage;
