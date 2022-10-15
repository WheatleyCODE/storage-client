import React, { useCallback, useState } from 'react';

export interface IValidInputOpts {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  isTouched: boolean;
  validError: string | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export type IValidator = (str: string) => string | null;

export const useValidInput = (validators: IValidator[]): IValidInputOpts => {
  const [value, setValue] = useState('');
  const [validError, setValidError] = useState<null | string>(null);
  const [isTouched, setIsTouched] = useState(false);
  let couter = 0;

  const onBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (couter === 0 && e.target.value.length > 2) {
      setIsTouched(true);
    }

    validators.forEach((fn) => {
      setValidError(fn(e.target.value));
    });

    couter += 1;
  }, []);

  return {
    value,
    onChange,
    onBlur,
    isError: !!(isTouched && validError),
    isTouched,
    validError,
    setValue,
  };
};
