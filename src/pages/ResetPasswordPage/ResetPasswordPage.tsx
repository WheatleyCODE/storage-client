import { AuthLayout } from 'components/Layouts/AuthLayout/AuthLayout';
import React, { FC } from 'react';
import './ResetPasswordPage.scss';

export const ResetPasswordPage: FC = () => {
  return (
    <div className="reset-password-page">
      <AuthLayout>
        <h1>ResetPasswordPage</h1>
      </AuthLayout>
    </div>
  );
};
