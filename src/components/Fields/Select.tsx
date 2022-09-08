import React, { useEffect, useRef, ReactElement } from "react";
import { useField } from "@unform/core";

interface Props {
  id?: string;
    name: string;
    children: React.ReactNode;
}

const SelectInput: React.FC<Props> = ({ name, children, ...rest }) => {
  const { fieldName, defaultValue, registerField } = useField(name);
  const optionRefs = useRef<HTMLOptionElement[]>([]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: optionRefs.current,
      getValue: (refs: HTMLOptionElement[]) => refs.find((ref) => ref.selected)?.value || "",
      setValue: (refs: HTMLOptionElement[], value: string) => {
        const option = refs.find((ref) => ref.value === value);
        if (option) option.selected = true;
      },
      // eslint-disable-next-line no-return-assign
      clearValue: (refs: HTMLOptionElement[]) => refs.forEach((ref) => (ref.selected = false)),
    });
  }, [fieldName, registerField]);

  return (
    <select name={fieldName} defaultValue={defaultValue} {...rest}>
      {React.Children.map(children, (child) => React.cloneElement(child as ReactElement, {
        ref: (ref: HTMLOptionElement) => optionRefs.current.push(ref),
      }))}
    </select>
  );
};

export default SelectInput;
