import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'components';
import { MdClose } from 'react-icons/md';
import './PlayerCloseButton.scss';

export interface PlayerCloseButtonProps {
  onClose: () => void;
}

export const PlayerCloseButton: FC<PlayerCloseButtonProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      aria-hidden
      onClick={onClose}
      className="player-close-button"
    >
      <Button color="none-light" type="icon" Icon={MdClose} />
    </motion.div>
  );
};
