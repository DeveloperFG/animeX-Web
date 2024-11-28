

import { useSelector} from "react-redux";

import Menu from './Menu/Menu';
import Cadastrar from './Cadastrar/Cadastrar';
import Solicitados from "./Solicitados/Solicitados";

function App() {

  const { toogle } = useSelector((rootReducer)=> rootReducer.hero)

  return (
      <>
       {toogle == 'Menu' ? <Menu/> : toogle =='Solicitados' ? <Solicitados/> : <Cadastrar/> } 
      </>
       
  )
}

export default App
