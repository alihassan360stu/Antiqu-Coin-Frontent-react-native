const intialState = {
    user: {},
    isAuthority: false,
    user_register: {},
    token: undefined,
    forgot_email: "",
    isOtpVerified: false,
    isEmailValid: false,
    progress:1
};

const auth = (state = intialState, action) => {
    switch (action?.type) {
        case "sign_in":
            const { token, user } = action.payload;
            state.user = user;
            state.isAuthority = true
            state.token =token!==undefined && token
            return state;
        case "logout":
            state.user = {};
            state.isAuthority = false
            state.token = undefined
            state.progress=1
            return state;
        case "forgot":
            const { forgot_email, isOtpVerified, isEmailValid } = action.payload;
            return { ...state, forgot_email: forgot_email, isOtpVerified: isOtpVerified, isEmailValid: isEmailValid };
        case "progress":
            return { ...state, "progress": action.payload };
        case "register":
            return { ...state, user_register: action.payload };
        default:
            return state;
    }
};

export default auth;
