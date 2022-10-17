import React, { FC, useCallback, useState } from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Input, AuthForm } from 'components';
import { emailValidator } from 'helpers';
import { useValidInput } from 'hooks';
import { PathRoutes } from 'types';
import './ResetPasswordForm.scss';

export const ResetPasswordForm: FC = () => {
  const emailInput = useValidInput([emailValidator]);
  const [isDisable, setIsDisable] = useState(false);

  const resetPassword = () => {
    if (emailInput.isError || !emailInput.value) return;

    // setIsDisable(true);
    // reset(emailInput.value);
    console.log('ok', emailInput.value);
  };

  return (
    <div className="reset-password-form">
      <AuthForm
        title="Сброс пароля"
        buttonText="Сбросить пароль"
        buttonAction={resetPassword}
        buttonIsDisable={isDisable}
        linkText="Нет аккаунта? Регистрация"
        linkPath={PathRoutes.REGISTER}
        hideLinks
      >
        <Input
          Icon={MdOutlineMailOutline}
          value={emailInput.value}
          type="email"
          placeholder="Почта"
          onChange={emailInput.onChange}
          onBlur={emailInput.onBlur}
          isError={emailInput.isError}
          validError={emailInput.validError}
        />
      </AuthForm>
    </div>
  );
};
