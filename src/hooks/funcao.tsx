import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import { useUnit } from "./unit";

interface RoleProp {
  id: number;
  unit: string[];
  nome: string;
}

interface RoleData {
  roles: RoleProp[];
  addRole(func: RoleProp): void;
  updateRole(func: RoleProp): void;
  removeRole(id: number): void;
}

interface IProps {
    children: React.ReactNode;
}

const UnitContext = createContext<RoleData>({} as RoleData);

export const RoleProvider: React.FC<IProps> = ({ children }) => {
  const [roles, setRoles] = useState<RoleProp[]>([]);
  const { units, updateUnit } = useUnit();

  const addRole = useCallback((func: RoleProp) => {
    setRoles([...roles, func]);
  }, [roles]);

  const updateRole = useCallback((func: RoleProp) => {
    units.forEach((item) => (func.unit.includes(item.nome) ? updateUnit({ ...item, funcao: func.nome }) : item));
    setRoles(roles.map((item) => (item.id === func.id ? func : item)));
  }, [roles, units, updateUnit]);

  const removeRole = useCallback((id: number) => {
    setRoles(roles.filter((item) => item.id !== id));
  }, [roles]);

  return (
    <UnitContext.Provider value={{
      roles, addRole, updateRole, removeRole,
    }}
    >
      {children}
    </UnitContext.Provider>
  );
};

export function useRole(): RoleData {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnit must be used within an unitProvider');
  }
  return context;
};
