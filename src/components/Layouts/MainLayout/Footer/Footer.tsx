import React, { FC } from 'react';
import { Stars, Mountains, Hills, RegisterForm } from 'components';
import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <RegisterForm />
      <Stars />
      <Mountains />
      <Hills />
    </footer>
  );
};
