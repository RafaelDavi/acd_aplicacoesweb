import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./Formulario.css";

const Formulario = ({ getEmpresa, onEdit, setOnEdit }) => {
  const ref = useRef();

  const [estadoSelecionado, setEstadoSelecionado] = useState('');

  const handleChangeEstado = (event) => {
    setEstadoSelecionado(event.target.value);
  };

  const estados = [
    { "sigla": "AC", "nome": "Acre" },
    { "sigla": "AL", "nome": "Alagoas" },
    { "sigla": "AP", "nome": "Amapá" },
    { "sigla": "AM", "nome": "Amazonas" },
    { "sigla": "BA", "nome": "Bahia" },
    { "sigla": "CE", "nome": "Ceará" },
    { "sigla": "DF", "nome": "Distrito Federal" },
    { "sigla": "ES", "nome": "Espírito Santo" },
    { "sigla": "GO", "nome": "Goiás" },
    { "sigla": "MA", "nome": "Maranhão" },
    { "sigla": "MT", "nome": "Mato Grosso" },
    { "sigla": "MS", "nome": "Mato Grosso do Sul" },
    { "sigla": "MG", "nome": "Minas Gerais" },
    { "sigla": "PA", "nome": "Pará" },
    { "sigla": "PB", "nome": "Paraíba" },
    { "sigla": "PR", "nome": "Paraná" },
    { "sigla": "PE", "nome": "Pernambuco" },
    { "sigla": "PI", "nome": "Piauí" },
    { "sigla": "RJ", "nome": "Rio de Janeiro" },
    { "sigla": "RN", "nome": "Rio Grande do Norte" },
    { "sigla": "RS", "nome": "Rio Grande do Sul" },
    { "sigla": "RO", "nome": "Rondônia" },
    { "sigla": "RR", "nome": "Roraima" },
    { "sigla": "SC", "nome": "Santa Catarina" },
    { "sigla": "SP", "nome": "São Paulo" },
    { "sigla": "SE", "nome": "Sergipe" },
    { "sigla": "TO", "nome": "Tocantins" }
  ];

  useEffect(() => {
    if (onEdit) {
      const empresa = ref.current;

      empresa.nome.value = onEdit.nome;
      empresa.cnpj.value = onEdit.cnpj;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empresa = ref.current;

    if (
      !empresa.nome.value ||
      !empresa.cnpj.value ||
      !estadoSelecionado
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:5000/empresa/" + onEdit.cnpj, {
          nome: empresa.nome.value,
          cnpj: empresa.cnpj.value,
          estado: estadoSelecionado
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:5000/empresa/", {
          nome: empresa.nome.value,
          cnpj: empresa.cnpj.value,
          estado: estadoSelecionado,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    empresa.nome.value = "";
    empresa.cnpj.value = "";
    setEstadoSelecionado("");

    setOnEdit(null);
    getEmpresa();
  };
  return (
    <form className="Formulario" ref={ref} onSubmit={handleSubmit}>
      <label>nome</label>
      <input name="nome" placeholder="..." />
      <label>cnpj</label>
      <input name="cnpj" placeholder="..." />
      <label>estado</label>
      <select name="estado"  value={estadoSelecionado} onChange={handleChangeEstado}>
        {estados.map((estado) => (
          <option key={estado.sigla} value={estado.sigla}>
            {estado.sigla} - {estado.nome}
          </option>
        ))}
      </select>

      <button type="submit" className="submit">cadastrar</button>
    </form>
  );
}

export default Formulario;
