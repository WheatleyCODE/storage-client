import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthPageLayout } from 'components';
import { useActions } from 'hooks';
import { PathRoutes } from 'types';
import { checkRequestStatus } from 'utils';
import './ActivatePage.scss';

const ActivatePage: FC = () => {
  const { activateAndLogin } = useActions();
  const params = useParams();
  const navigate = useNavigate();

  const activate = async () => {
    const data = await activateAndLogin(params.link || '');

    if (checkRequestStatus(data)) {
      navigate(PathRoutes.STORAGE_MY_DRIVE);
      return;
    }

    navigate(PathRoutes.LOGIN);
  };

  useEffect(() => {
    activate();
  }, []);

  return (
    <div className="activate-page">
      <AuthPageLayout>
        <h1 className="activate-page__title">Активация аккаунта...</h1>
      </AuthPageLayout>
    </div>
  );
};

export default ActivatePage;
