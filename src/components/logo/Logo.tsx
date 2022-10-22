import React, { FC, useCallback, memo } from 'react';
import { GiAcidBlob } from 'react-icons/gi';
import { animateScroll } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router';
import { useTypedSelector } from 'hooks';
import { PathRoutes } from 'types';
import './Logo.scss';

interface ILogoProps {
  isName?: boolean;
}

export const Logo: FC<ILogoProps> = memo(({ isName = true }) => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if (pathname === PathRoutes.HOME) {
      animateScroll.scrollToTop({ duration: 350 });
    }

    if (isAuth) {
      navigate(PathRoutes.STORAGE_MY_DRIVE);
      return;
    }

    navigate(PathRoutes.HOME);
  }, [navigate, pathname, isAuth]);

  const MemoIcon = memo(GiAcidBlob);

  return (
    <div aria-hidden onClick={onClick} className="logo">
      <MemoIcon className="logo__icon" />
      {isName && <span className="logo__name">Storage</span>}
    </div>
  );
});
