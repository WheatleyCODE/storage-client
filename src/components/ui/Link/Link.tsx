import { Link as ReactLink } from 'react-router-dom';
import React, { FC, memo } from 'react';
import './Link.scss';

export interface ILikProps {
  text: string;
  href: string;
}

export const Link: FC<ILikProps> = memo(({ text, href }) => {
  return (
    <ReactLink to={href} className="link">
      {text}
    </ReactLink>
  );
});
