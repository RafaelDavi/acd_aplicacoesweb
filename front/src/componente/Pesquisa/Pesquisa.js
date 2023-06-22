import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Pesquisa.css";


const Pesquisa = ({ relacao, id }) => {
  const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState([]);
  const [nomePesquisado, setNomePesquisado] = useState("");

  const getFornecedoresFiltrados = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/relacaoEmpresa/${id}`);
      setFornecedoresFiltrados(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFornecedoresFiltrados();
  }, [id]);

  const pesquisarPorNome = async (event) => {
    const valorPesquisa = event.target.value.toLowerCase();
    setNomePesquisado(valorPesquisa);
  
    try {
      const res = await axios.get(`http://localhost:5000/relacaoEmpresa/${id}`);
      const fornecedores = res.data;
      let fornecedoresFiltrados = [];
  
      if (!isNaN(valorPesquisa)) {
        // Caso o valor de pesquisa seja um número, filtrar pelo campo "cp"
        fornecedoresFiltrados = fornecedores.filter(
          (item) => item.cp && item.cp.includes(valorPesquisa)
        );
      } else {
        // Caso contrário, filtrar pelo campo "nome"
        fornecedoresFiltrados = fornecedores.filter(
          (item) => item.nome && item.nome.toLowerCase().includes(valorPesquisa)
        );
      }
  
      setFornecedoresFiltrados(fornecedoresFiltrados);
    } catch (error) {
      toast.error(error);
    }
  };

  function formatarTelefone(telefone) {
    if (!telefone) {
      return "";
    }
    var numeroApenasDigitos = telefone.replace(/\D/g, "");
    var regex = /(\d{2})(\d{4})(\d{5})/;
    var resultado = numeroApenasDigitos.match(regex);
    if (resultado) {
      return "(" + resultado[1] + ") " + resultado[2] + "-" + resultado[3];
    } else {
      return telefone;
    }
  }

  return (
    <div className="Pesquisar">
      <input
        type="text"
        value={nomePesquisado}
        onChange={pesquisarPorNome}
        placeholder="Digite o nome ou CPF/CNPJ"
      />

      {fornecedoresFiltrados.map((item, i) => (
        <div className="fornecedoresCard" key={i}>
          <h4>{item.nome}</h4>
          <p>Tel: <b>{formatarTelefone(item.telefone)}</b></p>
          <p>{item.cp}</p>
        </div>
      ))}
    </div>
  );
};

export default Pesquisa;
