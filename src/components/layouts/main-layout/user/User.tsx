import { useActions, useTypedSelector } from 'hooks';
import React, { FC, useCallback } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Button } from 'components';
import { PathRoutes } from 'types';
import './User.scss';

export const User: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();
  const navigate = useNavigate();

  const navigateToLogin = useCallback(() => {
    navigate(PathRoutes.LOGIN);
  }, [navigate]);

  return (
    <div className="user">
      {isAuth && <Button onClick={() => logout()} color="blue" Icon={FaRegUser} text="Выйти" />}
      {!isAuth && <Button onClick={navigateToLogin} color="blue" Icon={FaRegUser} text="Войти" />}
    </div>
  );
};
