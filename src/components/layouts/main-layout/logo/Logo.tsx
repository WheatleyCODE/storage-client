import React, { FC, useCallback, memo } from 'react';
import { GiAcidBlob } from 'react-icons/gi';
import { animateScroll } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router';
import { PathRoutes } from 'types';
import './Logo.scss';

interface ILogoProps {
  isName?: boolean;
}

export const Logo: FC<ILogoProps> = memo(({ isName = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = useCallback(() => {
    if (location.pathname === PathRoutes.HOME) {
      animateScroll.scrollToTop({ duration: 350 });
    }

    navigate(PathRoutes.HOME);
  }, [navigate, location.pathname]);

  const MemoIcon = memo(GiAcidBlob);

  return (
    <div aria-hidden onClick={onClick} className="logo">
      <MemoIcon className="logo__icon" />
      {isName && <span className="logo__name">Storage</span>}
    </div>
  );
});
