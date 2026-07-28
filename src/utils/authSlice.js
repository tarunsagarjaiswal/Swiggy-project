import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebaseAuth";


const authSlice = createSlice({
    name : "authSlice",
    initialState : {
        userData : JSON.parse(localStorage.getItem("userData")) || null,
    },
    reducers : {
        setCredential : (state, action) => {
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify(state.userData));
        },

        removeCredential : (state, action) => {
            state.userData = null;
            localStorage.setItem("userData", JSON.stringify(state.userData));
        }
    }
})

export default authSlice.reducer;
export const {setCredential, removeCredential} = authSlice.actions;