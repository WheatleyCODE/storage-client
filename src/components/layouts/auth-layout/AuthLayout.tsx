import React, { FC } from 'react';
import { Stars, Mountains, Hills } from 'components';
import './AuthLayout.scss';

export interface IAuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      {children}
      <Stars />
      <Mountains />
      <Hills />
    </div>
  );
};
