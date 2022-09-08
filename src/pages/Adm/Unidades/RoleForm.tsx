import React, { useRef, useCallback, useState } from 'react';
import * as yup from 'yup';
import { Form } from '@unform/web';
import { useRole } from '../../../hooks/funcao';
import Field from "../../../components/Fields/Field";
import NavBar from "../../../components/NavbarGeral/Offcanva/NavBar";
import TableRole from "../../../components/Tables/Funcao/Index";
import getValidationErrors from "../../../utils/getValidationErrors";
import Modal from '../../../components/Modal/Modal';
import { Button, Divider } from "../../../components/Tables/styles";
import { Container, AddButton, CloseModal } from '../../../global/globalStyle';

const RoleForm = () => {
  const { addRole } = useRole();
  const [open, setOpen] = useState(false);

  const formRef = useRef<any>(null);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});

        const Schema = yup.object().shape({
          nome: yup.string().required('campo obrigatório').max(60, 'Máximo 60 caracteres'),
        });
        await Schema.validate(data, {
          abortEarly: false,
        });
        addRole({ id: Date.now(), ...data, unit: [] });
        setOpen(false);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [addRole],
  );

  return (
    <>
      <Container>
        <div>
          <NavBar />
        </div>
        <div style={{
          width: '100%', padding: '0', minHeight: '100%',
        }}
        >
          <Button onClick={() => { setOpen(true); }} type="button">Nova Função</Button>
          <Modal open={open} setOpen={setOpen}>
            <div style={{ margin: 'auto', width: '50%' }}>
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
              >
                <h2>Cadastro de Funções</h2>
                <Divider />
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome da Função</label>
                  <Field id="nome" placeholder="função" name="nome" editor="textbox" />
                </div>
                <AddButton>Adicionar função</AddButton>
              </Form>
              <CloseModal onClick={() => { setOpen(false); }}>Fechar</CloseModal>
            </div>
          </Modal>
          <TableRole />
        </div>
      </Container>
    </>
  );
};
export default RoleForm;
