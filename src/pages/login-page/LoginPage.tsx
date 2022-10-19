import React from 'react';
import { LoginForm } from 'components';
import './LoginPage.scss';
import { AuthLayout } from 'components/layouts/auth-layout/AuthLayout';

export const LoginPage = () => {
  return (
    <div className="login-page">
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};
