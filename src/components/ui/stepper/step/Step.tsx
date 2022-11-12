import React, { FC, memo } from 'react';
import './Step.scss';

export interface IStepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Step: FC<IStepProps> = memo(({ children, className, ...anotherProps }) => {
  return (
    <div {...anotherProps} className={`step ${className}`}>
      {children}
    </div>
  );
});
