import React, { FC, memo } from 'react';
import { MdCheck } from 'react-icons/md';
import './StepTitle.scss';

export interface IStepTitleProps {
  title: string;
  number: number;
  isActive: boolean;
  isComplete: boolean;
}

export const StepTitle: FC<IStepTitleProps> = memo((props) => {
  const { title, number, isActive, isComplete } = props;
  const MemoIcon = memo(MdCheck);

  return (
    <div className={`step-title ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}>
      <div className="step-title__icon">{isComplete ? <MemoIcon className="icon" /> : number}</div>
      <div className="step-title__title">{title}</div>
    </div>
  );
});
