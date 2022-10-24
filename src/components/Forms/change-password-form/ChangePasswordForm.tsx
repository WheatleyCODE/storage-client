import React, { FC, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Input, AuthForm } from 'components';
import { useActions, useValidInput } from 'hooks';
import { passValidator } from 'helpers';
import { PathRoutes } from 'types';
import { checkRequestStatus, getPassError, isEqual } from 'utils';
import './ChangePasswordForm.scss';

export const ChangePasswordForm: FC = () => {
  const passInput = useValidInput([passValidator]);
  const repPassInput = useValidInput([passValidator]);
  const [showPass, setShowPass] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { changePassword } = useActions();

  const changeShowPass = useCallback(() => setShowPass((p) => !p), []);

  const isEqPass = isEqual(passInput.value, repPassInput.value);
  const passError = getPassError(isEqPass, passInput.isTouched, repPassInput.isTouched);

  const changePasswordHandler = async () => {
    if (passInput.isError || repPassInput.isError) return;
    if (!passInput.value || !repPassInput.value) return;
    if (passError) return;

    setIsDisable(true);

    const data = await changePassword({
      password: passInput.value,
      link: params.link || '',
    });

    setIsDisable(true);

    if (checkRequestStatus(data)) {
      navigate(PathRoutes.LOGIN);
    }
  };

  return (
    <div className="register-form">
      <AuthForm
        title="Изменение пароля"
        buttonText="Изменить пароль"
        buttonAction={changePasswordHandler}
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
