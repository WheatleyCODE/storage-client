import React, { FC, useCallback, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Input, Checkbox, Link, Button } from 'components';
import { emailValidator, passValidator } from 'helpers';
import { useValidInput } from 'hooks';
import { PathRoutes } from 'types';
import { Form } from '../Form/Form';
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
      <Form title="Вход">
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
          type="password"
          placeholder="Пароль"
          onChange={passInput.onChange}
          onBlur={passInput.onBlur}
          isError={passInput.isError}
          validError={passInput.validError}
        />
        <div className="login-form__links links">
          <div className="links__block">
            <Checkbox value={showPass} onClick={changeShowPass} label="Показать пароль" />
          </div>
          <div className="links__block">
            <Link text="Забыли пароль?" href={PathRoutes.RESET_PASSWORD} />
          </div>
        </div>
        <div className="login-form__buttons">
          <Button onClick={login} outline="fill" color="blue" text="Войти" />
        </div>
        <hr className="login-form__hr" />
        <div className="login-form__auth auth">
          <div className="auth__block">
            <Link text="Нет аккаунта? Регистрация" href={PathRoutes.REGISTER} />
          </div>
        </div>
      </Form>
    </div>
  );
};
