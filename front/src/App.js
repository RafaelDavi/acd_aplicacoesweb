import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import Relacao from       "./componente/Relacao/Relacao";
import Card from          "./componente/Card/Card";
import Menu from          "./componente/Menu/Menu";
import Formulario from    "./componente/Formulario/Formulario";
import FormularioFor from "./componente/FormularioFor/FormularioFor";
import Pesquisa from "./componente/Pesquisa/Pesquisa";


function App() {

  const [empresas, setEmpresa] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const [fornecedor, setFornecedor] = useState([]);
  const [onEditFor, setOnEditFor] = useState(null);

  const [relacao, setRelacao] = useState(null);
  const [onEditRel, setOnEditRel] = useState(null);

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
      <Card dadosObj={empresas} dadosObjEstrangeiro={fornecedor} dadosRelacao={relacao} set={setEmpresa} setOnEdit={setOnEdit} setOnEditRel={setOnEditRel} onEditRel={onEditRel} tipo='empresa' />
      <Card dadosObj={fornecedor} dadosObjEstrangeiro={empresas} dadosRelacao={relacao} set={setFornecedor} setOnEdit={setOnEditFor} tipo='fornecedor' />


      <div className="cadastros">
        <h1>cadastros</h1>
        <div className="cadastrosEmp">
          <h2>cadastro empresa</h2>
          <Formulario getEmpresa={getEmpresa} onEdit={onEdit} setOnEdit={setOnEdit} />
        </div>
        <div className="cadastrosFor">
          <h2>cadastro fornecedor</h2>
          <FormularioFor getFornecedor={getFornecedor} onEdit={onEditFor} setOnEdit={setOnEditFor} />
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
