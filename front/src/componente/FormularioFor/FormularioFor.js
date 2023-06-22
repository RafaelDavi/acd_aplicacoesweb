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

    const dataNascimento = new Date(fornecedor.dataNascimento.value);
    const idadeMinima = new Date();
    idadeMinima.setFullYear(idadeMinima.getFullYear() - 18);

    if (fornecedor.cp.value.length < 12 && dataNascimento > idadeMinima) {
      return toast.warn("É necessário ter mais de 18 anos para cadastrar.");
    }

    if (
      !fornecedor.nome.value ||
      !fornecedor.cp.value ||
      !fornecedor.telefone.value ||
      (fornecedor.cp.value && fornecedor.cp.value.length === 11)
    ) {
      if(!fornecedor.rg.value || !fornecedor.dataNascimento.value){
        return toast.warn("Preencha todos os campos  para o CPF corretamente!");
      }
      
    }

    
    if (
      !fornecedor.nome.value ||
      !fornecedor.cp.value ||
      !fornecedor.telefone.value ||
      fornecedor.cp.value.length < 14 ||
      fornecedor.cp.value.length > 14 
    ) {
      return toast.warn("Preencha todos os campos para o CNPJ corretamente!");
    }
    

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
          dataNascimento: fornecedor.dataNascimento.value,
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
      <label>RG</label>
      <input name="rg" />
      <label>Data Nascimento</label>
      <input name="dataNascimento" type="date" />
      <button type="submit" className="submit">cadastrar</button>
    </form>
  );
};

export default FormularioFor;
