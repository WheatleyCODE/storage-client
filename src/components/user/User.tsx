import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { FaRegUser } from 'react-icons/fa';
import { useTypedSelector } from 'hooks';
import { Button, Popup } from 'components';
import { getFirstLetter } from 'utils';
import { PathRoutes } from 'types';
import { UserInfo } from './user-info/UserInfo';
import './User.scss';

export const User: FC = () => {
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const navigateToLogin = useCallback(() => {
    navigate(PathRoutes.LOGIN);
  }, [navigate]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    console.log('User closePopup');
  }, []);

  return (
    <div className="user">
      {!isAuth && <Button onClick={navigateToLogin} color="blue" Icon={FaRegUser} text="Войти" />}
      {isAuth && (
        <div
          aria-hidden
          onClick={(e) => {
            setShowPopup((p) => !p);
            e.stopPropagation();
          }}
          className="user__auth"
        >
          <div>{getFirstLetter(user.name)}</div>
        </div>
      )}

      <AnimatePresence>
        {showPopup && (
          <Popup height={300} onClose={closePopup}>
            <UserInfo />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
};
