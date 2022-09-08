import React, { useRef, useCallback } from 'react';
import {
  Button, FormGroup, Label,
} from 'reactstrap';
import * as yup from 'yup';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { useUserExt } from '../../hooks/userext';
import getValidationErrors from '../../utils/getValidationErrors';
import Field from "../../components/Fields/Field";
import SelectInput from '../../components/Fields/Select';

const Register = () => {
  const { addUserExt } = useUserExt();
  const formRef = useRef<any>(null);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const Schema = yup.object().shape({
          name: yup.string().required('campo obrigatório').max(70, 'Máximo 70 caracteres'),
          cpf: yup.number().required('campo obrigatório').max(13, 'Máximo 13 caracteres'),
          password: yup.string().required('campo obrigatório').min(6, 'Minimo 6 caracteres'),
          confirmPassword: yup.string().required('campo obrigatório').min(6, 'Minimo 6 caracteres'),
          date: yup.date().default(() => new Date()),
          cell: yup.number().required('campo obrigatório').max(13, 'Máximo 13 caracteres'),
          etnia: yup.string().required('campo obrigatório'),
          email: yup.string().email().required('campo obrigatório'),
          confirmEmail: yup.string().email().required('campo obrigatório'),
          cep: yup.string().required('campo obrigatório').max(8, 'Máximo 8 caracteres'),
          adress: yup.string().required('campo obrigatório').max(70, 'Máximo 70 caracteres'),
          numberAdress: yup.number().required('campo obrigatório').max(5, 'Máximo 5 caracteres'),
          complementoAdress: yup.string().required('campo obrigatório').max(70, 'Máximo 70 caracteres'),
          bairro: yup.string().required('campo obrigatório').max(30, 'Máximo 30 caracteres'),
          cidade: yup.string().required('campo obrigatório').max(30, 'Máximo 30 caracteres'),
          estado: yup.string().required('campo obrigatório').max(2, 'Máximo 2 caracteres'),
          professor: yup.string().required('campo obrigatório'),
          atuacao: yup.string().required('campo obrigatório'),
          titulacao: yup.string().required('campo obrigatório').max(180, 'Máximo 180 caracteres'),
          cargo: yup.string().required('campo obrigatório'),
          escola: yup.string().required('campo obrigatório').max(70, 'Máximo 70 caracteres'),
          municipioAM: yup.string().required('campo obrigatório'),
          NAE: yup.string().required('campo obrigatório').max(2, 'Máximo 2 caracteres'),
          zona: yup.string().required('campo obrigatório'),
        });
        await Schema.validate(data, {
          abortEarly: false,
        });
        addUserExt(data);
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
      }
    },
    [addUserExt],
  );

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div style={{ margin: 'auto', width: '65%', marginTop: '10%' }}>
        <h1>Cadastro</h1>

        <div className="row g-3">
          <h2>Dados Pessoais</h2>
          <div className="col-md-6">
            <FormGroup className="col-md-9">
              <Label htmlFor="name" className="form-label">Nome completo - até 70 caracteres</Label>
              <Field id="name" editor="textbox" name="name" placeholder="Nome completo" />
            </FormGroup>
            <FormGroup className="col-md-9">
              <Label htmlFor="cpf" className="form-label">CPF</Label>
              <Field id="cpf" editor="textbox" name="cpf" placeholder=" CPF" />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup className="col-md-4">
              <Label htmlFor="date">Data de nascimento</Label>
              <Field id="date" editor="date" name="date" />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label htmlFor="etnia">
                Etnia
              </Label>
              <SelectInput id="etnia" name="etnia">
                <option value="Branca">Branca</option>
                <option value="Preta">Preta</option>
                <option value="Indígena">Indígena</option>
                <option value="Parda">Parda</option>
                <option value="Amarela">Amarela</option>
              </SelectInput>
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup row>
              <Label htmlFor="cell" className="form-label">Celular</Label>
              <Field id="cell" editor="textbox" name="cell" placeholder="celular" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="email" className="form-label">E-mail</Label>
              <Field id="email" editor="textbox" name="email" placeholder="E-mail" />
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="confirmEmail" className="form-label">Confirmação de E-mail</Label>
              <Field id="confirmEmail" editor="textbox" name="confirmEmail" placeholder="Confirmação de E-mail" />
            </FormGroup>
          </div>
        </div>
        <div className="col-md-6">
          <h2>Endereço</h2>
          <FormGroup row>
            <Label htmlFor="cep" className="form-label">CEP</Label>
            <Field id="cep" editor="textbox" name="cep" placeholder="CEP" />
            <a> Não sei meu CEP</a>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="adress" className="form-label">Endereço</Label>
            <Field id="adress" editor="textbox" name="adress" placeholder="Endereço" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="numberAdress" className="form-label">Número</Label>
            <Field id="numberAdress" editor="textbox" name="numberAdress" placeholder="Número" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="complementoAdress" className="form-label">Complemento</Label>
            <Field id="complementoAdress" editor="textbox" name="complementoAdress" placeholder="Complemento" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="bairro" className="form-label">Bairro</Label>
            <Field id="bairro" editor="textbox" name="bairro" placeholder="Bairro" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="cidade" className="form-label">Cidade</Label>
            <Field id="cidade" editor="textbox" name="cidade" placeholder="Cidade" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="estado" className="form-label">UF</Label>
            <SelectInput
              id="estado"
              name="estado"
            >
              <option value="Acre">AC-Acre</option>
              <option value="Alagoas">AL-Alagoas</option>
              <option value="Amapa">AP-Amapá</option>
              <option value="Amazonas">AM-Amazonas</option>
              <option value="Bahia">BA-Bahia</option>
              <option value="Ceara">CE-Ceará</option>
              <option value="DistritoFederal">DF-Distrito Federal</option>
              <option value="EspiritoSanto">ES-Espírito Santo</option>
              <option value="Goias">GO-Goiás</option>
              <option value="Maranhao">MA-Maranhão</option>
              <option value="MatoGrosso">MT-Mato Grosso</option>
              <option value="MatoGrossodoSul">MS-Mato Grosso do Sul</option>
              <option value="MinasGerais">MG-Minas Gerais</option>
              <option value="Para">PA-Pará</option>
              <option value="Paraiba">PB-Paraíba</option>
              <option value="Parana">PR-Paraná</option>
              <option value="Pernambuco">PE-Pernambuco</option>
              <option value="Piaui">PI-Piauí</option>
              <option value="RiodeJaneiro">RJ-Rio de Janeiro</option>
              <option value="RioGrandedoNorte">RN-Rio Grande do Norte</option>
              <option value="RioGrandedoSul">RS-Rio Grande do Sul</option>
              <option value="Rondônia">RO-Rondônia</option>
              <option value="Roraima">RR-Roraima</option>
              <option value="SantaCatarina">SC-Santa Catarina</option>
              <option value="SaoPaulo">SP-São Paulo</option>
              <option value="Sergipe">SE-Sergipe</option>
              <option value="Tocantins">TO-Tocantins</option>

            </SelectInput>
          </FormGroup>
        </div>
        <div className="col-md-6">
          <h2>(sendo professor aparece esse formulário)</h2>
          <FormGroup row>
            <Label htmlFor="professor" className="form-label">Professor</Label>
            <SelectInput id="professor" name="professor">
              <option value="sim">sim</option>
              <option value="nao">não</option>
            </SelectInput>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="professor" className="form-label">Professor S/N caso sim:</Label>
            <SelectInput
              id="professor"
              name="professor"
            >
              <option value="LinguaPortuguesa">Língua Portuguesa</option>
              <option value="Arte">Arte</option>
              <option value="EducacaoFisica">Educação Física</option>
              <option value="LinguaInglesa">Língua Inglesa</option>
              <option value="LinguaEspanhola">Língua Espanhola</option>
              <option value="Matematica">Matemática</option>
              <option value="Ciencias">Ciências</option>
              <option value="Geografia">Geografia</option>
              <option value="Historia">História</option>
              <option value="EnsinoReligioso">Ensino Religioso</option>
              <option value="Biologia">Biologia</option>
              <option value="Quimica">Química</option>
              <option value="Fisica">Física</option>
              <option value="Filosofia">Filosofia</option>
              <option value="Sociologia">Sociologia</option>
              <option value="Outros">Outros</option>
            </SelectInput>
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="atuacao" className="form-label">UDE - Esfera de atuação</Label>
            <Field
              id="atuacao"
              editor="dropdown"
              name="atuacao"
              options={["Estadual Efetivo",
                "Estadual Temporário", "Municipal Efetivo", "Municipal Temporário", "Federal", "Particular", "Outros",
              ]}
            />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="titulacao" className="form-label">Titulação  (180 caracteres)</Label>
            <Field id="titulacao" editor="multilinetextbox" name="titulacao" placeholder="titulação" />
            <button>adicionar titulação</button>
            <Label htmlFor="titulacao" className="form-label">titulação</Label>
            <Field id="titulacao" editor="multilinetextbox" name="titulacao" placeholder="titulacao" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="cargo" className="form-label">Cargo*</Label>
            <Field
              id="cargo"
              editor="dropdown"
              name="cargo"
              options={["Professor Fundamental I",
                "Professor Fundamental II", "Professor Ensino Médio", "Educação Infantil", "Pedagogo", "Especialista em educação", "Auxiliar Educacional",
                "Tradutor e Interprete de Libras - Língua Portuguesa", "Cuidador",
                "Instruto de Música", "Professor Índigena", "Professor da Educação Profissional e Tecnológica",
                "Gestor escolar: Diretor", "Gestor escolar: Diretor Adjunto", "Secretário(a) escolar", "Acadêmicos", "Monitor Amapá Jovem", "Outros",
              ]}
            />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="escola" className="form-label">Escola ou local de trabalho* (70 caracteres)</Label>
            <Field id="escola" editor="textbox" name="escola" placeholder="Escola ou local de trabalho" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="municipiosAM" className="form-label">Município de Atuação</Label>
            <Field
              id="municipiosAM"
              editor="dropdown"
              name="municipiosAM"
              options={["Amapá",
                "Calçoene", "Cutias", "Ferreira Gomes", "Itaubal", "Laranjal do Jarí", "Macapá",
                "Mazagão", "Oiapoque", "Pedra Branca do Amapari", "Porto Grande", "Pracuúba",
                "Santana", "Serra do Navio", "Tartarugalzinho", "Vitória do Jari",
              ]}
            />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="NAE" className="form-label">NAE (2 dígitos)</Label>
            <Field id="NAE" editor="textbox" name="NAE" placeholder="NAE" />
          </FormGroup>
          <FormGroup row>
            <Label htmlFor="zona" className="form-label">Zona</Label>
            <Field
              id="zona"
              editor="dropdown"
              name="zona"
              options={["Urbana",
                "Rural",
              ]}
            />
          </FormGroup>
        </div>
        <div className="row g-3">
          <FormGroup className="col-md-6">
            <Label htmlFor="password" className="form-label">Senha no minimo 8 caracteres</Label>
            <Field id="password" editor="password" name="password" placeholder="senha" />
          </FormGroup>
          <FormGroup className="col-md-6">
            <Label htmlFor="confirmPassword" className="form-label">Confirmação de senha</Label>
            <Field id="confirmPassword" editor="password" name="confirmPassword" placeholder="Confirmação de senha" />
          </FormGroup>
        </div>
        <Button>Cadastrar</Button>
        <Link to="/home" className="btn btn-link" style={{ background: 'green', color: '#7FFF00' }}>Cancelar</Link>
      </div>
    </Form>
  );
};

export default Register;
