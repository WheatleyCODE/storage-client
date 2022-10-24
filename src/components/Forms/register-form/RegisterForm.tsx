import React, { FC, useCallback, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Input, AuthForm } from 'components';
import { useActions, useValidInput } from 'hooks';
import { emailValidator, nickValidator, passValidator } from 'helpers';
import { PathRoutes } from 'types';
import { getPassError, isEqual } from 'utils';
import './RegisterForm.scss';

export const RegisterForm: FC = () => {
  const nickInput = useValidInput([nickValidator]);
  const emailInput = useValidInput([emailValidator]);
  const passInput = useValidInput([passValidator]);
  const repPassInput = useValidInput([passValidator]);
  const [showPass, setShowPass] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { register } = useActions();

  const changeShowPass = useCallback(() => setShowPass((p) => !p), []);

  const isEqPass = isEqual(passInput.value, repPassInput.value);
  const passError = getPassError(isEqPass, passInput.isTouched, repPassInput.isTouched);

  const registerHandler = () => {
    if (emailInput.isError || passInput.isError) return;
    if (nickInput.isError || passError) return;
    if (!nickInput.value || !emailInput.value) return;
    if (!passInput.value) return;

    setIsDisable(true);

    register({
      name: nickInput.value,
      email: emailInput.value,
      password: passInput.value,
    });

    setIsDisable(false);
  };

  return (
    <div className="register-form">
      <AuthForm
        title="Регистрация"
        buttonText="Регистрация"
        buttonAction={registerHandler}
        buttonIsDisable={isDisable}
        linkText="Есть аккаунт? Войти"
        linkPath={PathRoutes.LOGIN}
        checkboxValue={showPass}
        checkboxAction={changeShowPass}
      >
        <Input
          Icon={MdOutlineMailOutline}
          value={nickInput.value}
          type="Имя пользователя"
          placeholder="Пользователь"
          onChange={nickInput.onChange}
          onBlur={nickInput.onBlur}
          onFocus={nickInput.onFocus}
          isError={nickInput.isError}
          validError={nickInput.validError}
          isActive={nickInput.isActive}
          changeFocus={nickInput.changeFocus}
          changeActive={nickInput.changeActive}
        />
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
        <Input
          Icon={RiLockPasswordLine}
          value={passInput.value}
          type={showPass ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={passInput.onChange}
          onBlur={passInput.onBlur}
          onFocus={passInput.onFocus}
          isError={passInput.isError || !!passError}
          validError={passInput.validError || passError}
          isActive={passInput.isActive}
          changeFocus={passInput.changeFocus}
          changeActive={passInput.changeActive}
        />
        <Input
          Icon={RiLockPasswordLine}
          value={repPassInput.value}
          type={showPass ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={repPassInput.onChange}
          onBlur={repPassInput.onBlur}
          onFocus={repPassInput.onFocus}
          isError={repPassInput.isError || !!passError}
          validError={repPassInput.validError || passError}
          isActive={repPassInput.isActive}
          changeFocus={repPassInput.changeFocus}
          changeActive={repPassInput.changeActive}
        />
      </AuthForm>
    </div>
  );
};
