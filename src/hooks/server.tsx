import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import { useUnit } from './unit';
import { useRole } from './funcao';

interface IServer {
    id: number;
    registrationNumber: string;
    unidade: string[];
    funcao: string[];
    sigla: string;
    perfil:string;
    nome: string;
    cpf: string;
    age: string;
    cell: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    title?: string;
}

interface ServerData {
    server: IServer[];
    addServer(servers: IServer): void;
    updateServer(servers: IServer): void;
    removeServer(id: number): void;
  }

  interface IProps {
    children: React.ReactNode;
  }

const ServerContext = createContext<ServerData>({} as ServerData);

export const ServerProvider: React.FC<IProps> = ({ children }) => {
  const [server, setServer] = useState<IServer[]>([]);

  const { units, updateUnit } = useUnit();
  const { roles, updateRole } = useRole();

  const addServer = useCallback((servers: IServer) => {
    setServer([...server, servers]);
  }, [server]);

  const updateServer = useCallback((servers: IServer) => {
    units.forEach((item) => (servers.unidade.includes(item.nome) ? updateUnit({ ...item, funcao: servers.nome }) : item));
    roles.forEach((item) => (servers.funcao.includes(item.nome) ? updateRole({ ...item, nome: servers.nome }) : item));
    setServer(server.map((item) => (item.id === servers.id ? servers : item)));
  }, [server, units, updateUnit, roles, updateRole]);

  const removeServer = useCallback((id: number) => {
    setServer(server.filter((item) => item.id !== id));
  }, [server]);

  return (
    <ServerContext.Provider value={{
      server, addServer, updateServer, removeServer,
    }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export function useServer(): ServerData {
  const context = useContext(ServerContext);

  if (!context) {
    throw new Error('useServer must be used within an unitProvider');
  }

  return context;
};
