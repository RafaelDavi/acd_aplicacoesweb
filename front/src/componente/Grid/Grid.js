import React from "react";
import './Grid.css';
import axios from "axios";
import { toast } from "react-toastify";

const Grid = ({dadosObj, dadosRelacao, set, setOnEdit, tipo}) => {



    const handleEdit = (item) => {
        setOnEdit(item);
    };


    const handleDelete = async (cnpj) =>{
        await axios 
        .delete(`http://localhost:5000/`+ tipo +`/`+ cnpj)
        .then(({data}) => {
            const newArray = dadosObj.filter((empresa) => empresa.cnpj !== cnpj);

            set(newArray);
            toast.success(data);
        })
        .catch(({data}) => toast.error(data));

        setOnEdit(null);

    }

    const handleDeleteFor = async (cp) =>{
      await axios 
      .delete(`http://localhost:5000/`+ tipo +`/`+ cp)
      .then(({data}) => {
          const newArray = dadosObj.filter((fornecedor) => fornecedor.cp !== cp);

          set(newArray);
          toast.success(data);
      })
      .catch(({data}) => toast.error(data));

      setOnEdit(null);

  }

  return (
    <div className="Grid">
        {tipo === "empresa" ? (
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>CNPJ</th>
        <th>Estado</th>
        <th>Contrato</th>
        <th>Edição</th>
        <th>Exclusão</th>
      </tr>
    </thead>
    <tbody>
      {dadosObj.map((item, i) => (
        <tr key={i}>
          <td>{item.nome}</td>
          <td>{item.cnpj}</td>
          <td>{item.estado}</td>
          <td><select>
          {dadosRelacao
          .filter((relacao) => relacao.cnpj === item.cnpj) // Filtra as relações com cnpj igual a item.cnpj
          .map((relacao, r) => (
            <option key={r}>{relacao.cp}</option>
          ))}
          </select></td>
          <td>
            <button onClick={() => handleEdit(item)}>editar</button>
          </td>
          <td>
            <button onClick={() => handleDelete(item.cnpj)}>excluir</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <table>
  <thead>
      <tr>
        <th>Nome</th>
        <th>CNPJ</th>
        <th>telefone</th>
        <th>RG</th>
        <th>dataNascimento</th>
        <th>contrato</th>
        <th>dataCadastro</th>
        <th>Edição</th>
        <th>Exclusão</th>
      </tr>
    </thead>
    <tbody>
      {dadosObj.map((item, i) => (
        <tr key={i}>
          <td>{item.nome}</td>
          <td>{item.cp}</td>
          <td>{item.telefone}</td>
          <td>{item.rg}</td>
          <td>{item.dataNascimento}</td>
          <td><select>
          {dadosRelacao
          .filter((relacao) => relacao.cp === item.cp) // Filtra as relações com cnpj igual a item.cnpj
          .map((relacao, r) => (
            <option key={r}>{relacao.cnpj}</option>
          ))}
          </select></td>
          <td>{item.dataCadastro}</td>
          <td>
            <button onClick={() => handleEdit(item)}>editar</button>
          </td>
          <td>
            <button onClick={() => handleDeleteFor(item.cp)}>excluir</button>
          </td>
        </tr>
      ))}
      </tbody>
  </table>
)}    
    </div>
  );
}

export default Grid;
