import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Relacao = ({dadosEmp, dadosFor, set, getRelacao}) => {

    const ref = useRef();

    const handleSubmitRelacao = async (e) =>{
        e.preventDefault();

        const relacao = ref.current;

        await axios
              .post("http://localhost:5000/relacao/", {
                cnpj: relacao.cnpj.value,
                cp: relacao.cp.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));

        getRelacao();

    }


  return (
    <div className="Relacao">
        <form className="Formulario" ref={ref} onSubmit={handleSubmitRelacao}>
        <label>Empresa</label>
        <label>CNPJ</label>
      <input name="cnpj"/>
        <label>Fornecedor</label>
        <label>CPF/CNPJ</label>
      <input name="cp"/>
 
      <button type="submit" className="submit">cadastrar</button>
    </form>
    </div>
  );
}

export default Relacao;
