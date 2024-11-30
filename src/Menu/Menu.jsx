// import { useState } from "react";
import {loadSolicitados, loadCadastrar, loadSobre } from '../redux/heros/slice'
import { useDispatch } from "react-redux";

export function Menu(){

    const dispatch = useDispatch()
    
    function irCadastrar(){
        dispatch(loadCadastrar())
      }
    
      
      function irSolicitados(){
        dispatch(loadSolicitados())
      }

      function irSobre(){
        dispatch(loadSobre())
      }

      
    

    return(
        <div style={{ width:'100%', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:"column", backgroundColor:'BLACK'}}>
            <h1 style={{fontSize:'22px', color:'#fff'}}>MENU DE OPÇÕES</h1>
            <button style={{backgroundColor:'burlywood', margin:"0.5%"}} onClick={irSobre}>INFORMAÇÕES SOBRE O APP</button>
            <button style={{backgroundColor:'burlywood', margin:"0.5%"}} onClick={irCadastrar}>CADASTRAR NOVO PERSONAGEM </button>
            <button style={{backgroundColor:'burlywood', margin:"0.5%"}} onClick={irSolicitados}>LISTA DE PERSONAGENS SOLICITADOS </button>
           {/* {togle ? <Cadastrar/> : <Solicitados/> } */}
        </div>
    )
}

export default Menu;