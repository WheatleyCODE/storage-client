import React from 'react';
import { Hills, Mountains, RegisterForm, Stars } from 'components';
import './RegisterPage.scss';

export const RegisterPage = () => {
  return (
    <div className="register-page">
      <RegisterForm />
      <Stars />
      <Mountains />
      <Hills />
    </div>
  );
};
