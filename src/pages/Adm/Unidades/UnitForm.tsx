import React, { useRef, useCallback, useState } from "react";
import * as yup from 'yup';
import { Form } from '@unform/web';
import { useUnit } from "../../../hooks/unit";
import getValidationErrors from '../../../utils/getValidationErrors';
import Container from "./Styles";
import Field from "../../../components/Fields/Field";
import NavBar from "../../../components/NavbarGeral/Offcanva/NavBar";
import TableUnit from "../../../components/Tables/Unidade/Index";
import Modal from '../../../components/Modal/Modal';
import { Button, Divider } from "../../../components/Tables/styles";
import { AddButton, CloseModal } from '../../../global/globalStyle';

const Unit = () => {
  const { addUnit } = useUnit();
  const [open, setOpen] = useState(false);

  const formRef = useRef<any>(null);

  const handleSubmit = useCallback(
    async (data: any) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});
        const Schema = yup.object().shape({
          initials: yup.string().required('campo obrigatório').min(2, 'Mínimo 2 caracteres').max(5, 'Máximo 5 caracteres'),
          nome: yup.string().required('campo obrigatório'),
        });
        await Schema.validate(data, {
          abortEarly: false,
        });

        addUnit({ id: Date.now(), ...data });
        setOpen(false);
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
      }
    },
    [addUnit],
  );

  return (
    <div style={{ display: 'flex', padding: '0' }}>
      <div>
        <NavBar />
      </div>
      <div style={{
        width: '100%', padding: '0', minHeight: '100%',
      }}
      >
        <Button onClick={() => { setOpen(true); }} type="button">Nova Unidade</Button>
        <Modal open={open} setOpen={setOpen}>
          <Container className="mb-3">
            <h2>Cadastro de Unidades</h2>
            <Divider />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="initials" className="form-label">Sigla</label>
                <Field id="initials" editor="textbox" name="initials" placeholder="escreva a sigla" />
              </div>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome da Unidade</label>
                <Field id="nome" editor="textbox" name="nome" placeholder="escreva a unidade" />
              </div>
              <AddButton> Adicionar Unidade</AddButton>
            </Form>
            <CloseModal onClick={() => { setOpen(false); }}>x</CloseModal>
          </Container>
        </Modal>
        <TableUnit />
      </div>

    </div>
  );
};

export default Unit;
