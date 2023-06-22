import React from "react";
import "./Card.css";
import axios from "axios";
import { toast } from "react-toastify";
import Pesquisa from "../Pesquisa/Pesquisa";

const Card = ({ dadosObj, dadosObjEstrangeiro, dadosRelacao, setOnEditRel, set, setOnEdit, tipo }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleScroll = (targetId) => {
        const element = document.querySelector(`.${targetId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDelete = async (cnpj) => {
        await axios
            .delete(`http://localhost:5000/${tipo}/${cnpj}`)
            .then(({ data }) => {
                const newArray = dadosObj.filter((empresa) => empresa.cnpj && empresa.cnpj !== cnpj);

                set(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    const handleDeleteFor = async (cp) => {
        await axios
            .delete(`http://localhost:5000/${tipo}/${cp}`)
            .then(({ data }) => {
                const newArray = dadosObj.filter((fornecedor) => fornecedor.cp && fornecedor.cp !== cp);

                set(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };




    function documentoTipo(itemFor) {
        if (itemFor.cp.length > 11) {
            return "CNPJ";
        } else {
            return "CPF";
        }
    }

    return (
        <div className="Card">
            <h1 className={`menu${tipo}`}>{tipo.toUpperCase()}</h1>
            {tipo === "empresa" ? (
                dadosObj.map((item, i) => (
                    <div className="CardEmpresa" key={i}>
                        <div className="menu">
                            <button className="vermelho" onClick={() => handleDelete(item.cnpj)}>
                                excluir
                            </button>
                            <button className="amarelo" onClick={() => { handleScroll('cadastrosEmp'); handleEdit(item) }}>
                                editar
                            </button>

                        </div>
                        <h1>{item.nome}</h1>
                        <p>
                            <span>{item.estado}</span> CNPJ <b>{item.cnpj}</b>
                        </p>


                        <details>
                            <summary>Fornecedores <button className="add cinza" onClick={() => { handleScroll('cadastrosRel'); }}>+</button></summary>
                                <Pesquisa relacao={dadosRelacao} id={item.cnpj}/>

                        </details>
                    </div>
                ))
            ) : (
                dadosObj.map((itemFor, i) => (
                    <div className="CardFornecedor" id={i} key={i}>
                        <div className="menu">
                            <button className="vermelho" onClick={() => handleDeleteFor(itemFor.cnpj)}>
                                excluir
                            </button>
                            <button className="amarelo" onClick={() => { handleScroll('cadastrosFor'); handleEdit(itemFor) }}>
                                editar
                            </button>
                            <button className="amarelo" onClick={() => { handleScroll('cadastrosRel') }}>
                                adicionar fornecedor
                            </button>
                        </div>
                        <h1>{itemFor.nome}</h1>
                        <p>
                            <span>{documentoTipo(itemFor)}</span></p>
                        {documentoTipo(itemFor)} {itemFor.cp}

                        <p>telefone: {itemFor.telefone} </p>

                    </div>
                ))
            )}
        </div>
    );
};

export default Card;
