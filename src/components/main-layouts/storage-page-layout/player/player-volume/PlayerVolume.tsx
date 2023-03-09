import React, { FC } from 'react';
import { motion } from 'framer-motion';
import './PlayerVolume.scss';

export interface PlayerVolumeProps {
  value: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PlayerVolume: FC<PlayerVolumeProps> = ({ value, min, max, onChange }) => {
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
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </motion.div>
  );
};
