import React, { useState, useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import * as yup from "yup";
import styled from "styled-components";
import Field from '../../Fields/Field';
import { useUnit } from '../../../hooks/unit';
import { useRole } from '../../../hooks/funcao';
import getValidationErrors from '../../../utils/getValidationErrors';

const Button = styled.button`
  color: #292cb1;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #292cb1;
  border-radius: 3px;
`;

const DelButton = styled(Button)`
  color: #f42e0c;
  border-color: #f42e0c;
`;

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

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(units);
  }, [units]);

  const handleSubmit = useCallback(
    async (data: any) => {
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
        updateRole({ ...isRoleUpdate, ...data, unidades: selectedUnits });
        setIsRoleUpdate(null);
        setOpen(false);
      } catch (error) {
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
      <table>
        <tr className="table-primary">
          <th>Id</th>
          <th>Sigla</th>
          <th>Unidade</th>
          <th>Função</th>
          <th>Ações</th>
        </tr>
        <tbody>
          {roles.map((item) => (
            <tr>
              <th>
                {item.id}
              </th>
              <td>
                {item.role}
              </td>
              <td>
                {item.unit.map((item) => item).join(',')}
              </td>
              <td>
                <Button onClick={() => { setIsRoleUpdate(item); }} type="button">Atualizar</Button>
                <DelButton onClick={() => { removeRole(item.id); }} type="button">Remover</DelButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ margin: 'auto', width: '50%', marginTop: '10%' }}>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={isRoleUpdate}
        >
          <Field
            id="role"
            editor="textbox"
            placeholder="escreva a função"
            name="role"
          />
          <Field
            id="unit"
            editor="dropdown"
            placeholder="selecione a unidade"
            setValues={setSelectedUnits}
            name="unit"
            options={units}
          />
          <button>
            Atualizar
          </button>
        </Form>
      </div>
    </>
  );
};

export default TableRole;
