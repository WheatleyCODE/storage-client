import React, { FC } from 'react';
import { Checkbox, Link, Button } from 'components';
import { PathRoutes } from 'types';
import { Form } from '../Form/Form';
import './AuthForm.scss';

export interface IAuthFormProps {
  title: string;
  buttonText: string;
  buttonAction: () => void;
  buttonIsDisable: boolean;
  linkText: string;
  linkPath: PathRoutes;
  checkboxValue?: boolean;
  checkboxAction?: () => void;
  hideLinks?: boolean;
  hideResetPassword?: boolean;
  children: React.ReactNode;
}

export const AuthForm: FC<IAuthFormProps> = (props) => {
  const {
    title,
    buttonText,
    buttonAction,
    buttonIsDisable,
    linkText,
    linkPath,
    checkboxValue = false,
    checkboxAction = () => {},
    hideLinks = false,
    hideResetPassword = false,
    children,
  } = props;
  return (
    <div className="auth-form">
      <Form title={title}>
        {children}

        {!hideLinks ? (
          <div className="auth-form__links links">
            <div className="links__block">
              <Checkbox value={checkboxValue} onClick={checkboxAction} label="Показать пароль" />
            </div>
            <div className="links__block">
              {!hideResetPassword && (
                <Link text="Забыли пароль?" href={PathRoutes.RESET_PASSWORD} />
              )}
            </div>
          </div>
        ) : (
          <div className="auth-form__padding" />
        )}

        <div className="auth-form__buttons">
          <Button
            disable={buttonIsDisable}
            onClick={buttonAction}
            outline="fill"
            color="blue"
            text={buttonText}
          />
        </div>
        <hr className="auth-form__hr" />
        <div className="auth-form__auth auth">
          <div className="auth__block">
            <Link text={linkText} href={linkPath} />
          </div>
        </div>
      </Form>
    </div>
  );
};
