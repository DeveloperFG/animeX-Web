import { useState } from "react";

import Cadastrar from "../Cadastrar/Cadastrar";
import Solicitados from "../Solicitados/Solicitados";


export function Opcao(){

    return(
        <div style={{ width:'100%', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:"column", backgroundColor:'DarkBlue'}}>
            <h1 style={{fontSize:'22px', color:'#fff'}}>MENU DE OPÇÕES</h1>
            <button style={{backgroundColor:'burlywood', margin:"0.5%"}} >CADASTRAR </button>
            <button style={{backgroundColor:'burlywood', margin:"0.5%"}} >SOLITADOS </button>
           {/* {togle ? <Cadastrar/> : <Solicitados/> } */}
        </div>
    )
}

export default Opcao;