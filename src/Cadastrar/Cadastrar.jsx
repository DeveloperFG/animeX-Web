import { useState } from 'react'

import db, { storage } from '../db/firebaseConnection';

import {collection, addDoc } from 'firebase/firestore'

import { loadMenu } from '../redux/heros/slice'
import { useDispatch } from "react-redux";

import { AiFillCaretLeft } from "react-icons/ai";

import { IoMdCloseCircle } from "react-icons/io";
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

export function Cadastrar(){

  const dispatch = useDispatch()

  const [assistir, setAssistir] = useState('')

  const [nome, setNome] = useState('')
  const [avatar, setAvatar] = useState('')
  const [poder1, setPoder1] = useState('')
  const [poder2, setPoder2] = useState('')
  const [poder3, setPoder3] = useState('')
  const [sobre, setSobre] = useState('')
  const [votos, setVotos] = useState('')

  const[load, setLoad] = useState(false)

  const[select, setSelect] = useState('')


  const [inputAvatar, setInputAvatar] = useState('')
  const [imgAvatar, setImgAvatar] = useState('')
  const [urlAvatar, setUrlAvatar] = useState('')

  const [progress, setProgress] = useState(0);


  async function handleSolicitacao(){
    
    if(select == 'personagens'){
        if( nome == '' || poder1 == '' || poder2 == '' || poder3 == '' || sobre == '' || votos == ''){
            alert('Preencha os campos!')
             return;
         }

         setLoad(true)

         // cadastrar personagem
    await addDoc(collection(db, `${select}`), {
        nome: nome,
        avatar: urlAvatar,
        poder1: poder1,
        poder2: poder2,
        poder3: poder3,
        sobre: sobre,
        votos: parseFloat(votos),
    })
    .then(()=>{
        alert("Personagem Cadastrado com sucesso!")
        setNome('')
        setAvatar('')
        setPoder1('')
        setPoder2('')
        setPoder3('')
        setSobre('')
        setVotos('')
        setLoad(false)
        ExcluiImg()


    })
    .catch((erro)=>{
        alert('Deu algum erro')
        setLoad(false)
        console.log(erro)
    })

    }
        
    if(select == 'animes'){
        if( assistir == '' || nome == '' || sobre == '' || votos == ''){
            alert('Preencha os campos!')
             return;
         }

         setLoad(true)

            // cadastrar animes
    await addDoc(collection(db, `${select}`), {
        nome: nome,
        avatar: urlAvatar,
        sobre: sobre,
        votos: parseFloat(votos),
    })
    .then(()=>{
        alert("Anime Cadastrado com sucesso!")
        setNome('')
        setAvatar('')
        setSobre('')
        setVotos('')
        setLoad(false)
        ExcluiImg()

    })
    .catch((erro)=>{
        alert('Deu algum erro')
        setLoad(false)
        console.log(erro)
    })
    }
    

}


        // Função para selecionar imagem
        const handleFileChange = (e) => {
            setInputAvatar()

            if (e.target.files[0]) {
    
                const image = e.target.files[0];
    
                if (image.type === 'image/jpeg' || image.type === 'image/png') {
    
                    setImgAvatar(image)
                    setUrlAvatar(URL.createObjectURL(e.target.files[0]))
    
                } else {
                    toast.warn("envie uma imagem do tipo PNG ou JPEG", {
                        icon: "🚫"
                    });
                    setImgAvatar('');
                    setInputAvatar('');
                    return;
                }
    
            }
        };

        // Função para fazer upload
        const handleUpload = () => {
            if (!imgAvatar) {
            alert("Por favor, selecione uma imagem!");
            return;
            }

            const storageRef = ref(storage, `gs://votacao-f93ce.appspot.com/${imgAvatar.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imgAvatar);

            // Monitorar o progresso
            uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                console.log(`Progresso do upload: ${progress}%`);
            },
            (error) => {
                console.error("Erro no upload:", error);
                alert("Erro ao enviar o arquivo!");
            },
            async () => {
                // Obter URL da imagem
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                setUrlAvatar(url);
                alert("Upload concluído!");
            }
            );

            
        };


    function ExcluiImg() {
      setImgAvatar('')
      setUrlAvatar('')
      setInputAvatar('')
  }


    function irMenu(){
        dispatch(loadMenu())
    }

 
    return(
        <div style={{display:'flex', width:"100%", height:'100vh', flexDirection:'column', padding:3, backgroundColor:'#000', color:'#fff' }}>
            <div style={{width:'100%'}}>
                <AiFillCaretLeft size={26} color="#fff" onClick={irMenu}/>
            </div>

            <div style={{ display:'flex', width:"100%", alignItems:'center', justifyContent:'center', marginBottom:"2%"}}>
                 <h1 style={{fontSize:'16px'}}>Cadastrar novo... </h1>
            </div>
       

          <div>
              <span style={{marginRight:'2%'}}>Novo cadastro para:</span>
                  <select name={select} onChange={(txt)=> setSelect(txt.target.value)}>
                      <option value="selecione">Selecione</option>
                      <option value="personagens">personagens</option>
                      <option value="animes">animes</option>
                  </select>
          </div>
       

          <input value={nome} onChange={(txt)=> setNome(txt.target.value)} placeholder='nome' style={{margin:'3px', height:'3vh'}} />
          {/* <input value={avatar} onChange={(txt)=> setAvatar(txt.target.value)}  placeholder='avatar' style={{margin:'3px', height:'3vh'}} /> */}
          {select == 'personagens' && (
                  <>
                      <input value={poder1} onChange={(txt)=> setPoder1(txt.target.value)}  placeholder='poder1' style={{margin:'3px', height:'3vh'}} />
                      <input value={poder2} onChange={(txt)=> setPoder2(txt.target.value)}  placeholder='poder2' style={{margin:'3px', height:'3vh'}} />
                      <input value={poder3} onChange={(txt)=> setPoder3(txt.target.value)}  placeholder='poder3' style={{margin:'3px', height:'3vh'}} />
                  </>
          )}
          
          <input value={sobre} onChange={(txt)=> setSobre(txt.target.value)}  placeholder='sobre' style={{margin:'3px', height:'3vh'}} />
          <input value={votos} onChange={(txt)=> setVotos(txt.target.value)}  placeholder='votos' style={{margin:'3px', height:'3vh'}} />

          {select != 'personagens' && (
                  <>
                      <input value={assistir} onChange={(txt)=> setAssistir(txt.target.value)}  placeholder='assistir' style={{margin:'3px', height:'3vh'}} />
                  </>
          )}
         


                <div style={{display:'flex', flexDirection:'column', marginBottom:"2%"}}>
                        <label for='arquivo' >Enviar arquivo </label> 
                        <div style={{display:'flex', alignItems:'center' }}>
                            <input type='file' name='arquivo' id='arquivo' multiple accept='image/*' value={inputAvatar} onChange={handleFileChange} />   
                           {imgAvatar != '' && (<IoMdCloseCircle size={22} color='red' style={{marginLeft:'5%'}} onClick={ExcluiImg} /> ) }   
                        </div>
                           
                </div>

        <button style={{backgroundColor:'green', color:'#fff' , marginBottom: '1%'}} onClick={handleUpload} >Upload da imagem</button>
        <button style={{backgroundColor:'green', color:'#fff'}} onClick={handleSolicitacao} >{load == true ? 'Cadastrando personagem aguarde...' : 'Cadastrar personagem'}</button>
              <br></br>
              <br></br>
    </div>
    )
}

export default Cadastrar;