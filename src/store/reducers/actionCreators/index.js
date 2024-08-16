import * as authActions from "../authReducer/actions";
import * as themeActions from "../themingReducer/actions";
import * as notesActions from "../notesReducer/actions"
const actions = {
    ...authActions,
    ...themeActions,
    ...notesActions
};

export default actions;