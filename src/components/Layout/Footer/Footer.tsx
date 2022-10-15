import React from 'react';
import { Stars, Mountains, Hills } from 'components';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <Stars />
      <Mountains />
      <Hills />
    </footer>
  );
};
