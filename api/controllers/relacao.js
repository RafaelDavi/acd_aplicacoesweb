import { db } from "../db.js";

export const getRelacao = (_, res) => {
  const q = "SELECT * FROM empresa_fornecedor;";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getRelacaoID = (req, res) => {
    const q = "SELECT * FROM empresa_fornecedor WHERE `cnpj` = ? || `cp` = ?";
  
    const values = [
        req.params.id,
        req.params.id
      ];

    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Fornecedor deletado com sucesso.");
    });
  };


export const addRelacao = (req, res) => {
    const q = "INSERT INTO empresa_fornecedor (cnpj, cp) VALUES (?);";
  
    const values = [
      req.body.cnpj,
      req.body.cp
    ];
  
    db.query(q, [values], (err) =>{
      if(err) return res.json(err);
  
      return res.status(200).json("Criada relação com sucesso");
    });
  };
  
  export const deleteRelacao = (req, res) => {

    const q = "DELETE FROM empresa_fornecedor WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);
    
        return res.status(200).json("Fornecedor deletado com sucesso.");
      });
  };
  

  export const relacaoEmpresaFornecedor = (req, res) => {
    const q = "SELECT f.* FROM empresa_fornecedor ef JOIN fornecedor f ON f.cp = ef.cp WHERE ef.cnpj = ?";
  
    const values = [
      req.params.id
    ];
  
    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
  
      return res.status(200).json(data);
    });
  };

