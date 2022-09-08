import React from 'react';
import {
  useHistory,
} from "react-router-dom";
import { NaV, Button, ButtonDrop } from '../styles';

const NavBar = () => {
  const history = useHistory();

  return (
    <div className="nav-fill">
      <NaV>
        <ul className="navbar navbar-expand-lg">
          <div className="collapse navbar-collapse">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <li>
              <Button onClick={() => history.push('formador')} className=" nav-link">Formador</Button>
            </li>
            <li>

              <Button onClick={() => history.push('aluno')} className="nav-link">Aluno</Button>
            </li>
            <li>
              <Button onClick={() => history.push('adm')} className="nav-link">
                Administrador
              </Button>
            </li>

            <li className="dropdown">
              <Button onClick={() => history.push('courses')} className="dropbtn">
                Cursos
              </Button>
              <div className="dropdown-content">
                <ButtonDrop onClick={() => history.push('calendar')}>
                  Calendário das aulas
                </ButtonDrop>
              </div>
            </li>
            <li>
              <Button onClick={() => history.push('login')} className="nav-link">
                Entre
              </Button>
            </li>
          </div>
        </ul>
      </NaV>
    </div>
  );
};

export default NavBar;
