import React, { FC, useCallback, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Input, AuthForm } from 'components';
import { useValidInput } from 'hooks';
import { passValidator } from 'helpers';
import { PathRoutes } from 'types';
import { getPassError, isEqual } from 'utils';
import './ChangePasswordForm.scss';

export const ChangePasswordForm: FC = () => {
  const passInput = useValidInput([passValidator]);
  const repPassInput = useValidInput([passValidator]);
  const [showPass, setShowPass] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const changeShowPass = useCallback(() => setShowPass((p) => !p), []);

  const isEqPass = isEqual(passInput.value, repPassInput.value);
  const passError = getPassError(isEqPass, passInput.isTouched, repPassInput.isTouched);

  const changePassword = () => {
    // if

    // setIsDisable(true);
    // changePassword('id', passInput.value);
    console.log('ok', 'id', passInput.value);
  };

  return (
    <div className="register-form">
      <AuthForm
        title="Изменение пароля"
        buttonText="Изменить паролль"
        buttonAction={changePassword}
        buttonIsDisable={isDisable}
        linkText="Войти в аккаунт"
        linkPath={PathRoutes.LOGIN}
        checkboxValue={showPass}
        checkboxAction={changeShowPass}
        hideResetPassword
      >
        <Input
          Icon={RiLockPasswordLine}
          value={passInput.value}
          type={showPass ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={passInput.onChange}
          onBlur={passInput.onBlur}
          isError={passInput.isError || !!passError}
          validError={passInput.validError || passError}
        />
        <Input
          Icon={RiLockPasswordLine}
          value={repPassInput.value}
          type={showPass ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={repPassInput.onChange}
          onBlur={repPassInput.onBlur}
          isError={repPassInput.isError || !!passError}
          validError={repPassInput.validError || passError}
        />
      </AuthForm>
    </div>
  );
};
