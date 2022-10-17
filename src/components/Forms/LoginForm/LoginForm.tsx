import React, { FC, useCallback, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Input, AuthForm } from 'components';
import { emailValidator, passValidator } from 'helpers';
import { useValidInput } from 'hooks';
import { PathRoutes } from 'types';
import './LoginForm.scss';

export const LoginForm: FC = () => {
  const emailInput = useValidInput([emailValidator]);
  const passInput = useValidInput([passValidator]);
  const [showPass, setShowPass] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const changeShowPass = useCallback(() => setShowPass((p) => !p), []);

  const login = () => {
    if (emailInput.isError || passInput.isError) return;
    if (!emailInput.value || !passInput.value) return;

    // setIsDisable(true);
    // login(emailInput.value, passInput.value);
    console.log('ok', emailInput.value, passInput.value);
  };

  return (
    <div className="login-form">
      <AuthForm
        title="Вход"
        buttonText="Войти"
        buttonAction={login}
        buttonIsDisable={isDisable}
        linkText="Нет аккаунта? Регистрация"
        linkPath={PathRoutes.REGISTER}
        checkboxValue={showPass}
        checkboxAction={changeShowPass}
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
        <Input
          Icon={RiLockPasswordLine}
          value={passInput.value}
          type={showPass ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={passInput.onChange}
          onBlur={passInput.onBlur}
          isError={passInput.isError}
          validError={passInput.validError}
        />
      </AuthForm>
    </div>
  );
};
