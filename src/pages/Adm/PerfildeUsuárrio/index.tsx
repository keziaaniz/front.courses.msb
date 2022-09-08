import React from 'react';
import NavBar from '../../../components/NavbarGeral/Offcanva/NavBar';
import Field from '../../../components/Fields/Field';
import Icon from '../../../Images/icons/TeamFull';

import { Container, ContainerFluid } from '../../../global/globalStyle';

const User: React.FC = () => (
  <ContainerFluid>
    <Container>
      <div>
        <NavBar />
      </div>
      <div style={{
        width: '100%', padding: '0', minHeight: '100%',
      }}
      >
        <h1>User Home</h1>
        <div style={{ margin: 'auto', width: '50%', marginTop: '10%' }}>
          <form>
            <h5>oi</h5>
          </form>
        </div>
        <Icon />

        <h2>PARA QUE OS servidores possam ter as devidas permissões de acesso ao sistema.</h2>
        <h3>CRITÉRIOS DE ACEITE</h3>
        <p>
          1. O formulário de cadastro deverá conter os seguintes campos:
          • Nome do Perfil*
          • Checkbox com as permissões* ()
          2. Todos os campos são obrigatórios(*) e únicos
          3. O sistema deverá verificar se o nome já existe para evitar duplicação
          4. No Checkbox, o administrador deverá marcar as permissões para o perfil novo

        </p>
        <h3>FLUXO OPERACIONAL</h3>
        <p>
          1. O Administrador do sistema deverá estar na tela inicial após efetuar o login
          2. Na tela inicial, clicar “gerenciar”, em seguida clicar “Perfil de Usuário”, Clicar “Inserir Novo”
          3. Preencher os campos solicitados;
          4. Finalizar a operação clicando em “Salvar” ou cancelar a operação clicando em “Voltar”.
        </p>
      </div>
    </Container>
  </ContainerFluid>
);

export default User;
