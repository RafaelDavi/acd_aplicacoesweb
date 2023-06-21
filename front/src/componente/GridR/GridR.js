import React from "react";
import './Grid.css';
import axios from "axios";
import { toast } from "react-toastify";

const GridR = ({dadosObj, set}) => {

  const handleDeleteRel = async (relacao) =>{
    await axios 
    .delete(`http://localhost:5000/relacao/${relacao.id}`)
    .then(({data}) => {
        const newArray = dadosObj.filter((fornecedor) => fornecedor.id !== relacao.id);

        set(newArray);
        toast.success(data);
    })
    .catch(({data}) => toast.error(data));

}



  return (
    <div className="Grid">
  <table>
    <thead>
      <tr>
        <th>CP</th>
        <th>CNPJ</th>
        <th>Exclusão</th>
      </tr>
    </thead>
    <tbody>
      {dadosObj.map((item, i) => (
        <tr key={i}>
          <td>{item.cp}</td>
          <td>{item.cnpj}</td>
          <td>
            <button onClick={() => handleDeleteRel(item)}>excluir</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
)}

export default GridR;
