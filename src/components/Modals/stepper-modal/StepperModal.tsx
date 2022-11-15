import React, { FC } from 'react';
import { Button } from 'components';
import './StepperModal.scss';

export interface IStepperModalProps {
  title: string;
  children: React.ReactNode;
  activeStep: number;
  stepTitlesLength: number;
  subStep: () => void;
  addStep: () => void;
  lastButtonHandler: () => void;
  lastButtonText: string;
}

export const StepperModal: FC<IStepperModalProps> = (props) => {
  const {
    subStep,
    addStep,
    children,
    title,
    activeStep,
    stepTitlesLength,
    lastButtonHandler,
    lastButtonText,
  } = props;

  return (
    <div className="stepper-modal">
      <h1 className="stepper-modal__title">{title}</h1>
      {children}

      <div className="stepper-modal__buttons">
        <Button disable={activeStep === 0} onClick={subStep} text="Назад" />

        {activeStep === stepTitlesLength - 1 ? (
          <Button color="blue" outline="fill" onClick={lastButtonHandler} text={lastButtonText} />
        ) : (
          <Button color="blue" outline="fill" onClick={addStep} text="Вперёд" />
        )}
      </div>
    </div>
  );
};
