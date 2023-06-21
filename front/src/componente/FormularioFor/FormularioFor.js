import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Formulario = ({ getFornecedor, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
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
  
    if (dataNascimento > idadeMinima) {
      return toast.warn("É necessário ter mais de 18 anos para cadastrar.");
    }

    if (fornecedor.cp.value.length < 12){
    if (
      !fornecedor.nome.value ||
      !fornecedor.cp.value ||
      !fornecedor.rg.value ||
      !fornecedor.dataNascimento.value ||
      !fornecedor.telefone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }} else {
    if (
      !fornecedor.nome.value ||
      !fornecedor.cp.value ||
      !fornecedor.telefone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }}
    

    if (onEdit) {
      await axios
        .put("http://localhost:5000/fornecedor/" + onEdit.cnpj, {
          nome: fornecedor.nome.value,
          cp: fornecedor.cp.value,
          telefone: fornecedor.telefone.value,
          rg: fornecedor.rg.value,
          dataNascimento: fornecedor.dataNascimento.value
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
    <form className="Formulario" ref={ref} onSubmit={handleSubmitFor}>
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
}

export default Formulario;
