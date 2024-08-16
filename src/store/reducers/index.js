import { combineReducers } from "@reduxjs/toolkit"
import { ThemingReducer } from "./themingReducer";
import { AuthReducer } from "./authReducer";
import { NotesReducer } from "./notesReducer";

export const rootReducer = combineReducers({
    themingReducer: ThemingReducer,
    authReducer: AuthReducer,
    notes: NotesReducer
});