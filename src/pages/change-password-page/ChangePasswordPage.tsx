import React, { FC } from 'react';
import { ChangePasswordForm, AuthPageLayout } from 'components';
import './ChangePasswordPage.scss';

const ChangePasswordPage: FC = () => {
  return (
    <div className="change-password-page">
      <AuthPageLayout>
        <ChangePasswordForm />
      </AuthPageLayout>
    </div>
  );
};

export default ChangePasswordPage;
