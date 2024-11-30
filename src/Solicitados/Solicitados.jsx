import React, {useEffect, useState} from "react";

import db from "../db/firebaseConnection";
import { getDocs,  collection, deleteDoc, doc } from 'firebase/firestore'

import { loadMenu } from '../redux/heros/slice'
import { useDispatch } from "react-redux";

import { AiFillCaretLeft } from "react-icons/ai";
import { BiSolidXCircle } from "react-icons/bi";


// interface ObjetoProps{
//     id: number | string
//     nome: string
//     descricao: string

//   }

export function Solicitados(){

    const dispatch = useDispatch()

    const [lista, setLista] = useState([])
    const [control, setControl] = useState(false)

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

    }, [control])


    function irMenu(){
        dispatch(loadMenu())
      }

  async function ExluirSolicitado(item){

    const itemDoc = doc(db, `solicitacoes/${item.id}`);
    
        deleteDoc(itemDoc)
        .then(() => {
            alert("Documento excluído com sucesso!");
            setControl(!control)
          })
          .catch((error) => {
            alertr("Erro ao excluir documento:", error);
          });
    }
    

    return(
        <div style={{display:'flex', color:'#fff',  flexDirection:'column' , width:"100%", height:'100vh', alignItems:"center", justifyContent:'start', backgroundColor:"#000"}}>
            <div style={{width:'100%'}}>
                <AiFillCaretLeft size={26} color="#fff" onClick={irMenu}/>
            </div>
           
            <h3>Solicitados</h3>

            <div style={{display:'flex', width:'90%', flexDirection:'column'}}>
                {lista.map((item, index)=>(
                   <div key={index} style={{display:'flex', width:'95%', alignItems:'center', justifyContent:'center'}}>
                        <div style={{ width:'90%', backgroundColor:'burlywood', margin:'1%', color:"#000", padding:'2px' }}>
                            <span style={{marginRight:'1%'}}> <strong>Nome: </strong>{item.nome}</span>
                            <br></br>
                            <small>Descrição: {item.descricao}</small>
                        </div>

                        <div>
                           <BiSolidXCircle size={26} color="#fff" onClick={()=> ExluirSolicitado(item)} />
                        </div>
                    </div>
 
                ))}
            </div>

            <div style={{display:'flex', width:'100%', marginLeft:'12%', marginTop:'3%'}}>
             <small>Total de solicitações: {lista.length}</small>
            </div>
           
        </div>
    )
}

export default Solicitados;