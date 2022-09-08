import React, { useRef, useCallback } from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import {
  Button, FormGroup, Label,
} from 'reactstrap';
import { Form } from '@unform/web';
import { useAuth } from "../../hooks/auth";
import Field from "../../components/Fields/Field";
import getValidationErrors from '../../utils/getValidationErrors';

const Login = () => {
  const { signIn } = useAuth();
  const formRef = useRef<any>(null);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        console.log(data);

        const Schema = yup.object().shape({
          password: yup.string().required('campo obrigatório').min(6, 'Minimo 6 caracteres'),
        });

        await Schema.validate(data, {
          abortEarly: false,
        });

        signIn(data);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn],
  );

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div style={{ margin: 'auto', width: '30%', marginTop: '10%' }}>
          <h1 style={{ margin: 'auto', width: '30%', marginBottom: '5%' }}>Login</h1>
          <FormGroup>
            <Label htmlFor="email" className="form-label">E-maill</Label>
            <Field id="email" editor="textbox" name="email" placeholder="colocque seu email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password" className="form-label">Password</Label>
            <Field id="password" editor="password" name="password" placeholder="senha" />
          </FormGroup>
          <Button type="submit">Entrar</Button>
          <Button>Esqueceu login ou senha</Button>
          <Link to="/register" className="btn btn-link" style={{ background: 'green', color: '#7FFF00' }}>Registre-se</Link>
        </div>
      </Form>

    </>
  );
};

export default Login;
