import { getValidator } from './getValidator';

export const emailValidator = getValidator({
  email: {
    value: true,
    textError: 'Некорректная почта',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },
});

export const passValidator = getValidator({
  minLength: {
    value: 8,
    textError: 'Пароль должен быть больше 8 символов',
  },

  maxLength: {
    value: 12,
    textError: 'Пароль должен быть меньше 12 символов',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },
});

export const folderNameValidator = getValidator({
  minLength: {
    value: 3,
    textError: 'Имя должно быть больше 3 символов',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },

  maxLength: {
    value: 14,
    textError: 'Имя должно быть меньше 14 символов',
  },
});

export const nickValidator = getValidator({
  minLength: {
    value: 6,
    textError: 'Имя должно быть больше 6 символов',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },

  maxLength: {
    value: 14,
    textError: 'Имя должно быть меньше 14 символов',
  },
});
