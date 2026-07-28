import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name : "filterSlice",
    initialState : {
        filterValue : null
    },
    reducers : {
        setFliterVal : (state, action) => {
            state.filterValue = action.payload
        },
    }
})

export const {setFliterVal} = filterSlice.actions;
export default filterSlice.reducer;