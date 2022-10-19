import React, { FC } from 'react';
import { ChangePasswordForm, AuthLayout } from 'components';
import './ChangePasswordPage.scss';

export const ChangePasswordPage: FC = () => {
  return (
    <div className="change-password-page">
      <AuthLayout>
        <ChangePasswordForm />
      </AuthLayout>
    </div>
  );
};
