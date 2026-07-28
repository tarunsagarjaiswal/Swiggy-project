import { createSlice } from "@reduxjs/toolkit";


const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        serachBarToogle : false,
        signInToogle : false,
    },
    reducers : {
        toogleSearchBar : (state, action) => {
            state.serachBarToogle  = !state.serachBarToogle;
        },

        toogleSignIn : (state, action) => {
            state.signInToogle  = !state.signInToogle;
        },
    },
})

export const {toogleSearchBar, toogleSignIn} = toogleSlice.actions;
export default toogleSlice.reducer;