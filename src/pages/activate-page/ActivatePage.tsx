import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthLayout } from 'components';
import { useActions } from 'hooks';
import { PathRoutes } from 'types';
import { checkRequestStatus } from 'utils';
import './ActivatePage.scss';

export const ActivatePage: FC = () => {
  const { activateAndLogin } = useActions();
  const params = useParams();
  const navigate = useNavigate();

  const activate = async () => {
    const data = await activateAndLogin(params.link || '');

    if (checkRequestStatus(data)) {
      navigate(PathRoutes.STORAGE);
      return;
    }

    navigate(PathRoutes.LOGIN);
  };

  useEffect(() => {
    activate();
  }, []);

  return (
    <div className="activate-page">
      <AuthLayout>
        <h1 className="activate-page__title">Активация аккаунта...</h1>
      </AuthLayout>
    </div>
  );
};
