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

        loadSobre: (state ) => {
            state.toogle = 'Sobre'
        },

    }
})

export const { loadMenu, loadSolicitados, loadCadastrar, loadSobre } = heroSlice.actions;

export default heroSlice.reducer;