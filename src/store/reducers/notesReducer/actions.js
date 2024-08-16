export const addNote = (note) => (dispatch) => {
    dispatch({type: "ADD_NOTE", payload: note});
};

export const editNote = (updatedNote) =>(dispatch) => {
    dispatch({type: "EDIT_NOTE", payload: updatedNote})};

export const deleteNote = (id) => (dispatch) => {
    dispatch({type: "DELETE_NOTE", payload: id})
}