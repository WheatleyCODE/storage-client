import React, { FC } from 'react';
import { RegisterForm, AuthPageLayout } from 'components';
import './RegisterPage.scss';

export const RegisterPage: FC = () => {
  return (
    <div className="register-page">
      <AuthPageLayout>
        <RegisterForm />
      </AuthPageLayout>
    </div>
  );
};
