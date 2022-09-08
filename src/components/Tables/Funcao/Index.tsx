import React, { useState, useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import * as yup from "yup";
import { Table } from 'reactstrap';
import Field from '../../Fields/Field';
import { useUnit } from '../../../hooks/unit';
import { useRole } from '../../../hooks/funcao';
import getValidationErrors from '../../../utils/getValidationErrors';
import Modal from '../../Modal/Modal';
import { Button, DelButton } from '../styles';

const TableRole = () => {
  const { units } = useUnit();
  const {
    roles, updateRole, removeRole,
  } = useRole();

  const [selectedUnits, setSelectedUnits] = useState<any>([]);
  const formRef = useRef<any>(null);

  const [isRoleUpdate, setIsRoleUpdate] = useState<any>(null);
  const [open, setOpen] = useState(false);

  function hasDuplicates(array: any) {
    return (new Set(array)).size !== array.length;
  }

  const handleSubmit = useCallback(
    async (data: any) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          nome: yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const array = [];

        roles.forEach((item) => array.push(...item.unit.map((subtitem:any) => subtitem)));
        array.push(...selectedUnits.map((item:any) => item));
        if (hasDuplicates(array)) {
          // eslint-disable-next-line no-alert
          alert('Uma das unidades selecionadas já tem função');
          return;
        }
        updateRole({ ...isRoleUpdate, ...data, unit: selectedUnits });
        setIsRoleUpdate(null);
        setOpen(false);
      } catch (error) {
        console.log(error);
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [updateRole, roles, isRoleUpdate, selectedUnits],
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
          <th>Unidade</th>
          <th>Função</th>
          <th>Ações</th>
        </thead>
        <tbody>
          {roles.map((item) => (
            <tr className="table-light">
              <th scope="row">
                {item.id}
              </th>
              <td>
                {item.unit.map((item) => item).join(',')}
              </td>
              <td>
                {item.nome}
              </td>
              <td>
                <Button onClick={() => { setIsRoleUpdate(item); setOpen(true); }} type="button">Atualizar</Button>
                <DelButton onClick={() => removeRole(item.id)} type="button">Remover</DelButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal open={open} setOpen={setOpen}>
        <div style={{ margin: 'auto', width: '50%', marginTop: '10%' }}>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={isRoleUpdate}
          >
            <Field
              id="nome"
              editor="textbox"
              placeholder="escreva a função"
              name="nome"
            />
            <Field
              id="unit"
              editor="dropdown"
              multiple
              setValues={setSelectedUnits}
              name="unit"
              options={units}
            />
            <button type="submit">
              Atualizar
            </button>
          </Form>
        </div>
        <button onClick={() => { setOpen(false); }}>Fechar</button>
      </Modal>
    </>
  );
};

export default TableRole;
