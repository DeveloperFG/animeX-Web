import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    };


    const dispatch = useDispatch()

    const [solicitacoes, setSolicitacoes] = useState([])
    const [personagens, setPersonagens] = useState([])
    const [animes, setAnimes] = useState([])

    const [nome, setNome] = useState('')
    const [poder1, setPoder1] = useState('')
    const [poder2, setPoder2] = useState('')
    const [poder3, setPoder3] = useState('')
    const [sobre, setSobre] = useState('')
    const [avatar, setAvatar] = useState('')
    const [votos, setVotos] = useState('')

    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => {};
    const handleClose = () => setOpen(false);

    const handleOpen = (item) => {
        setOpen(true)

        setNome(item.nome)
        setPoder1(item.poder1)
        setPoder2(item.poder2)
        setPoder3(item.poder3)
        setSobre(item.sobre)
        setAvatar(item.avatar)
        setVotos(item.votos)
    }
     
    

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
                        poder1: doc.data().poder1,
                        poder2: doc.data().poder2,
                        poder3: doc.data().poder3,
                        sobre: doc.data().sobre,
                        avatar: doc.data().avatar,
                        votos: doc.data().votos,
                    })
                })

                
                let sortPoints = lista.sort((a, b) => {
                    return a?.votos >= b?.votos ? -1 : 1;
                });

                setPersonagens(sortPoints)

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
    

      function EditarPersonagem(){
        alert('clicou')
      }
      

    return(
        <div style={{display:'flex', color:'#fff',  flexDirection:'column' , width:"100%", height:'100vh', alignItems:"center", justifyContent:'start', backgroundColor:"#000"}}>
            <div style={{width:'100%'}}>
                <AiFillCaretLeft size={26} color="#fff" onClick={irMenu}/>
            </div>
           
            <h3>Sobre o APP</h3>

            <div style={{display:'flex', width:'90%', flexDirection:'column', alignItems:"center", justifyContent:'center'}}>
               <p>Personagens cadastrados: {personagens.length} </p>
               <p>Animes cadastrados: {animes.length} </p>
               <p>Solicitações ativas: {solicitacoes.length}</p>
            </div>

                <br></br>
            <p style={{backgroundColor:'#fff', color:"#000", padding:'4px'}}>Todos os Personagens</p>
            <br>
            </br>

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Box width='90%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                     Atualizar informações
                </Typography>
    
                        <input value={nome} style={{width:"95%", marginBottom:"2%"}} id="outlined-basic" label="Nome" variant="outlined" />
                        <input value={poder2} style={{width:"95%", marginBottom:"2%" }} id="outlined-basic" label="Poder2" variant="outlined" />
                        <input value={poder2} style={{width:"95%", marginBottom:"2%" }} id="outlined-basic" label="Poder2" variant="outlined" />
                        <input value={poder3} style={{width:"95%", marginBottom:"2%"}} id="outlined-basic" label="Poder3" variant="outlined" />
                        <input value={votos} style={{width:"95%", marginBottom:"2%"}} id="outlined-basic" label="Votos" variant="outlined" />
                        <input value={avatar} style={{width:"95%", marginBottom:"2%"}} id="outlined-basic" label="Avatar" variant="outlined" />
                        <textarea value={sobre} style={{width:"95%", marginBottom:"2%"}} id="outlined-basic" label="Sobre" variant="outlined" />

                </Box>

                <button style={{width:'90%', backgroundColor:'gray', color:'#fff'}}>Salvar Alterações</button>
              
            </Box>
            </Modal>

            {personagens.map((item, index)=>(
                <Box key={index}>
                    <small onClick={()=> handleOpen(item)}>{item.nome}</small>
                </Box>
            ))}


        </div>
    )
}

export default Sobre;