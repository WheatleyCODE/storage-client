export interface IMotionParams {
  preX?: number;
  x?: number;
  preY?: number;
  y?: number;
  preOpacity?: number;
  opacity?: number;
  delay?: number;
  duration?: number;
}

export const getSimpleMotionProps = (params: IMotionParams) => {
  const { preX, x, preY, y, delay, duration, preOpacity, opacity } = params;

  return {
    initial: {
      x: preX,
      y: preY,
      opacity: preOpacity,
    },
    animate: {
      x,
      y,
      opacity,
    },
    transition: {
      duration,
      delay,
    },
  };
};
