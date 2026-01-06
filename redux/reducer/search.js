const intialState = {
    search: ""
};

const search = (state = intialState, action) => {
    switch (action?.type) {
        case "search":
            state.search = action.payload || ""
            return state;

        default: { return state; }
    }
};

export default search;
