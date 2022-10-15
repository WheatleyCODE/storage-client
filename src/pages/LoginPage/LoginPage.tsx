import React from 'react';
import { Hills, Mountains, Stars } from 'components';
import './LoginPage.scss';

export const LoginPage = () => {
  return (
    <div className="login-page">
      <Stars />
      <Mountains />
      <Hills />
    </div>
  );
};
