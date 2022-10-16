import React, { FC } from 'react';
import { Stars, Mountains, Hills } from 'components';
import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Stars />
      <Mountains />
      <Hills />
    </footer>
  );
};
