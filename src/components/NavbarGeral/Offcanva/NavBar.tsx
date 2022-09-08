import React, { useState } from 'react';
import styled from "styled-components";
import {
  useHistory,
} from "react-router-dom";
import Offcanva from './OffCanva';

import Menu from '../../../Images/icons/Menu';
import Circle from '../../../Images/icons/CircleGrafic';
import Square from '../../../Images/icons/Squares2';
import Units from '../../../Images/icons/Units';
import Team from '../../../Images/icons/Team2';
import Config from '../../../Images/icons/ConfigIcon';
import Relatorios from '../../../Images/icons/Relatorios';
import Secretaria from '../../../Images/icons/Secretaria';
import Brasao from '../../../Images/Images/brasao-do-amapa.png';
import {
  Canva, Header, Row, Icon, IconDisplay, Logo, ButtonCanva, DivIconDisplay,
} from '../styles';

const NavBar = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      height: '100vh',
      padding: '0',
      margin: '0',
      zIndex: '1',
      top: '0',
      left: '0',
      alignContent: 'center',
      marginRight: '15px',
      width: '100px',
    }}
    >
      <div style={{
        backgroundColor: 'rgb(52, 165, 122)', width: '100px', height: '100%', marginRight: '15px', alignItems: 'center', padding: '0',
      }}
      >
        <div style={{
          width: '100%', display: 'flex', flexDirection: 'column', margin: '0', padding: '0', height: '100%',
        }}
        >
          <div style={{
            backgroundColor: 'rgb(39,96,80)', height: '100px', width: '100%', alignContent: 'center',
          }}
          >
            <div style={{
              height: '35px', width: '35px', marginLeft: '30px', marginTop: '25px',
            }}
            >
              <i
                style={{
                  height: '15px', width: '15px', fontSize: '15px', fill: 'rgb(245, 245, 220)',
                }}
                onClick={() => { setOpen(true); }}
              >
                <Menu />
              </i>
            </div>
          </div>
          <div style={{
            height: '100%', width: '60px', margin: '10px', marginLeft: '10px',
          }}
          >
            <DivIconDisplay>
              <IconDisplay><Circle /></IconDisplay>
            </DivIconDisplay>
            <DivIconDisplay>
              <IconDisplay><Square /></IconDisplay>
            </DivIconDisplay>
            <DivIconDisplay>
              <IconDisplay><Units /></IconDisplay>
            </DivIconDisplay>
            <DivIconDisplay>
              <IconDisplay><Team /></IconDisplay>
            </DivIconDisplay>
            <DivIconDisplay>
              <IconDisplay><Config /></IconDisplay>
            </DivIconDisplay>
            <DivIconDisplay>
              <IconDisplay><Relatorios /></IconDisplay>
            </DivIconDisplay>
            <DivIconDisplay>
              <IconDisplay><Secretaria /></IconDisplay>
            </DivIconDisplay>
          </div>
        </div>
      </div>

      <Offcanva
        open={open}
        setOpen={setOpen}
      >
        <Canva>
          <Header>
            <div className="logo">
              <Logo src={Brasao} />
              <div style={{ margin: 'auto', width: '100%', marginTop: '8px' }}>
                <h6>
                  SECRETARIA DO ESTADO
                </h6>
                <h6>
                  DA EDUCAÇÃO DO AMAPÁ
                </h6>
              </div>
            </div>
          </Header>
          <div>
            <Row>
              <Icon><Circle /></Icon>
              <ButtonCanva onClick={() => history.push('/adm')} className="nav-link">Dashboard</ButtonCanva>
            </Row>
            <Row>
              <Icon><Square /></Icon>
              <ButtonCanva>Gerenciar</ButtonCanva>
            </Row>
            <Row className="nav-item dropdown">
              <Icon><Team /></Icon>
              <ButtonCanva className="nav-link dropdown-toggle" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Colaboradores</ButtonCanva>
              <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                <li><ButtonCanva onClick={() => history.push("/adm/colab/server")} className="dropdown-item">Servidores e Professores</ButtonCanva></li>
                <li><ButtonCanva onClick={() => history.push('/adm/colab/users')} className="dropdown-item">Perfil de Usuários</ButtonCanva></li>
              </ul>
            </Row>
            <Row className="nav-item dropdown">
              <Icon><Units /></Icon>
              <ButtonCanva className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Unidades e Funções</ButtonCanva>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><ButtonCanva onClick={() => history.push('/adm/unit')} className="dropdown-item">Unidades</ButtonCanva></li>
                <li><ButtonCanva onClick={() => history.push('/adm/role')} className="dropdown-item">Funções</ButtonCanva></li>
              </ul>
            </Row>
            <Row>
              <Icon><Relatorios /></Icon>
              <ButtonCanva>Relatórios</ButtonCanva>
            </Row>
            <Row>
              <Icon><Secretaria /></Icon>
              <ButtonCanva>Secretaria</ButtonCanva>
            </Row>
            <Row>
              <Icon><Config /></Icon>
              <ButtonCanva>Configurações</ButtonCanva>
            </Row>
          </div>
          <ButtonCanva onClick={() => { setOpen(false); }}>X</ButtonCanva>
        </Canva>
      </Offcanva>
    </div>
  );
};

export default NavBar;
