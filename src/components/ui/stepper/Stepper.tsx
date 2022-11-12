/* eslint-disable no-return-assign */
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { StepTitle } from './stepTitle/StepTitle';
import './Stepper.scss';

export interface IStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  stepTitles: {
    title: string;
  }[];
  activeStep: number;
  children: React.ReactNode[];
}

export const Stepper: FC<IStepperProps> = memo((props) => {
  const { children, activeStep, stepTitles, className, ...anotherProps } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const nodes = ref.current.childNodes as unknown as HTMLDivElement[];
      const arrNodes = [...nodes];
      arrNodes.pop();
      const containerWidth = ref.current.clientWidth;

      const widthArr = arrNodes.map((node) => node.offsetWidth);
      const widthItems = arrNodes.reduce((acc, node) => (acc += node.offsetWidth), 0);
      const padding = (containerWidth - widthItems) / arrNodes.length;

      if (activeStep === 0) {
        setProgressWidth(widthArr[activeStep] / 2);
        return;
      }

      if (activeStep === widthArr.length - 1) {
        setProgressWidth(containerWidth);
        return;
      }

      let width = 0;

      for (let i = 0; i < activeStep; i += 1) {
        width += widthArr[i];
        width += padding * 2.1;
      }

      setProgressWidth(width);
    }
  }, [activeStep]);

  return (
    <div {...anotherProps} className={`stepper ${className}`}>
      <div ref={ref} className="stepper__header">
        {stepTitles.map(({ title }, i) => (
          <StepTitle
            isComplete={activeStep > i}
            isActive={i === activeStep}
            number={i + 1}
            title={title}
            key={title}
          />
        ))}

        <div className="stepper__line">
          <div style={{ width: `${progressWidth}px` }} className="stepper__progress" />
        </div>
      </div>
      <div className="stepper__main">{children[activeStep]}</div>
    </div>
  );
});
