import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toogle: 'Menu'
}

export const heroSlice = createSlice({
    name: "hero",
    initialState,
    reducers:{
        loadMenu: (state ) => {
            state.toogle = 'Menu'
        },

        loadCadastrar: (state ) => {
            state.toogle = 'Cadastrar'
        },

        loadSolicitados: (state ) => {
            state.toogle = 'Solicitados'
        },

    }
})

export const { loadMenu, loadSolicitados, loadCadastrar } = heroSlice.actions;

export default heroSlice.reducer;