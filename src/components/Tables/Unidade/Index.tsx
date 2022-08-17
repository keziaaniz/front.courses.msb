import React, { useState, useRef, useCallback } from 'react';
import styled from "styled-components";
import * as yup from "yup";
import { Form } from '@unform/web';
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

const TableUnit = () => {
  const { units, updateUnit, removeUnit } = useUnit();
  const { roles } = useRole();
  const formRef = useRef<any>(null);

  const [isUnitUpdate, setIsUnitUpdate] = useState<any>(null);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    console.log(units);
  }, [units]);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          sigla: yup.string().required('Campo obrigatório').min(2, 'Mínino de 2 caracteres'),
          nome: yup.string().required('Campo obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        updateUnit({ ...isUnitUpdate, ...data });
        setIsUnitUpdate(null);
        setOpen(false);
      } catch (error) {
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
      <table>
        <tr className="table-primary">
          <th scope="col">Id</th>
          <th scope="col">Sigla</th>
          <th scope="col">Unidade</th>
          <th scope="col">Função</th>
          <th scope="col">Ações</th>
        </tr>
        <tbody>
          {units.map((item) => (
            <tbody>
              <td>
                {item.id}
              </td>
              <td>
                {item.initials}
              </td>
              <td>
                {item.unit}
              </td>
              <td>
                {item.role}
              </td>
              <td>
                <Button onClick={() => { setIsUnitUpdate(item); }} type="button">Atualizar</Button>
                <DelButton onClick={() => { removeUnit(item.id); }} type="button">Remover</DelButton>
              </td>
            </tbody>
          ))}
        </tbody>
      </table>
      <div style={{ margin: 'auto', width: '50%', marginTop: '10%' }}>
        <button onClick={() => { setOpen(false); }}>Fechar</button>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={isUnitUpdate}
        >
          <Field
            id="inittials"
            editor="textbox"
            name="inittials"
            placeholder="escreva a sigla"
            type="text"
          />
          <Field
            id="unit"
            editor="textbox"
            placeholder="escreva a unidade"
            name="unit"
          />
          <Field
            id="role"
            editor="dropdown"
            placeholder="selecione a função"
            name="role"
            options={roles}
          />
          <button>
            Atualizar
          </button>
        </Form>
      </div>
    </>
  );
};

export default TableUnit;
