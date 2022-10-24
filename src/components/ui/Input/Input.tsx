import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { IconType } from 'react-icons';
import './Input.scss';

export interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  Icon?: IconType;
  type: string;
  isError: boolean;
  isActive: boolean;
  validError: string | null;
  changeFocus: (boolean: boolean) => void;
  changeActive: (boolean: boolean) => void;
}

export const Input: FC<IInputProps> = memo((props) => {
  const {
    Icon,
    isError,
    isActive,
    validError,
    placeholder,
    value,
    type,
    changeActive,
    changeFocus,
    ...anotherProps
  } = props;

  const ref = useRef<null | HTMLInputElement>(null);
  const placeholderControls = useAnimation();
  const isErrorActive = !!(isError && validError);
  const MemoIcon = Icon && memo(Icon);
  const isIcon = !!MemoIcon;

  const focusOnInput = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isActive || value) {
      placeholderControls.start('active');
      return;
    }

    placeholderControls.start('default');
  }, [isActive, isErrorActive, placeholderControls, value]);

  return (
    <div className={`input ${isIcon && 'icon'} ${isErrorActive && 'error'} `}>
      {isIcon && (
        <div aria-hidden onClick={focusOnInput} className="input__icon">
          <MemoIcon />
        </div>
      )}

      <input className="input__textfild" ref={ref} value={value} type={type} {...anotherProps} />

      {isErrorActive && (
        <motion.div
          onClick={focusOnInput}
          className="input__valid-error"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {validError}
        </motion.div>
      )}

      {placeholder && (
        <motion.div
          onClick={focusOnInput}
          animate={placeholderControls}
          className="input__placeholder"
          initial="default"
          transition={{ duration: 0.15 }}
          variants={{
            active: isIcon
              ? { translateY: -23, translateX: -27, scale: 0.9 }
              : { translateY: -23, translateX: -10, scale: 0.9 },
            default: { translateY: 0, translateX: 0, scale: 1 },
          }}
        >
          {placeholder}
        </motion.div>
      )}
    </div>
  );
});
