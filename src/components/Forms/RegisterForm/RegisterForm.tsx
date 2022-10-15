import React, { FC, useCallback, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Input, Button, Link, Checkbox } from 'components';
import { useValidInput } from 'hooks';
import { emailValidator, nickValidator, passValidator } from 'helpers';
import { PathRoutes } from 'types';
import { getPassError, isEqual } from 'utils';
import { Form } from '../Form/Form';
import './RegisterForm.scss';

export const RegisterForm: FC = () => {
  const nickInput = useValidInput([nickValidator]);
  const emailInput = useValidInput([emailValidator]);
  const passInput = useValidInput([passValidator]);
  const repPassInput = useValidInput([passValidator]);
  const [showPass, setShowPass] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const changeShowPass = useCallback(() => setShowPass((p) => !p), []);

  const isEqPass = isEqual(passInput.value, repPassInput.value);
  const passError = getPassError(isEqPass, passInput.isTouched, repPassInput.isTouched);

  const register = () => {
    if (emailInput.isError || passInput.isError) return;
    if (nickInput.isError || passError) return;
    if (!nickInput.value || !emailInput.value) return;
    if (!passInput.value) return;

    // setIsDisable(true);
    // registration(nickNameInput.value, emailInput.value, passInput.value);
    console.log('ok', nickInput.value, emailInput.value, passInput.value);
  };

  return (
    <div className="register-form">
      <Form title="Регистрация">
        <Input
          Icon={MdOutlineMailOutline}
          value={nickInput.value}
          type="Имя пользователя"
          placeholder="Пользователь"
          onChange={nickInput.onChange}
          onBlur={nickInput.onBlur}
          isError={nickInput.isError}
          validError={nickInput.validError}
        />
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
        <div className="register-form__links links">
          <div className="links__block">
            <Checkbox value={showPass} onClick={changeShowPass} label="Показать пароли" />
          </div>
          <div className="links__block">
            <Link text="Забыли пароль?" href={PathRoutes.RESET_PASSWORD} />
          </div>
        </div>
        <div className="register-form__buttons">
          <Button onClick={register} outline="fill" color="blue" text="Регистрация" />
        </div>
        <hr className="register-form__hr" />
        <div className="register-form__auth auth">
          <div className="auth__block">
            <Link text="Есть аккаунт? Войти" href={PathRoutes.LOGIN} />
          </div>
        </div>
      </Form>
    </div>
  );
};
