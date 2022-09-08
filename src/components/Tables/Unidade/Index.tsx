import React, { useState, useRef, useCallback } from 'react';
import * as yup from "yup";
import { Form } from '@unform/web';
import { Table } from 'reactstrap';

import Field from '../../Fields/Field';
import { useUnit } from '../../../hooks/unit';
import { useRole } from '../../../hooks/funcao';

import Modal from '../../Modal/Modal';
import { Button, DelButton } from '../styles';
import getValidationErrors from '../../../utils/getValidationErrors';

const TableUnit = () => {
  const { units, updateUnit, removeUnit } = useUnit();
  const { roles } = useRole();
  const formRef = useRef<any>(null);

  const [isUnitUpdate, setIsUnitUpdate] = useState<any>(null);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    console.log(units);
  }, [units]);

  React.useEffect(() => {
    console.log(roles);
  }, [roles]);

  const handleSubmit = useCallback(
    async (data: any) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          initials: yup.string().required('Campo obrigatório').min(2, 'Mínino de 2 caracteres'),
          nome: yup.string().required('Campo obrigatório'),
          funcao: yup.string().required('Campo obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        updateUnit({ ...isUnitUpdate, ...data });
        setIsUnitUpdate(null);
        setOpen(false);
      } catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [updateUnit, isUnitUpdate],
  );

  return (
    <>
      <Table
        hover
        responsive
        striped
      >
        <thead className="table-primary">
          <th>Id</th>
          <th>Sigla</th>
          <th>Unidade</th>
          <th>Função</th>
          <th>Ações</th>
        </thead>
        <tbody>
          {units.map((item) => (
            <tr className="table-light">
              <th scope="row">
                {item.id}
              </th>
              <td>
                {item.initials}
              </td>
              <td>
                {item.nome}
              </td>
              <td>
                {item.funcao}
              </td>
              <td>
                <Button onClick={() => { setIsUnitUpdate(item); setOpen(true); }} type="button">Atualizar</Button>
                <DelButton onClick={() => { removeUnit(item.id); }} type="button">Remover</DelButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} setOpen={setOpen}>
        <div style={{ margin: 'auto' }}>
          <button onClick={() => { setOpen(false); }}>Fechar</button>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={isUnitUpdate}
          >
            <Field
              id="initials"
              editor="textbox"
              name="initials"
              placeholder="escreva a sigla"
              type="text"
            />
            <Field
              id="nome"
              editor="textbox"
              placeholder="escreva a unidade"
              name="nome"
              type="text"
            />
            <Field
              id="funcao"
              editor="dropdown"
              name="funcao"
              multiple
              options={roles}
            />
            <button>
              Atualizar
            </button>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default TableUnit;
