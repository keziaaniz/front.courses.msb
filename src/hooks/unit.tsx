import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

interface UnitProp {
  id: number;
  unit: string;
  initials: string;
  role?: string;
}

interface UnitData {
  units: UnitProp[];
  addUnit(unit: UnitProp): void;
  updateUnit(unit: UnitProp): void;
  removeUnit(id: number): void;
}

interface IProps {
    children: React.ReactNode;
  }

const UnitContext = createContext<UnitData>({} as UnitData);

export const UnitProvider: React.FC<IProps> = ({ children }) => {
  const [units, setUnits] = useState<UnitProp[]>([]);

  const addUnit = useCallback((unit: UnitProp) => {
    setUnits([...units, unit]);
  }, [units]);
  const updateUnit = useCallback((unit: UnitProp) => {
    setUnits(units.map((item) => (item.id === unit.id ? unit : item)));
  }, [units]);
  const removeUnit = useCallback((id: number) => {
    setUnits(units.filter((item) => item.id !== id));
  }, [units]);

  return (
    <UnitContext.Provider value={{
      units, addUnit, updateUnit, removeUnit,
    }}
    >
      {children}
    </UnitContext.Provider>
  );
};

export function useUnit(): UnitData {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnit must be used within an unitProvider');
  }
  return context;
};
