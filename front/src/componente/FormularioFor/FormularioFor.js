import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./FormularioFor.css";

const FormularioFor = ({ getFornecedor, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      console.log("onEdit:", onEdit);
      const fornecedor = ref.current;

      fornecedor.nome.value = onEdit.nome;
      fornecedor.cp.value = onEdit.cp;
      fornecedor.telefone.value = onEdit.telefone;
      fornecedor.rg.value = onEdit.rg;
      fornecedor.dataNascimento.value = onEdit.dataNascimento;
    }
  }, [onEdit]);

  const handleSubmitFor = async (e) => {
    e.preventDefault();

    const fornecedor = ref.current;

    let cpTipo;

    switch (fornecedor.cp.value.length) {
      case 11:
        cpTipo = 'CPF';
        break;
      case 14:
        cpTipo = 'CNPJ';
        break;
      default:
        return toast.warn("CPF/CNPJ invalido");
    }



    if (cpTipo === 'CPF') {
      if (
        !fornecedor.nome.value ||
        !fornecedor.telefone.value ||
        !fornecedor.rg.value ||
        !fornecedor.dataNascimento.value) {
        const dataNascimento = new Date(fornecedor.dataNascimento.value);
        const idadeMinima = new Date();
        idadeMinima.setFullYear(idadeMinima.getFullYear() - 18);

        if (cpTipo === 'CPF' && dataNascimento > idadeMinima) {
          return toast.warn("É necessário ter mais de 18 anos para cadastrar.");
        }else{
        return toast.warn("Preencha todos os campos  para o CPF corretamente!");
      }}
    }

    if (cpTipo === 'CNPJ') {
      if (
        !fornecedor.nome.value ||
        !fornecedor.telefone.value) {
        return toast.warn("Preencha todos os campos  para o CNPJ corretamente!");
      }else{
        fornecedor.rg.value = 'CNPJ';
        fornecedor.dataNascimento.value = 'CNPJ';
      }
    }

    const dataNascimentoValue = fornecedor.dataNascimento.value || null;

    if (onEdit) {
      await axios
        .put("http://localhost:5000/fornecedor/" + onEdit.cnpj, {
          nome: fornecedor.nome.value,
          cp: fornecedor.cp.value,
          telefone: fornecedor.telefone.value,
          rg: fornecedor.rg.value,
          dataNascimento: fornecedor.dataNascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:5000/fornecedor/", {
          nome: fornecedor.nome.value,
          cp: fornecedor.cp.value,
          telefone: fornecedor.telefone.value,
          rg: fornecedor.rg.value,
          dataNascimento: dataNascimentoValue
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    fornecedor.nome.value = "";
    fornecedor.cp.value = "";
    fornecedor.telefone.value = "";
    fornecedor.rg.value = "";
    fornecedor.dataNascimento.value = "";

    setOnEdit(null);
    getFornecedor();
  };

  return (
    <form className="FormularioFor" ref={ref} onSubmit={handleSubmitFor}>
      <label>nome</label>
      <input name="nome" />
      <label>CPF/CNPJ</label>
      <input name="cp" />
      <label>telefone</label>
      <input name="telefone" />
      <label>RG <b>obrigatorio para CPF</b></label>
      <input name="rg"/>
      <label>Data Nascimento  <b>obrigatorio para CPF</b></label>
      <input name="dataNascimento" type="date"/>
      <button type="submit" className="submit">cadastrar</button>
    </form>
  );
};

export default FormularioFor;
