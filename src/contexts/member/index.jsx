import React, { createContext, useContext } from 'react';

// Criando um contexto
const MemberContext = createContext();

// Provider para fornecer o valor do contexto
export const MemberProvider = ({ member, children }) => (
  <MemberContext.Provider value={member}>{children}</MemberContext.Provider>
);

// Hook personalizado para acessar o valor do contexto
export const useMember = () => useContext(MemberContext);
