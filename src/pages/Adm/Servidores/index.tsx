import React, { useRef, useCallback, useState } from 'react';
import * as yup from 'yup';
import { Form } from '@unform/web';
import NavBar from '../../../components/NavbarGeral/Offcanva/NavBar';
import Field from '../../../components/Fields/Field';
import { useServer } from '../../../hooks/server';
import getValidationErrors from '../../../utils/getValidationErrors';
import TableServer from '../../../components/Tables/Servidores/Index';
import Modal from '../../../components/Modal/Modal';
import { Divider, Button } from '../../../components/Tables/styles';
import { Container, ContainerFluid } from '../../../global/globalStyle';

const ServerHome = () => {
  const { addServer } = useServer();
  const [open, setOpen] = useState(false);

  const formRef = useRef<any>(null);

  const handleSubmit = useCallback(
    async (data: any) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          nome: yup.string().required('Campo obrigatório'),
          cpf: yup.string().required('Campo obrigatório'),
          age: yup.string().required('Campo obrigatório'),
          cell: yup.string().required('Campo obrigatório'),
          registrationNumber: yup.string().required('Campo obrigatório'),
          email: yup.string().required('Campo obrigatório'),
          confirmEmail: yup.string().required('Campo obrigatório'),
          unit: yup.string().required('Campo obrigatório'),
          perfil: yup.string().required('Campo obrigatório'),
          role: yup.string().required('Campo obrigatório'),
          title: yup.string().required('Campo obrigatório'),
          password: yup.string().required('Campo obrigatório'),
          confirmPassword: yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        addServer({ id: Date.now(), ...data });
        setOpen(false);
      } catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [addServer],
  );

  return (
    <ContainerFluid>
      <Container>
        <div>
          <NavBar />
        </div>
        <div style={{
          width: '100%', padding: '0', minHeight: '100%',
        }}
        >
          <Button onClick={() => { setOpen(true); }} type="button">Adicionar Servidor</Button>
          <Modal open={open} setOpen={setOpen}>
            <div style={{
              margin: 'auto', width: '65%', marginTop: '5%', marginBottom: '10%',
            }}
            >
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <h1>Cadastro de Servidores</h1>
                <Divider />
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome completo</label>
                  <Field id="nome" placeholder="Nome completo" name="nome" editor="textbox" />
                </div>
                <div className="row g-3">
                  <div className="col-sm-4">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <Field id="cpf" placeholder="CPF" name="cpf" editor="textbox" />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="age" className="form-label">Data de nascimento</label>
                    <Field id="age" placeholder="Data de nascimento" name="age" editor="textbox" />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="cell" className="form-label">Número de celular</label>
                    <Field id="cell" placeholder="Número de celular" name="cell" editor="textbox" />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="registrationNumber" className="form-label">Número de matrícula</label>
                  <Field id="registrationNumber" placeholder="Número de matrícula" name="registrationNumber" editor="textbox" />
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <Field id="email" placeholder="E-mail" name="email" editor="textbox" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmEmail" className="form-label">
                      Confirmação de E-mail
                    </label>
                    <Field id="confirmEmail" placeholder="Confirmação de E-mail" name="confirmEmail" editor="textbox" />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="unit" className="form-label">
                    Unidade de Lotação -  (Droplist “Cadastro de Unidades/Função”)
                  </label>
                  <Field id="unit" placeholder="Unidade de Lotação" name="unit" editor="textbox" />
                </div>
                <div className="mb-3">
                  <label htmlFor="perfil" className="form-label">
                    Perfil de Usuário - outro cadastro
                  </label>
                  <Field id="perfil" placeholder="Perfil de Usuário" name="perfil" editor="textbox" />
                </div>
                <div className="mb-3">
                  <label htmlFor="professor" className="form-label">Professor ou Coordenador</label>
                  <Field id="professor" placeholder="professor" name="professor" editor="textbox" />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Função</label>
                  <Field id="role" placeholder="função" name="role" editor="textbox" />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Titulação  (botão “+” para adicionar mais titulações) (300 caracteres)
                  </label>
                  <Field id="title" placeholder="função" name="title" editor="multilinetextbox" />
                  <button>Adicione seus títulos</button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <Field id="password" placeholder="Senha" name="password" editor="password" />
                  </div>
                  <div className="col-md-6" style={{ marginBottom: "15px" }}>
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmação de senha
                    </label>
                    <Field id="confirmPassword" placeholder="Confirmação de senha" name="confirmPassword" editor="password" />
                  </div>
                </div>
                <button className="btn btn-outline-success">
                  Adicionar
                </button>
              </Form>
              <button onClick={() => { setOpen(false); }}>Fechar</button>
            </div>
          </Modal>
          <TableServer />
        </div>
      </Container>
    </ContainerFluid>
  );
};

export default ServerHome;
