import React from 'react';
import { UnitProvider } from './unit';
import { RoleProvider } from './funcao';
import { UserExtProvider } from './userext';
import { ServerProvider } from './server';
import { AuthProvider } from './auth';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => (
  <AuthProvider>
    <UserExtProvider>
      <UnitProvider>
        <RoleProvider>
          <ServerProvider>
            {children}
          </ServerProvider>
        </RoleProvider>
      </UnitProvider>
    </UserExtProvider>

  </AuthProvider>
);

export default AppProvider;
