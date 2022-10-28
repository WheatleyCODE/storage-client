import React, { FC } from 'react';
import { LoginForm, AuthPageLayout } from 'components';
import './LoginPage.scss';

export const LoginPage: FC = () => {
  return (
    <div className="login-page">
      <AuthPageLayout>
        <LoginForm />
      </AuthPageLayout>
    </div>
  );
};
