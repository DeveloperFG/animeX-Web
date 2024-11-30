import React, {useEffect, useState} from "react";

import db from "../db/firebaseConnection";
import { getDocs,  collection,} from 'firebase/firestore'

// interface ObjetoProps{
//     id: number | string
//     nome: string
//     descricao: string

//   }

export function Solicitados(){

    const [lista, setLista] = useState([[]])

    useEffect(()=>{

        async function getDadosList(){

            const usersRef = collection(db, 'solicitacoes');
    
            getDocs(usersRef)
            .then((snapshot)=>{
                 let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        descricao: doc.data().descricao,
                    })
                })


              setLista(lista)

            })
            .catch((err)=>{
                console.log(err)
            })
        }

        getDadosList()

    }, [])

    return(
        <div style={{display:'flex', color:'#fff',  flexDirection:'column' , width:"100%", height:'100vh', alignItems:"center", justifyContent:'start', backgroundColor:"#000"}}>
            <h3>Solicitados</h3>

            <div style={{display:'flex', width:'90%', flexDirection:'column'}}>
                {lista.map((item)=>(
                    <div style={{backgroundColor:'burlywood', margin:'1%', color:"#000", }}>
                        <span style={{marginRight:'1%'}}> <strong>Nome: </strong>{item.nome}</span>
                        <br></br>
                        <small>Descrição: {item.descricao}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Solicitados;