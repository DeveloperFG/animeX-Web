import React, {useEffect, useState} from "react";

import db from "../db/firebaseConnection";
import { getDocs,  collection,} from 'firebase/firestore'

interface ObjetoProps{
    id: number | string
    nome: string
    descricao: string

  }

export function Solicitados(){

    const [lista, setLista] = useState <ObjetoProps[]>([])

    useEffect(()=>{

        async function getDadosList(){

            const usersRef = collection(db, 'solicitacoes');
    
            getDocs(usersRef)
            .then((snapshot)=>{
                 let lista = [] as ObjetoProps[];

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
        <div style={{display:'flex',  flexDirection:'column' , width:"100%", alignItems:"center", justifyContent:'center'}}>
            <h3>Solicitados</h3>

            <div style={{display:'flex', width:'90%', flexDirection:'column'}}>
                {lista.map((item)=>(
                    <div style={{backgroundColor:'gray', margin:'1%', color:"#fff", }}>
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