import React from 'react';
import { LoginForm, AuthPageLayout } from 'components';
import './LoginPage.scss';

export const LoginPage = () => {
  return (
    <div className="login-page">
      <AuthPageLayout>
        <LoginForm />
      </AuthPageLayout>
    </div>
  );
};
