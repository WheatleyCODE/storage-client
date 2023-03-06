/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import './PlayerVolume.scss';

export interface PlayerVolumeProps {
  value: number;
  onChange: () => void;
}

export const PlayerVolume: FC<PlayerVolumeProps> = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      aria-hidden
      className="player-volume"
    >
      <input
        className="player-volume__input"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={onChange}
      />
    </motion.div>
  );
};
