import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./Formulario.css";

const Formulario = ({ getEmpresa, onEdit, setOnEdit }) => {
        const ref = useRef();
      
        useEffect(() => {
          if (onEdit) {
            const empresa = ref.current;
      
            empresa.nome.value = onEdit.nome;
            empresa.cnpj.value = onEdit.cnpj;
            empresa.estado.value = onEdit.estado;
          }
        }, [onEdit]);
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          const empresa = ref.current;
      
          if (
            !empresa.nome.value ||
            !empresa.cnpj.value ||
            !empresa.estado.value
          ) {
            return toast.warn("Preencha todos os campos!");
          }
      
          if (onEdit) {
            await axios
              .put("http://localhost:5000/empresa/" + onEdit.cnpj, {
                nome: empresa.nome.value,
                cnpj: empresa.cnpj.value,
                estado: empresa.estado.value
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
          } else {
            await axios
              .post("http://localhost:5000/empresa/", {
                nome: empresa.nome.value,
                cnpj: empresa.cnpj.value,
                estado: empresa.estado.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
          }
      
          empresa.nome.value = "";
          empresa.cnpj.value = "";
          empresa.estado.value = "";
      
          setOnEdit(null);
          getEmpresa();
        };
  return (
    <form className="Formulario" ref={ref} onSubmit={handleSubmit}>
      <label>nome</label>
      <input name="nome" placeholder="..."/>
      <label>cnpj</label>
      <input name="cnpj"  placeholder="..."/>
      <label>estado</label>
      <input name="estado"  placeholder="..."/>
      <button type="submit" className="submit">cadastrar</button>
    </form>
  );
}

export default Formulario;
