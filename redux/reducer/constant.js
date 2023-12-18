const intialState = {
    isLoading: false
};

const apiLoading = (state = intialState, action) => {
    switch (action?.type) {
        case "loading":
            return { ...state, isLoading: action.payload };
            break;
        default: { return state; }
    }
};

export default apiLoading;
