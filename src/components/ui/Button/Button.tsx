import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';
import './Button.scss';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  type?: 'icon' | 'default';
  outline?: 'fill' | 'outline';
  color?: 'black' | 'none-light' | 'none-dark' | 'blue' | 'orange' | 'green' | 'red';
  radius?: 'rounded' | 'none';
  className?: string;
  Icon?: IconType;
  disable?: boolean;
}

export const Button: FC<IButtonProps> = memo((props) => {
  const {
    text,
    type = 'default',
    outline = 'outline',
    color = 'blue',
    radius = 'none',
    className = '',
    Icon,
    disable = false,
    ...otherProps
  } = props;

  const MemoIcon = Icon && memo(Icon);

  return (
    <button
      className={`button ${type} ${outline} ${color} ${radius} ${
        disable ? 'disable' : ''
      } ${className}`}
      type="button"
      disabled={disable}
      {...otherProps}
    >
      {MemoIcon && (
        <div aria-hidden className="button__icon">
          <MemoIcon />
        </div>
      )}
      {text}
    </button>
  );
});
