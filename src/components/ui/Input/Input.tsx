/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { IconType } from 'react-icons';
import './Input.scss';

export interface IInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  Icon?: IconType;
  type?: string;
  isError?: boolean;
  validError?: string | null;
}

export const Input: FC<IInputProps> = memo((props) => {
  const { Icon, isError, validError, onBlur, onFocus, onChange, placeholder, value, type } = props;
  const ref = useRef<null | HTMLInputElement>(null);
  const placeholderControls = useAnimation();
  const [isActive, setIsActive] = useState(false);
  const isErrorActive = !!(isError && validError);
  const MemoIcon = Icon && memo(Icon);
  const isIcon = !!MemoIcon;

  const focusOnInput = useCallback(() => {
    if (ref.current) {
      ref.current.focus();
      setIsActive(true);
    }
  }, []);

  const onFocusInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (ref.current) {
        ref.current.focus();
        setIsActive(true);

        if (onFocus) onFocus(e);
      }
    },
    [onFocus]
  );

  const onBlurInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!value) {
        setIsActive(false);
      }

      if (onBlur) onBlur(e);
    },
    [onBlur, value]
  );

  useEffect(() => {
    if (isActive) {
      placeholderControls.start('active');
      return;
    }

    placeholderControls.start('default');
  }, [isActive, isErrorActive]);

  return (
    <div className={`input ${isIcon && 'icon'} ${isErrorActive && 'error'} `}>
      {isIcon && (
        <div aria-hidden onClick={focusOnInput} className="input__icon">
          <MemoIcon />
        </div>
      )}

      <input
        className="input__textfild"
        ref={ref}
        value={value}
        type={type}
        onChange={onChange}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
      />

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
            active: isIcon ? { translateY: -23, translateX: -27, scale: 0.9 } : { translateY: -23, translateX: -10, scale: 0.9 },
            default: { translateY: 0, translateX: 0, scale: 1 },
          }}
        >
          {placeholder}
        </motion.div>
      )}
    </div>
  );
});
