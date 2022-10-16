import { AuthLayout } from 'components/Layouts/AuthLayout/AuthLayout';
import React, { FC } from 'react';
import './ChangePasswordPage.scss';

export const ChangePasswordPage: FC = () => {
  return (
    <div className="change-password-page">
      <AuthLayout>
        <h1>ChangePasswordPage</h1>
      </AuthLayout>
    </div>
  );
};
