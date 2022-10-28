import React, { FC } from 'react';
import { Stars, Mountains, Hills } from 'components';
import './AuthPageLayout.scss';

export interface IAuthPageLayoutProps {
  children: React.ReactNode;
}

export const AuthPageLayout: FC<IAuthPageLayoutProps> = ({ children }) => {
  return (
    <div className="auth-page-layout">
      {children}
      <Stars />
      <Mountains />
      <Hills />
    </div>
  );
};
