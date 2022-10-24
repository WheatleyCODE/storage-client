import React, { FC, useState } from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Input, AuthForm } from 'components';
import { emailValidator } from 'helpers';
import { useActions, useValidInput } from 'hooks';
import { PathRoutes } from 'types';
import './ResetPasswordForm.scss';

export const ResetPasswordForm: FC = () => {
  const emailInput = useValidInput([emailValidator]);
  const [isDisable, setIsDisable] = useState(false);
  const { resetPassword } = useActions();

  const resetPasswordHandlerr = async () => {
    if (emailInput.isError || !emailInput.value) return;

    setIsDisable(true);

    await resetPassword(emailInput.value);

    setIsDisable(false);
  };

  return (
    <div className="reset-password-form">
      <AuthForm
        title="Сброс пароля"
        buttonText="Сбросить пароль"
        buttonAction={resetPasswordHandlerr}
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
          onFocus={emailInput.onFocus}
          isError={emailInput.isError}
          validError={emailInput.validError}
          isActive={emailInput.isActive}
          changeFocus={emailInput.changeFocus}
          changeActive={emailInput.changeActive}
        />
      </AuthForm>
    </div>
  );
};
