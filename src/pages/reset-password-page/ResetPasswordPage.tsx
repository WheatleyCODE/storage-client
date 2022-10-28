import React, { FC } from 'react';
import { ResetPasswordForm, AuthPageLayout } from 'components';
import './ResetPasswordPage.scss';

export const ResetPasswordPage: FC = () => {
  return (
    <div className="reset-password-page">
      <AuthPageLayout>
        <ResetPasswordForm />
      </AuthPageLayout>
    </div>
  );
};
