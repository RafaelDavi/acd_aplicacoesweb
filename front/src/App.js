import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Formulario from "./componente/Formulario/Formulario";
import FormularioFor from "./componente/FormularioFor/FormularioFor";
import Grid from "./componente/Grid/Grid";
import GridR from "./componente/GridR/GridR";
import axios from "axios";
import { useEffect, useState} from "react";
import Relacao from "./componente/Relacao/Relacao";
import Card from "./componente/Card/Card";
import './App.css';
import Menu from "./componente/Menu/Menu";


function App() {

  const[empresas, setEmpresa] = useState([]);
  const[onEdit, setOnEdit] = useState([]);

  const[fornecedor, setFornecedor] = useState([]);
  const[onEditFor, setOnEditFor] = useState([]);

  const[relacao, setRelacao] = useState([]);

  const getEmpresa = async () => {
    try {
      const res = await axios.get("http://localhost:5000/empresa");
      setEmpresa(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEmpresa();
  }, [setEmpresa]);

  const getFornecedor = async () => {
    try {
      const res = await axios.get("http://localhost:5000/fornecedor");
      setFornecedor(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFornecedor();
  }, [setFornecedor]);

  const getRelacao = async () => {
    try {
      const res = await axios.get("http://localhost:5000/relacao");
      setRelacao(res.data.sort((a, b) => (a.cnpj > b.cnpj ? 1 : -1)));
      
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getRelacao();
  }, [setRelacao]);


  return (
    <div className="App">
    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT}>
    </ToastContainer>

    <Menu />
    <Card dadosObj={empresas} dadosRelacao={relacao} set={setEmpresa} setOnEdit={setOnEdit} tipo='empresa'/>
    <Card dadosObj={fornecedor} dadosRelacao={relacao} set={setFornecedor} setOnEdit={setOnEditFor} tipo='fornecedor'/>
    

    <div className="cadastros">
      <div className="cadastrosEmp">
        <h2>cadastro empresa</h2>
       <Formulario getEmpresa={getEmpresa} onEdit={onEdit} setOnEdit={setOnEdit}/>
      </div>
      <div className="cadastrosFor">
      <h2>cadastro empresa</h2>
<FormularioFor getFornecedor={getFornecedor} onEdit={onEditFor} setOnEdit={setOnEditFor}/> 
      </div>
      <div className="cadastrosRel">
      <h2>criar relação empresa</h2>
<Relacao dadosEmp={empresas} dadosFor={fornecedor} getRelacao={getRelacao} />
      </div>
     

    

    
    </div>
    
     



      
 
    </div>
  );
}

export default App;
