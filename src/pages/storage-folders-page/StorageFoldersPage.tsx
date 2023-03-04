import React, { FC, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useActions, useTypedSelector } from 'hooks';
import { StorageWorkplace } from 'components';
import { PathRoutes } from 'types';
import { checkRequestStatus } from 'utils';
import { PropertyFactory } from 'helpers';
import './StorageFoldersPage.scss';

export const StorageFoldersPage: FC = () => {
  const { getChildrens } = useActions();
  const { workplaceItems, isWorkplaceLoading } = useTypedSelector((state) => state.storage);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchChildrens = useCallback(async (folderId?: string) => {
    if (!folderId) return;

    const data = await getChildrens(folderId);

    if (!checkRequestStatus(data)) {
      navigate(PathRoutes.STORAGE_MY_DRIVE);
    }
  }, []);

  useEffect(() => {
    fetchChildrens(id);
  }, [id]);

  const workplaceData = workplaceItems.map((item) => PropertyFactory.create(item));

  return (
    <div className="storage-folders-page">
      {!isWorkplaceLoading && <StorageWorkplace workplaceItems={workplaceData} />}
    </div>
  );
};
