import React, { FC, useCallback } from 'react';
import { GiAcidBlob } from 'react-icons/gi';
import { animateScroll } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router';
import { PathRoutes } from 'types';
import './Logo.scss';

interface ILogoProps {
  isName?: boolean;
}

export const Logo: FC<ILogoProps> = ({ isName = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = useCallback(() => {
    if (location.pathname === PathRoutes.HOME) {
      animateScroll.scrollToTop();
      return;
    }

    navigate(PathRoutes.HOME);
  }, [navigate]);

  return (
    <div aria-hidden onClick={onClick} className="logo">
      <GiAcidBlob className="logo__icon" />
      {isName && <span className="logo__name">Storage</span>}
    </div>
  );
};
