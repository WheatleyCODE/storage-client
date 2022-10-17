import React, { FC } from 'react';
import { AuthLayout } from 'components';
import './ActivatePage.scss';

export const ActivatePage: FC = () => {
  return (
    <div className="activate-page">
      <AuthLayout>
        <h1 className="activate-page__title">Активация аккаунта...</h1>
      </AuthLayout>
    </div>
  );
};
