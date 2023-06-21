import { db } from "../db.js";

export const getEmpresa = (_, res) => {
  const q = "SELECT * FROM empresa";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addEmpresa = (req, res) => {
  const q = "INSERT INTO  empresa(`nome`,`cnpj`,`estado`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.cnpj,
    req.body.estado
  ];

  db.query(q, [values], (err) =>{
    if(err) return res.json(err);

    return res.status(200).json("Empresa criada com sucesso");
  });
};

export const updateEmpresa = (req, res) => {
  const q =
    "UPDATE empresa SET `nome` = ?, `cnpj` = ?, `estado` = ? WHERE `cnpj` = ?";

  const values = [
    req.body.nome,
    req.body.cnpj,
    req.body.estado,
    req.body.cnpj,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Empresa atualizada com sucesso.");
  });
};

export const deleteEmpresa = (req, res) => {
  const q = "DELETE FROM empresa WHERE `cnpj` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Empresa deletada com sucesso.");
  });
};
