// import { useState } from "react";
import {loadSolicitados, loadCadastrar, loadSobre } from '../redux/heros/slice'
import { useDispatch } from "react-redux";

import logo from '../img/animex.png'

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
            <img style={{width:'200px', height:'200px'}}
              src={logo}
            />
            <h1 style={{fontSize:'22px', color:'#fff'}}>MENU DE OPÇÕES</h1>
            <button style={{backgroundColor:'burlywood', margin:"0.5%", padding:'2%'}} onClick={irSobre}>INFORMAÇÕES SOBRE O APP</button>
            <button style={{backgroundColor:'burlywood', margin:"0.5%", padding:'2%'}} onClick={irCadastrar}>CADASTRAR PERSONAGEM </button>
            <button style={{backgroundColor:'burlywood', margin:"0.5%", padding:'2%'}} onClick={irSolicitados}>PERSONAGENS SOLICITADOS </button>
           {/* {togle ? <Cadastrar/> : <Solicitados/> } */}
        </div>
    )
}

export default Menu;