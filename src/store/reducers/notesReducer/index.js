const initialNotesState = {
    notes: [
        {
            id: 1,
            title: "Акаунт",
            text: "email: admin@dash.com.................\nPassword: 12345678",
            tag: ["#важливо", "#особисте"],
        },
        {
            id: 2,
            title: "To do list",
            text: "Найти роботу",
            tag: ["#завдання", "#робота"],
        },
        {
            id: 3,
            title: "Список продуктів",
            text: "Молоко, яйця, творог, стероїди, тренбалон",
            tag: ["#покупки", "#їжа"],
        },
        {
            id: 4,
            title: "Хз что писать",
            text: "Надо заповнить місце",
            tag: ["#особисте", "#різне"],
        },
        {
            id: 5,
            title: "Покупки на завтра",
            text: "Хліб, сир, помідори, огірки, шоколад",
            tag: ["#покупки", "#їжа"],
        },
        {
            id: 6,
            title: "Ідеї для статті",
            text: "1. Як залишатися продуктивним на роботі\n2. Поради щодо збереження здоров'я",
            tag: ["#ідеї", "#робота"],
        },
        {
            id: 7,
            title: "Список книг",
            text: "1. 'Майстер і Маргарита' - Булгаков\n2. '1984' - Джордж Орвелл",
            tag: ["#книги", "#література"],
        },
        {
            id: 8,
            title: "Завдання на тиждень",
            text: "1. Завершити проект\n2. Підготувати звіт\n3. Відвідати тренінг",
            tag: ["#завдання", "#робота"],
        },
        {
            id: 9,
            title: "Рецепт омлету",
            text: "Яйця, молоко, сир, сіль, перець, масло",
            tag: ["#рецепти", "#їжа"],
        },
        {
            id: 10,
            title: "Список музики для тренувань",
            text: "1. Eye of the Tiger - Survivor\n2. Lose Yourself - Eminem",
            tag: ["#музика", "#тренування"],
        },
        {
            id: 11,
            title: "План поїздки",
            text: "1. Купити квитки\n2. Забронювати готель\n3. Спакувати валізи",
            tag: ["#подорож", "#планування"],
        },
        {
            id: 12,
            title: "Контакти",
            text: "Іван: +380123456789\nБодя: +380987654321",
            tag: ["#контакти", "#особисте"],
        },
    ],
};


export const NotesReducer = (state = initialNotesState, action) => {
    console.log("Reducer Action:", action);
    switch (action.type) {
        case "ADD_NOTE":
            return { ...state, notes: [action.payload, ...state.notes] };

        case "EDIT_NOTE":
            console.log(action.payload)
            const updatedNote = action.payload;
            const index = state.notes.findIndex(x => x.id == updatedNote.id);
            const updatedNotes = [...state.notes];
            updatedNotes[index] = updatedNote;
            console.log(updatedNotes)
            return { ...state, notes: updatedNotes };
        
        case "DELETE_NOTE":
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
            };

        default:
            return state;
    }
};


