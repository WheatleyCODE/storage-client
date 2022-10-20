import React, { FC } from 'react';
import { ChangePasswordForm, AuthLayout } from 'components';
import './ChangePasswordPage.scss';

const ChangePasswordPage: FC = () => {
  return (
    <div className="change-password-page">
      <AuthLayout>
        <ChangePasswordForm />
      </AuthLayout>
    </div>
  );
};

export default ChangePasswordPage;
