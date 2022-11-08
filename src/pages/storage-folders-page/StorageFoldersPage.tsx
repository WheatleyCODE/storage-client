import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { StorageWorkplace } from 'components';
import { useActions, useTypedSelector } from 'hooks';
import { PathRoutes } from 'types';
import { checkRequestStatus } from 'utils';
import './StorageFoldersPage.scss';

export const StorageFoldersPage: FC = () => {
  const { getChildrens } = useActions();
  const { workplaceItems } = useTypedSelector((state) => state.storage);
  const params = useParams();
  const navigate = useNavigate();

  const fetchChildrens = async () => {
    const { id } = params;

    if (!id) return;

    const data = await getChildrens(id);

    if (!checkRequestStatus(data)) {
      navigate(PathRoutes.STORAGE_MY_DRIVE);
    }
  };

  useEffect(() => {
    fetchChildrens();
  }, [params]);

  return (
    <div className="storage-folders-page">
      <StorageWorkplace workplaceItems={workplaceItems} />
    </div>
  );
};
