import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { IconType } from 'react-icons';
import './Textarea.scss';

export interface ITextareaProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  Icon?: IconType;
  isError: boolean;
  isActive: boolean;
  validError: string | null;
  changeFocus: (boolean: boolean) => void;
  changeActive: (boolean: boolean) => void;
}

export const Textarea: FC<ITextareaProps> = memo((props) => {
  const {
    Icon,
    isError,
    isActive,
    validError,
    placeholder,
    value,
    changeActive,
    changeFocus,
    ...anotherProps
  } = props;

  const ref = useRef<null | HTMLTextAreaElement>(null);
  const placeholderControls = useAnimation();
  const isErrorActive = !!(isError && validError);
  const MemoIcon = Icon && memo(Icon);
  const isIcon = !!MemoIcon;

  const focusOnTextarea = useCallback(() => {
    if (ref.current) ref.current.focus();
  }, []);

  useEffect(() => {
    if (isActive || value) {
      placeholderControls.start('active');
      return;
    }

    placeholderControls.start('default');
  }, [isActive, isErrorActive, placeholderControls, value]);

  return (
    <div className={`textarea ${isIcon && 'icon'} ${isErrorActive && 'error'} `}>
      {isIcon && (
        <div aria-hidden onClick={focusOnTextarea} className="textarea__icon">
          <MemoIcon />
        </div>
      )}

      <textarea
        className="textarea__textfild"
        ref={ref}
        value={value}
        {...(anotherProps as React.HTMLAttributes<HTMLTextAreaElement>)}
      />

      {isErrorActive && (
        <motion.div
          onClick={focusOnTextarea}
          className="textarea__valid-error"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {validError}
        </motion.div>
      )}

      {placeholder && (
        <motion.div
          onClick={focusOnTextarea}
          animate={placeholderControls}
          className="textarea__placeholder"
          initial="default"
          transition={{ duration: 0.15 }}
          variants={{
            active: isIcon
              ? { translateY: -27, translateX: -27, scale: 0.9 }
              : { translateY: -27, translateX: -10, scale: 0.9 },
            default: { translateY: 0, translateX: 0, scale: 1 },
          }}
        >
          {placeholder}
        </motion.div>
      )}
    </div>
  );
});
