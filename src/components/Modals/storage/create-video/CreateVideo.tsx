import React, { FC } from 'react';
import './CreateVideo.scss';

export interface ICreateVideoProps {
  onClose: () => void;
}

export const CreateVideo: FC<ICreateVideoProps> = ({ onClose }) => {
  return (
    <div className="create-video">
      <h1>CreateVideo</h1>
    </div>
  );
};
