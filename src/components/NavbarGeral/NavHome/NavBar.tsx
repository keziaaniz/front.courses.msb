import React from 'react';
import styled from "styled-components";
import {
  useHistory,
} from "react-router-dom";

const Button = styled.a`
  color: #7374d2;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  text-decoration: none;
  &:hover {
  color: #81bc85;
  text-decoration: underline;
}
`;

const Nav = styled.nav`
width: 100%;
height: 3rem;

`;

const NavBar = () => {
  const history = useHistory();

  return (
    <>
      <div>
        <nav className="perfis">
          <div>
            <h3>Área do</h3>
            <Button onClick={() => history.push('formador')}>Formador|</Button>
            <Button onClick={() => history.push('aluno')}>
              Aluno
            </Button>
          </div>
          <div>
            <Button onClick={() => history.push('adm')}>
              Administrador
            </Button>
          </div>
        </nav>
        <nav className="geral">
          <div className="Courses">
            <li>
              <Button onClick={() => history.push('courses')}>
                Cursos
              </Button>
              <ul className="dropdown-menu">
                <li>
                  <Button onClick={() => history.push('calendar')}>
                    Calendário das aulas
                  </Button>
                </li>
              </ul>
            </li>
          </div>
          <div>
            <Button onClick={() => history.push('login')}>
              Entre
            </Button>
          </div>
          <div>
            <Button onClick={() => history.push('register')}>
              Inscreva-se
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
