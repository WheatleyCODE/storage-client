import React from 'react';
import { Hills, Mountains, Stars, LoginForm } from 'components';
import './LoginPage.scss';

export const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
      <Stars />
      <Mountains />
      <Hills />
    </div>
  );
};
