import { useState } from 'react'
// import './App.css'

import db from './db/firebaseConnection';

import {collection, addDoc } from 'firebase/firestore'

// import { IoMdCloseCircle } from "react-icons/io";

function App() {
  
  // const [sassitir, setAssistir] = useState('')

  const [nome, setNome] = useState('')
  const [avatar, setAvatar] = useState('')
  const [poder1, setPoder1] = useState('')
  const [poder2, setPoder2] = useState('')
  const [poder3, setPoder3] = useState('')
  const [sobre, setSobre] = useState('')
  const [votos, setVotos] = useState('')

  const[load, setLoad] = useState(false)


  // const [inputAvatar, setInputAvatar] = useState('')
  // const [imgAvatar, setImgAvatar] = useState('')
  // const [urlAvatar, setUrlAvatar] = useState('')

  async function handleSolicitacao(){

    if(nome == '' || avatar == '' || poder1 == '' || poder2 == '' || poder3 == '' || sobre == '' || votos == ''){
       alert('Preencha os campos!')
        return;
    }

    setLoad(true)

    await addDoc(collection(db, 'personagens'), {
        nome: nome,
        avatar: avatar,
        poder1: poder1,
        poder2: poder2,
        poder3: poder3,
        sobre: sobre,
        votos: parseFloat(votos),
    })
    .then(()=>{
        alert("Cadastrado com sucesso!")
        setNome('')
        setAvatar('')
        setPoder1('')
        setPoder2('')
        setPoder3('')
        setSobre('')
        setVotos('')

        setLoad(false)

    })
    .catch((erro)=>{
        alert('Deu algum erro')
        setLoad(false)
        console.log(erro)
    })
}


// async function handleCadastrarProduto() {

  
//   setLoad(true)

//   if(nome == '' || preco == '' || uso == '' || descricao == '' || imgProduto == '' ){
//     toast.warn('Preencha todos os campos!!!')
//     setLoad(false)
//     return;
//   }

//   const uploadTask = await firebase.storage()
//       .ref(`img/fotos/${imgProduto.name}`)
//       .put(imgProduto)
//       .then(async () => {

//           console.log('Upload sucesso!')
//           // toast.success("Upload sucesso!", {
//           //     icon: "😁"
//           // });

//           await firebase.storage().ref('img/fotos')
//               .child(imgProduto.name).getDownloadURL()
//               .then(async(ul) => {
//                   let urlFoto = ul;

//                   await firebase.firestore().collection('produtos')
//                       .doc()
//                       .set({
//                         nome: nome,
//                         preco: parseFloat(preco),
//                         uso: uso,
//                         descricao: descricao,
//                         imagem: urlFoto,
//                         status: 'estoque',
//                         quantidade: quantidade,
//                         vendedor: user.uid
//                       })

//                       .then(() => {
//                         alert("Cadastrado com sucesso!")
//                         setNome('')
//                         setAvatar('')
//                         setPoder1('')
//                         setPoder2('')
//                         setPoder3('')
//                         setSobre('')
//                         setVotos('')

//                         setLoad(false)
//                       })
//                       .catch((erro) => {
//                         alert('Deu algum erro')
//                           setLoad(false)
//                           console.log(erro)
//                       })
//               })
//       })

// }



//     const handleFile = (e) => {

//       setInputAvatar()

//       if (e.target.files[0]) {

//           const image = e.target.files[0];

//           if (image.type === 'image/jpeg' || image.type === 'image/png') {

//               setImgAvatar(image)
//               setUrlAvatar(URL.createObjectURL(e.target.files[0]))

//           } else {
//               toast.warn("envie uma imagem do tipo PNG ou JPEG", {
//                   icon: "🚫"
//               });
//               setImgAvatar('');
//               setInputAvatar('');
//               return;
//           }

//       }
//     }

//     function ExcluiImg() {
//       setImgAvatar('')
//       setUrlAvatar('')
//       setInputAvatar('')
//   }

  return (
      <div style={{display:'flex', width:"100%", height:'100%', flexDirection:'column', padding:3,}}>
          <h1 style={{fontSize:'16px'}}>Cadastrar novo </h1>

            <input value={nome} onChange={(txt)=> setNome(txt.target.value)} width={100}height={30} placeholder='nome' style={{margin:'3px'}} />
            <input value={avatar} onChange={(txt)=> setAvatar(txt.target.value)} width={100}height={30} placeholder='avatar' style={{margin:'3px'}} />
            <input value={poder1} onChange={(txt)=> setPoder1(txt.target.value)} width={100}height={30} placeholder='poder1' style={{margin:'3px'}} />
            <input value={poder2} onChange={(txt)=> setPoder2(txt.target.value)} width={100}height={30} placeholder='poder2' style={{margin:'3px'}} />
            <input value={poder3} onChange={(txt)=> setPoder3(txt.target.value)} width={100}height={30} placeholder='poder3' style={{margin:'3px'}} />
            <input value={sobre} onChange={(txt)=> setSobre(txt.target.value)} width={100}height={30} placeholder='sobre' style={{margin:'3px'}} />
            <input value={votos} onChange={(txt)=> setVotos(txt.target.value)} width={100}height={30} placeholder='votos' style={{margin:'3px'}} />

{/* 
                  <div style={{display:'flex', flexDirection:'column', marginBottom:"2%"}}>
                          <label for='arquivo' >Enviar arquivo </label> 
                          <div style={{display:'flex', alignItems:'center' }}>
                              <input type='file' name='arquivo' id='arquivo' multiple accept='image/*' value={inputAvatar} onChange={handleFile} />   
                              <IoMdCloseCircle size={22} color='red' style={{marginLeft:'5%'}} onClick={ExcluiImg} />   
                          </div>
                             
                  </div> */}

          <button onClick={handleSolicitacao} style={{backgroundColor:'green', color:'#fff'}}>{load == true ? 'Cadastrando personagem aguarde...' : 'Cadastrar personagem'}</button>
      </div>
  )
}

export default App
