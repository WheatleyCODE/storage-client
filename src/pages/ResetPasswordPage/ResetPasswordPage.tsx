import React, { FC } from 'react';
import { ResetPasswordForm, AuthLayout } from 'components';
import './ResetPasswordPage.scss';

export const ResetPasswordPage: FC = () => {
  return (
    <div className="reset-password-page">
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </div>
  );
};
