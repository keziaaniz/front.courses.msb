import React, { useRef, useCallback } from "react";
import * as yup from 'yup';
import { Form } from '@unform/web';
import { useUnit } from "../../../hooks/unit";
import getValidationErrors from '../../../utils/getValidationErrors';
import Container from "./Styles";
import Field from "../../../components/Fields/Field";
import NavBar from "../../../components/NavbarGeral/NavAdmin/NavBar";
import TableUnit from "../../../components/Tables/Unidade/Index";

const Unit = () => {
  const { addUnit } = useUnit();
  const formRef = useRef<any>(null);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const Schema = yup.object().shape({
          initials: yup.string().required('campo obrigatório').min(2, 'Mínimo 2 caracteres').max(5, 'Máximo 5 caracteres'),
          unit: yup.string().required('campo obrigatório'),
        });
        await Schema.validate(data, {
          abortEarly: false,
        });

        addUnit({ id: Date.now(), ...data });
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
    <div>
      <NavBar />
      <Container className="mb-3">
        <div className="alert-info" role="alert">
          <h2>Cadastro de Unidades</h2>
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inittials" className="form-label">Sigla</label>
            <Field id="inittials" editor="textbox" name="inittials" placeholder="escreva a sigla" />
          </div>
          <div className="mb-3">
            <label htmlFor="unit" className="form-label">Nome da Unidade</label>
            <Field id="unit" editor="textbox" name="unit" placeholder="escreva a unidade" />
          </div>
          <button> SAVE</button>
        </Form>
      </Container>

    </div>
  );
};

export default Unit;
