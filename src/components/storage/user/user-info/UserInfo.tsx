import React, { FC, useCallback } from 'react';
import { Button } from 'components';
import { useActions, useTypedSelector } from 'hooks';
import { getFirstLetter } from 'utils';
import './UserInfo.scss';

export const UserInfo: FC = () => {
  const { logout } = useActions();
  const { user, isAuth } = useTypedSelector((state) => state.auth);

  const logoutHandler = useCallback(() => logout(), []);

  return (
    <div className="user-info">
      <div className="user-info__circle">{isAuth && getFirstLetter(user.name)}</div>
      <div className="user-info__name">{user.name}</div>
      <div className="user-info__email">{user.email}</div>
      <div className="user-info__buttons">
        <Button onClick={logoutHandler} outline="outline" text="Выйти" />
      </div>
    </div>
  );
};
