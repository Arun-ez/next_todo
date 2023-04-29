import { LOGIN, LOGOUT } from "./types"
const init = {
    name: "",
    email: "",
    token: ""
}

const AuthReducer = (state = init, action) => {

    if (action.type === LOGIN) {
        return action.payload;
    } else if (action.type === LOGOUT) {

        return init;
    }

    return state;
}


export { AuthReducer }