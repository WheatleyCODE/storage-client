import { AuthLayout } from 'components/Layouts/AuthLayout/AuthLayout';
import React, { FC } from 'react';
import './ActivatePage.scss';

export const ActivatePage: FC = () => {
  return (
    <div className="activate-page">
      <AuthLayout>
        <h1>Activate</h1>
      </AuthLayout>
    </div>
  );
};
