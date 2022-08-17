import React from 'react';
import styled from "styled-components";
import {
  useHistory,
} from "react-router-dom";

const Button = styled.a`
  color: #7374d2;
  font-size: 1.2rem;
  margin: 0;
  padding: 0.25em 1em;
  text-decoration: none;
  &:hover {
  color: #81bc85;
  text-decoration: underline;
}
`;

const NavBar = () => {
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <Button onClick={() => history.push('adm')} className="nav-link">Home</Button>
            </li>
            <li className="nav-item dropdown">
              <Button onClick={() => history.push("/adm/colab")} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Colaboradores</Button>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li className="nav-item dropdown">
                  <Button onClick={() => history.push("/adm/colab/servers")} className="nav-link dropdown-toggle">Servidores e Professores</Button>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><Button onClick={() => history.push('/adm/colab/servers/list')}>Lista de Servidores e Professores</Button></li>
                    <li><Button onClick={() => history.push('/adm/colab/servers/create')}>Cadastro de Servidores e Professores</Button></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Button onClick={() => history.push("/adm/colab/users")} className="nav-link dropdown-toggle">Usuários</Button>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    <li><Button onClick={() => history.push('adm/colab/users/list')}>Usuários</Button></li>
                    <li><Button onClick={() => history.push('adm/colab/users/form')}>Cadastro de Usuários</Button></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Button onClick={() => history.push('adm/unit')} className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Unidades e Funções</Button>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <Button onClick={() => history.push('adm/unit')} className="dropdown-item">Unidades</Button>
                <Button onClick={() => history.push('adm/role')} className="dropdown-item">Funções</Button>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
