export const sign_in = (data) => {
    return {
        type: "sign_in",
        payload: data
    }
}

export const logout = (data) => {
    return {
        type: "logout",
        payload: data
    }
}

export const userRegister = () => {
    return {
        type: "register",
        payload: data
    }
}


export const forgot = (data) => {
    return {
        type: "forgot",
        payload: data
    }
}


export const initialLoadProgress = (progress) => {
    return {
        type: "progress",
        payload: progress
    }
}