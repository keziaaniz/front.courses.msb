import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

interface IUserExt {
  id?: number;
 name: number;
 cpf: string;
 date: number;
  cell: number;
  etnia: string;
  email: string;
  confirmEmail: string;
  cep: string;
  adress: string;
  numberAdress: string;
  complementoAdress: string;
  bairro: string;
  cidade: string;
  estado: string;
  professor?: string;
  atuacao?: string;
  titulacao?: string[];
  cargo?: string;
  escola?: string;
  municipioAM?: string;
  NAE?: string;
  zona?: string;
  password: string;
  confirmPassword: string;
}

interface UserData {
  userExts: IUserExt[];
  addUserExt(users: IUserExt): void;
  updateUserExt(users: IUserExt): void;
  deleteUserExt(id: number): void;
}

interface IProps {
  children: React.ReactNode;
}

const UserExtContext = createContext<UserData>({} as UserData);

export const UserExtProvider: React.FC<IProps> = ({ children }) => {
  const [userExts, setUserExts] = useState<IUserExt[]>([]);

  const addUserExt = useCallback((users: IUserExt) => {
    setUserExts([...userExts, users]);
  }, [userExts]);

  const updateUserExt = useCallback((users: IUserExt) => {
    setUserExts(userExts.map((item) => (item.id === users.id ? users : item)));
  }, [userExts]);

  const deleteUserExt = useCallback((id: number) => {
    setUserExts(userExts.filter((item) => item.id !== id));
  }, [userExts]);

  return (
    <UserExtContext.Provider value={{
      userExts, addUserExt, updateUserExt, deleteUserExt,
    }}
    >
      {children}
    </UserExtContext.Provider>
  );
};

export function useUserExt(): UserData {
  const context = useContext(UserExtContext);

  if (!context) {
    throw new Error('useUnit must be used within an unitProvider');
  }

  return context;
}
