/* eslint-disable max-len */
export interface IValidatorOptions {
  noEmpty?: {
    value: boolean;
    textError: string;
  };

  minLength?: {
    value: number;
    textError: string;
  };

  maxLength?: {
    value: number;
    textError: string;
  };

  email?: {
    value: boolean;
    textError: string;
  };
}

export const getValidator = (options: IValidatorOptions) => {
  const { email, noEmpty, minLength, maxLength } = options;

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailCheck = (str: string): string | null => {
    if (email && !re.test(String(str).toLowerCase())) {
      return email.textError;
    }

    return null;
  };

  const minLengthCheck = (str: string): string | null => {
    if (minLength && str.length < minLength.value) {
      return minLength.textError;
    }

    return null;
  };

  const maxLengthCheck = (str: string): string | null => {
    if (maxLength && str.length > maxLength.value) {
      return maxLength.textError;
    }

    return null;
  };

  const noEmptyCheck = (str: string): string | null => {
    if (noEmpty && str.length < 1) {
      return noEmpty.textError;
    }

    return null;
  };

  return (str: string) => {
    if (noEmpty?.value) {
      const error = noEmptyCheck(str);
      if (error) return error;
    }

    if (email?.value) {
      const error = emailCheck(str);
      if (error) return error;
    }

    if (minLength?.value) {
      const error = minLengthCheck(str);
      if (error) return error;
    }

    if (maxLength?.value) {
      const error = maxLengthCheck(str);
      if (error) return error;
    }

    return null;
  };
};

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

export const nameValidator = getValidator({
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

export const textAreaValidator = getValidator({
  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },

  maxLength: {
    value: 50,
    textError: 'Текс должнен быть меньше 50 символов',
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
