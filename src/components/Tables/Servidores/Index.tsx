import React, { useState, useRef, useCallback } from 'react';
import * as yup from "yup";
import { Table } from 'reactstrap';
import { Form } from '@unform/web';

import Field from '../../Fields/Field';
import { useUnit } from '../../../hooks/unit';
import { useRole } from '../../../hooks/funcao';
import { useServer } from '../../../hooks/server';
import { Button, DelButton, StylesForm } from '../styles';
import Modal from '../../Modal/Modal';
import getValidationErrors from '../../../utils/getValidationErrors';

const TableServer = () => {
  const { server, updateServer, removeServer } = useServer();
  const { units } = useUnit();
  const [selectedUnits, setSelectedUnits] = useState<any>([]);

  const { roles } = useRole();
  const [selectedRole, setSelectedRole] = useState<any>([]);

  const formRef = useRef<any>(null);

  const [isServerUpdate, setIsServerUpdate] = useState<any>(null);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    console.log(server);
  }, [server]);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          sigla: yup.string().required('Campo obrigatório').min(2, 'Mínino de 2 caracteres'),
          nome: yup.string().required('Campo obrigatório'),
          cpf: yup.string().required('Campo obrigatório'),
          age: yup.string().required('Campo obrigatório'),
          cell: yup.string().required('Campo obrigatório'),
          registrationNumber: yup.string().required('Campo obrigatório'),
          email: yup.string().required('Campo obrigatório'),
          unidade: yup.string().required('Campo obrigatório'),
          funcao: yup.string().required('Campo obrigatório'),
          perfil: yup.string().required('Campo obrigatório'),
          title: yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const array = [];
        server.forEach((item) => array.push(...item.unidade.map((subtitem:any) => subtitem)));
        array.push(...selectedUnits.map((item:any) => item));

        server.forEach((item) => array.push(...item.funcao.map((subtitem:any) => subtitem)));
        array.push(...selectedRole.map((item:any) => item));

        updateServer({
          ...isServerUpdate, ...data, unidade: selectedUnits, funcao: selectedRole,
        });
        setIsServerUpdate(null);
        setOpen(false);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [server, updateServer, isServerUpdate, selectedUnits, selectedRole],
  );

  return (
    <>
      <Table
        hover
        responsive
        striped
      >
        <tr className="table-primary">
          <th>Id</th>
          <th>Servidor</th>
          <th>CPF</th>
          <th>Data de nascimento</th>
          <th>Celular</th>
          <th>Matrícula</th>
          <th>E-mail</th>
          <th>Unidade de lotação</th>
          <th>Função</th>
          <th>Perfil de usuário</th>
          <th>Titulação</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
        <tbody>
          {server?.map((item) => (
            <tr className="table-light">
              <th scope="row">
                {item.id}
              </th>
              <td>
                {item.nome}
              </td>
              <td>
                {item.cpf}
              </td>
              <td>
                {item.age}
              </td>
              <td>
                {item.cell}
              </td>
              <td>
                {item.registrationNumber}
              </td>
              <td>
                {item.email}
              </td>
              <td>
                {item.unidade}
              </td>
              <td>
                {item.funcao}
              </td>
              <td>
                {item.perfil}
              </td>
              <td>
                {item.title}
              </td>
              <td>
                <Button onClick={() => { setIsServerUpdate(item); setOpen(true); }} type="button" className="btn btn-dark">Atualizar</Button>
                <DelButton onClick={() => removeServer(item.id)} type="button" className="btn btn-danger">Remover</DelButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} setOpen={setOpen}>
        <StylesForm>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={isServerUpdate}
          >
            <Field
              id="nome"
              editor="textbox"
              name="nome"
              placeholder="atualize o nome do servidor"
              type="text"
            />
            <Field
              id="cpf"
              editor="textbox"
              placeholder="atualize o cpf"
              name="cpf"
              type="text"
            />
            <Field
              id="age"
              editor="textbox"
              placeholder="atualize a data de nascimento"
              name="age"
            />
            <Field
              id="cell"
              editor="textbox"
              placeholder="atualize o número de telefone"
              name="cell"
            />
            <Field
              id="registrationNumber"
              editor="textbox"
              placeholder="atualize a matrícula"
              name="registrationNumber"
            />

            <Field
              id="email"
              editor="textbox"
              placeholder="atualize o e-mail"
              name="email"
            />
            <Field
              multiple
              id="unidade"
              setValues={setSelectedUnits}
              options={units}
              editor="dropdown"
              placeholder="selecione a unidade"
              name="unidade"
            />
            <Field
              multiple
              id="funcao"
              setValues={setSelectedRole}
              options={roles}
              editor="dropdown"
              placeholder="selecione a função"
              name="funcao"
            />
            <Field
              id="perfil"
              editor="dropdown"
              placeholder="selecione o perfil"
              name="perfil"
            />
            <Field
              id="title"
              editor="textbox"
              placeholder="atualize o título"
              name="title"
            />
            <button>
              Atualizar
            </button>
          </Form>
        </StylesForm>
        <button onClick={() => { setOpen(false); }} className="btn btn-dark">Fechar</button>
      </Modal>
    </>
  );
};

export default TableServer;
