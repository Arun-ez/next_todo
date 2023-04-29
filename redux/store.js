import { legacy_createStore } from "redux";
import { AuthReducer } from "./auth/reducer";

const store = legacy_createStore(AuthReducer);

store.subscribe(() => {
    console.log(store.getState())
})


export { store }