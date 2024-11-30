import React, {useEffect, useState} from "react";

import db from "../db/firebaseConnection";
import { getDocs,  collection,} from 'firebase/firestore'

import { loadMenu } from '../redux/heros/slice'
import { useDispatch } from "react-redux";

import { AiFillCaretLeft } from "react-icons/ai";

// interface ObjetoProps{
//     id: number | string
//     nome: string
//     descricao: string

//   }

export function Sobre(){

    const dispatch = useDispatch()

    const [solicitacoes, setSolicitacoes] = useState([])
    const [personagens, setPersonagens] = useState([])
    const [animes, setAnimes] = useState([])

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


                setSolicitacoes(lista)

            })
            .catch((err)=>{
                console.log(err)
            })
        }

        getDadosList()

    }, [])

    useEffect(()=>{

        async function getDadosListPersonagens(){

            const usersRef = collection(db, 'personagens');
    
            getDocs(usersRef)
            .then((snapshot)=>{
                 let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                    })
                })


                setPersonagens(lista)

            })
            .catch((err)=>{
                console.log(err)
            })
        }

        getDadosListPersonagens()

    }, [])

    useEffect(()=>{

        async function getDadosListAnimes(){

            const usersRef = collection(db, 'animes');
    
            getDocs(usersRef)
            .then((snapshot)=>{
                 let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome,
                    })
                })


                setAnimes(lista)

            })
            .catch((err)=>{
                console.log(err)
            })
        }

        getDadosListAnimes()

    }, [])


    function irMenu(){
        dispatch(loadMenu())
      }
    

    return(
        <div style={{display:'flex', color:'#fff',  flexDirection:'column' , width:"100%", height:'100vh', alignItems:"center", justifyContent:'start', backgroundColor:"#000"}}>
            <div style={{width:'100%'}}>
                <AiFillCaretLeft size={26} color="#fff" onClick={irMenu}/>
            </div>
           
            <h3>Sobre o APP</h3>

            <div style={{display:'flex', width:'90%', flexDirection:'column'}}>
               <p>Personagens cadastrados: {personagens.length} </p>
               <p>Animes cadastrados: {animes.length} </p>
               <p>Solicitações ativas: {solicitacoes.length}</p>
            </div>
        </div>
    )
}

export default Sobre;