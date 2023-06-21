import React from "react";
import "./Menu.css";
import axios from "axios";
import { toast } from "react-toastify";


const Menu = () => {
    const handleScroll = (targetId) => {
        const element = document.querySelector(`.${targetId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
  
  return (
    <div className="Menu">
      <ul>
        <li onClick={() => handleScroll('menuempresa')}>Empresa</li>
        <li onClick={() => handleScroll('menufornecedor')}>Fornecedor</li>
        <li onClick={() => handleScroll('cadastros')}>Cadastros</li>
        <li onClick={() => handleScroll('cadastrosEmp')} className="sub">Empresa</li>
        <li onClick={() => handleScroll('cadastrosFor')} className="sub">Fornecedor</li>
        <li onClick={() => handleScroll('cadastrosRel')} className="sub">Relação</li>
      </ul>    
    </div>
  );
};

export default Menu;
