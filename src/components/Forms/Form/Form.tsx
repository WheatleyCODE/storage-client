import React, { FC } from 'react';
import './Form.scss';

export interface IFormProps {
  title: string;
  children: React.ReactNode;
}

export const Form: FC<IFormProps> = ({ title, children }) => {
  return (
    <div className="form">
      <div className="form__title">
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
};
