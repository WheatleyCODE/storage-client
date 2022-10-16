import React, { FC } from 'react';
import { RegisterForm } from 'components';
import './RegisterPage.scss';
import { AuthLayout } from 'components/Layouts/AuthLayout/AuthLayout';

export const RegisterPage: FC = () => {
  return (
    <div className="register-page">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
};
