import express from "express";
import { getEmpresa, addEmpresa, updateEmpresa, deleteEmpresa} from "../controllers/empresa.js";
import { addFornecedor, deleteFornecedor, getFornecedor, updateFornecedor } from "../controllers/fornecedor.js";
import { addRelacao, deleteRelacao, getRelacao, getRelacaoID, relacaoEmpresaFornecedor } from "../controllers/relacao.js";

const router = express.Router()

router.get("/empresa", getEmpresa)
router.post("/empresa", addEmpresa)
router.put("/empresa/:id", updateEmpresa)
router.delete("/empresa/:id", deleteEmpresa)

router.get("/fornecedor", getFornecedor)
router.post("/fornecedor", addFornecedor)
router.put("/fornecedor/:id", updateFornecedor)
router.delete("/fornecedor/:id", deleteFornecedor)

router.get("/relacao", getRelacao)
router.get("/relacao/:id", getRelacaoID)
router.post("/relacao", addRelacao)
router.delete("/relacao/:id", deleteRelacao)
router.get("/relacaoEmpresa/:id", relacaoEmpresaFornecedor)


export default router
