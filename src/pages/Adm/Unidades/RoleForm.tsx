import React, { useRef, useCallback } from 'react';
import * as yup from 'yup';
import { Form } from '@unform/web';
import { useRole } from '../../../hooks/funcao';
import Field from "../../../components/Fields/Field";
import NavBar from "../../../components/NavbarGeral/NavAdmin/NavBar";
import TableRole from '../../../components/Tables/Funcao/Index';

const RoleForm = () => {
  const { addRole } = useRole();
  const formRef = useRef<any>(null);
  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const Schema = yup.object().shape({
          initials: yup.string().required('campo obrigatório').min(2, 'Mínimo 2 caracteres').max(5, 'Máximo 5 caracteres'),
          role: yup.string().required('campo obrigatório').max(60, 'Máximo 60 caracteres'),
        });
        await Schema.validate(data, {
          abortEarly: false,
        });
        addRole({ id: Date.now(), ...data });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
        // const error = getValidationErrors(err);
        // formRef.current?.setErrors(error);
        }
      }
    },
    [addRole],
  );

  return (
    <>
      <NavBar />
      <div className="mb-3">
        <div className="alert-info" role="alert">
          Cadastro de Funções
        </div>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Field id="role" label="Função" placeholder="função" name="role" editor="textbox" />
          <button>Add função</button>
        </Form>
      </div>
      <TableRole />
    </>
  );
};
export default RoleForm;
