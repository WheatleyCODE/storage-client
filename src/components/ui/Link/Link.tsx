import { Link as ReactLink } from 'react-router-dom';
import React, { FC, memo } from 'react';
import './Link.scss';

export interface ILinkProps {
  text: string;
  href: string;
}

export const Link: FC<ILinkProps> = memo(({ text, href }) => {
  return (
    <ReactLink to={href} className="link">
      {text}
    </ReactLink>
  );
});
