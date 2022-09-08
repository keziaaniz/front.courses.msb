import * as React from 'react';
import Navbar from '../../components/NavbarGeral/Offcanva/NavBar';
import { Container, ContainerFluid } from '../../global/globalStyle';

const Admin: React.FC = () => (
  <ContainerFluid>
    <Container>
      <div>
        <Navbar />
      </div>
      <div style={{ minHeight: '100%' }}>
        <h1> HOME ADMIN</h1>
        <h2>Cursos oferecidos</h2>
        <h2>calendário</h2>
        <h2>Agenda</h2>
        <h2>Gráfico</h2>
      </div>
    </Container>
  </ContainerFluid>
);

export default Admin;
