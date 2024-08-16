import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { TextField, InputAdornment, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./MainPage.css";

export default function MainPage() {
    const notes = useSelector((state) => state.notes.notes || []);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const maxLength = 15;

    useEffect(() => {
        const filterNotes = () => {
            const filtered = notes.filter(note => {
                if (searchTerm.startsWith("#")) {
                    const searchTag = searchTerm.slice(1).toLowerCase();
                    return Array.isArray(note.tag) && note.tag.some(t => t.toLowerCase().includes(searchTag));
                } else {
                    return (
                        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        note.text.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
            });
            setFilteredNotes(filtered);
        };

        filterNotes();
    }, [notes, searchTerm]);


    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    const handleRightClick = (event, note) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSelectedNote(note);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedNote(null);
    };

    const handleDelete = () => {
        if (selectedNote) {
            dispatch({ type: "DELETE_NOTE", payload: selectedNote.id });
            handleClose();
        }
    };

    const open = Boolean(anchorEl);

    return (
        <div className="container">
            <div className="search-bar">
                <TextField
                    placeholder="Пошук нотаток..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            {filteredNotes.map((note) => (
                <div
                    key={note.id}
                    className="note-wrapper"
                    onContextMenu={(e) => handleRightClick(e, note)}
                >
                    <Link
                        to={`/note?id=${encodeURIComponent(note.id)}&title=${encodeURIComponent(note.title)}&text=${encodeURIComponent(note.text)}&tag=${encodeURIComponent(note.tag || "")}`}
                        className="note-link"
                    >
                        <div className="note">
                            <h2>{truncateText(note.title, maxLength)}</h2>
                            {note.text && <p>{truncateText(note.text, maxLength)}</p>}
                        </div>
                    </Link>
                </div>
            ))}
            <Link to={"/note"}>
                <button className="add-note-button">+</button>
            </Link>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete}>Видалити</MenuItem>
            </Menu>
        </div>
    );
}
