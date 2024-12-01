import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import db from "../db/firebaseConnection";
import { addDoc, getDocs,  collection, updateDoc, doc,} from 'firebase/firestore'

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

    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [poder1, setPoder1] = useState('')
    const [poder2, setPoder2] = useState('')
    const [poder3, setPoder3] = useState('')
    const [sobre, setSobre] = useState('')
    const [avatar, setAvatar] = useState('')
    const [votos, setVotos] = useState('')

    const [load, setLoad] = useState(false)
    const [control, setControl] = useState(false)
    const [cont, setCont]= useState(1)

    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen = (item) => {
        setOpen(true)

        setId(item.id)
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

    }, [control])

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
    

     async function EditarPersonagem(){

        setLoad(true)

        const documentRef = doc(db, "personagens", `${id}`);

        try {
            await updateDoc(documentRef, {
                nome: nome,
                poder1: poder1,
                poder2: poder2,
                poder3: poder3,
                avatar: avatar,
                sobre: sobre,
                votos: parseFloat(votos),
    
            });
            alert("Atualizado com sucesso!")
            setLoad(false)
            setControl(!control)
          } catch (error) {
            console.error("Erro ao atualizar o campo:", error);
            setLoad(false)
          }  
         

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
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Personagem: 
                        </Typography>
                        <img style={{width:'50px', height:'50px', objectFit:'contain'}} src={avatar} />
                    </Box>
              
                        <Box width='100%' display='flex' >
                            <Box display='flex' width='30%' alignItems='center'>
                                <small style={{marginLeft:'50%'}} >Nome:</small>
                            </Box>
                           
                            <Box width='70%' alignItems='center' justifyContent='center'>
                                <input value={nome} onChange={(e)=> setNome(e.target.value)} style={{width:"80%", marginBottom:"2%", }} id="outlined-basic" label="Nome" variant="outlined" />
                            </Box>
                           
                        </Box>

                        <Box width='100%' display='flex' >
                            <Box display='flex' width='30%' alignItems='center'>
                                <small style={{marginLeft:'50%'}} >Poder1:</small>
                            </Box>
                           
                            <Box width='70%' alignItems='center' justifyContent='center'>
                                <input value={poder1} onChange={(e)=> setPoder1(e.target.value)} style={{width:"80%", marginBottom:"2%", }} id="outlined-basic" label="Poder1" variant="outlined" />
                            </Box>
                           
                        </Box>

                        <Box width='100%' display='flex' >
                            <Box display='flex' width='30%' alignItems='center'>
                                <small style={{marginLeft:'50%'}} >Poder2:</small>
                            </Box>
                           
                            <Box width='70%' alignItems='center' justifyContent='center'>
                                <input value={poder2} onChange={(e)=> setPoder2(e.target.value)} style={{width:"80%", marginBottom:"2%", }} id="outlined-basic" label="Poder2" variant="outlined" />
                            </Box>
                           
                        </Box>
                        
                        <Box width='100%' display='flex' >
                            <Box display='flex' width='30%' alignItems='center'>
                                <small style={{marginLeft:'50%'}} >Poder3:</small>
                            </Box>
                           
                            <Box width='70%' alignItems='center' justifyContent='center'>
                                <input value={poder3} onChange={(e)=> setPoder3(e.target.value)} style={{width:"80%", marginBottom:"2%", }} id="outlined-basic" label="Poder3" variant="outlined" />
                            </Box>
                           
                        </Box>

                        <Box width='100%' display='flex' >
                            <Box display='flex' width='30%' alignItems='center'>
                                <small style={{marginLeft:'50%'}} >Votos:</small>
                            </Box>
                           
                            <Box width='70%' alignItems='center' justifyContent='center'>
                                <input value={votos} onChange={(e)=> setVotos(e.target.value)} style={{width:"80%", marginBottom:"2%", }} id="outlined-basic" label="Votos" variant="outlined" />
                            </Box>
                           
                        </Box>
                     
                        <Box width='100%' display='flex' >
                            <Box display='flex' width='30%' alignItems='center'>
                                <small style={{marginLeft:'50%'}} >Avatar:</small>
                            </Box>
                           
                            <Box width='70%' alignItems='center' justifyContent='center'>
                                <input value={avatar} onChange={(e)=> setAvatar(e.target.value)} style={{width:"80%", marginBottom:"2%", }} id="outlined-basic" label="Avatar" variant="outlined" />
                            </Box>
                           
                        </Box>       
                       
                        <Box width='100%' display='flex' >
                            <Box display='flex' width='30%' alignItems='center'>
                                <small style={{marginLeft:'50%'}} >Sobre:</small>
                            </Box>
                           
                            <Box width='70%' alignItems='center' justifyContent='center'>
                                <textarea value={sobre} onChange={(e)=> setSobre(e.target.value)} style={{width:"80%", marginBottom:"2%", }} id="outlined-basic" label="Sobre" variant="outlined" />
                            </Box>
                           
                        </Box>
                        
                </Box>
                
                <Box display='flex' width='95%' alignItems='center' justifyContent='center'>
                    <button style={{width:'70%', backgroundColor:'gray', color:'#fff'}} onClick={EditarPersonagem}>{load ? 'Salvando atualização...': 'Salvar alterações'}</button>
                </Box>
                
              
            </Box>
            </Modal>

            <div style={{ width:"60%", overflow:'auto'}}>
                {personagens.map((item, index)=>(
                    <Box key={index}>
                        <small onClick={()=> handleOpen(item)}> {item.nome}</small>
                    </Box>
                ))}
            </div>
            


        </div>
    )
}

export default Sobre;