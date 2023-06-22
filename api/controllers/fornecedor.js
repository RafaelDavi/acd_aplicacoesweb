import { db } from "../db.js";

export const getFornecedor = (_, res) => {
  const q = "SELECT * FROM fornecedor";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const addFornecedor = (req, res) => {
    const q = "INSERT INTO fornecedor (cp, nome, telefone, rg, dataNascimento) VALUES (?);";
  
    const values = [
      req.body.cp,
      req.body.nome,
      req.body.telefone,
      req.body.rg,
      req.body.dataNascimento
    ];
  
    db.query(q, [values], (err) =>{
      if(err) return res.json(err);
  
      return res.status(200).json("Fornecedor criado com sucesso");
    });
  };
  
  export const updateFornecedor = (req, res) => {
    const q =
      "UPDATE fornecedor SET `cp` = ?, `nome` = ?, `telefone` = ?, `rg` = ? WHERE `dataNascimento` = ?";
  
    const values = [
      req.body.cp,
      req.body.nome,
      req.body.telefone,
      req.body.rg,
      req.body.dataNascimento
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Fornecedor atualizada com sucesso.");
    });
  };
  
  export const deleteFornecedor = (req, res) => {
    const q = "DELETE FROM fornecedor WHERE `cp` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Fornecedor deletado com sucesso.");
    });
  };
  


