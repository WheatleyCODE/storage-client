/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { FC } from 'react';
import './PlayerProgress.scss';

export interface PlayerProgressProps {}

export const PlayerProgress: FC<PlayerProgressProps> = () => {
  return (
    <div className="player-progress">
      <div className="bat" />
    </div>
  );
};
