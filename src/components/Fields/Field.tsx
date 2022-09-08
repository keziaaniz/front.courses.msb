import React, { useEffect, useRef } from "react";
import { useField } from '@unform/core';
import {
  Input,
} from 'reactstrap';
import styled from "styled-components";
import { cpf } from '../../utils/masks';

const Select = styled.select`
width: 100%;
height: 1.2rem;
margin-bottom: 5px;
`;

const Field = ({
  setValues, name, options, editor, ...rest
}: any) => {
  const inputRef = useRef<any>(null);
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {editor === "textbox" && (
      <input
        defaultValue={defaultValue}
        name={name}
        type="text"
        ref={inputRef}
        onChange={(e) => {
          if (name === 'cpf') {
            inputRef.current.value = cpf(e.target.value);
          } else {
            inputRef.current.value = e.target.value;
          }
        }}
        {...rest}
      />
      )}
      {editor === "multilinetextbox" && (
      <Input
        type="textarea"
        name={name}
        defaultValue={defaultValue}
        ref={inputRef}
        onChange={(e) => { inputRef.current.value = e.target.value; }}
        {...rest}
      />
      )}

      {editor === "dropdown" && (
      <Select
        type="select"
        defaultValue={defaultValue}
        name={name}
        ref={inputRef}
        onChange={(value) => {
          setValues(Array.from(value.target.options).filter((x) => x.selected).map((el) => el.value));
        }}
        {...rest}
      >
        {options
                    && options.map((item: any) => (
                      <option value={item.nome}>
                        {item.nome}
                      </option>
                    ))}
      </Select>

      )}

      {editor === "password" && (
      <Input
        name={name}
        defaultValue={defaultValue}
        type="password"
        ref={inputRef}
        onChange={(e) => { inputRef.current.value = e.target.value; }}
        {...rest}
      />
      )}
      {editor === "date" && (
      <Input
        name={name}
        defaultValue={defaultValue}
        type="date"
        ref={inputRef}
        onChange={(e) => { inputRef.current.value = e.target.value; }}
        {...rest}
      />
      )}
    </div>
  );
};

export default Field;
