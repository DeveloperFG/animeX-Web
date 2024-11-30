

import { useSelector} from "react-redux";

import Menu from './Menu/Menu';
import Cadastrar from './Cadastrar/Cadastrar';
import Solicitados from "./Solicitados/Solicitados";
import Sobre from "./Sobre/Sobre";

function App() {

  const { toogle } = useSelector((rootReducer)=> rootReducer.hero)

  return (
      <>
       {toogle == 'Menu' ? <Menu/> : toogle =='Solicitados' ? <Solicitados/> : toogle == 'Sobre' ? <Sobre/> : <Cadastrar/> } 
      </>
       
  )
}

export default App
