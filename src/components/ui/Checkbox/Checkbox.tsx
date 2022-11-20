import React, { FC, memo, useEffect } from 'react';
import * as uuid from 'uuid';
import { motion, useAnimation } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import './Checkbox.scss';

export interface ICheckboxProps {
  label: string;
  value: boolean;
  onClick: () => void;
}

export const Checkbox: FC<ICheckboxProps> = memo(({ label, value, onClick }) => {
  const checkControls = useAnimation();

  useEffect(() => {
    if (value) {
      checkControls.start('active');
      return;
    }

    checkControls.start('hidden');
  }, [value, checkControls]);

  const randomString = uuid.v4();

  return (
    <div className="checkbox">
      <label className="checkbox__label" htmlFor={`checkbox ${randomString}`}>
        <div className={`checkbox__square ${value && 'active'}`}>
          <motion.div
            animate={checkControls}
            className="checkbox__check"
            initial="hidden"
            transition={{ duration: 0.1 }}
            variants={{
              active: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
          >
            <FiCheck />
          </motion.div>
        </div>
        <input
          className="checkbox__textfild"
          onClick={onClick}
          id={`checkbox ${randomString}`}
          type="checkbox"
        />
        <div className="checkbox__text">{label}</div>
      </label>
    </div>
  );
});
