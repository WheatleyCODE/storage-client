import React, { FC, memo, useCallback } from 'react';
import {
  MdFullscreen,
  MdPause,
  MdPlayArrow,
  MdRedo,
  MdRepeat,
  MdRepeatOne,
  MdUndo,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md';
import { Button, PlayerProgress, PlayerVolume } from 'components';
import { useDelayHover } from 'hooks';
import { AnimatePresence } from 'framer-motion';
import { IVideoStatus } from 'types';
import './VideoControls.scss';

export interface IVideoControlsProps {
  toggleVideo: () => void;
  forward: () => void;
  revert: () => void;
  fullScreen: () => void;
  changeCurrentTime: (time: number) => void;
  changeVolume: (volume: number) => void;
  toggleIsRepeat: () => void;
  toggleIsMute: () => void;
  status: IVideoStatus;
}

export const VideoControls: FC<IVideoControlsProps> = memo((props) => {
  const {
    toggleVideo,
    status,
    fullScreen,
    revert,
    forward,
    changeCurrentTime,
    toggleIsRepeat,
    changeVolume,
    toggleIsMute,
  } = props;
  const { duration, currentTime, isPlaying, isRepeat, volume, isMute } = status;
  const { onMouseEnter, onMouseLeave, onMouseMove, isShow } = useDelayHover(false, 1000);

  const changeVolumeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isMute) toggleIsMute();

      changeVolume(Number(e.target.value));
    },
    [isMute]
  );

  const VolumeIcon = isMute || volume === 0 ? MdVolumeOff : MdVolumeUp;
  const RepeatIcon = isRepeat ? MdRepeatOne : MdRepeat;
  const PlayIcon = isPlaying ? MdPause : MdPlayArrow;
  const volumeValue = isMute ? 0 : volume;

  return (
    <div className="video-controls">
      <PlayerProgress
        duration={duration}
        currentTime={currentTime}
        changeCurrentTime={changeCurrentTime}
      />

      <div className="video-controls__buttons">
        <Button
          color="none-light"
          className="play"
          onClick={toggleVideo}
          type="icon"
          Icon={PlayIcon}
        />
        <Button color="none-light" type="icon" Icon={MdUndo} onClick={revert} />
        <Button color="none-light" className="right" type="icon" Icon={MdRedo} onClick={forward} />

        <div className="video-controls__volume">
          <div
            className="video-controls__volume-button"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
          >
            <Button color="none-light" type="icon" Icon={VolumeIcon} onClick={toggleIsMute} />
            <AnimatePresence>
              {isShow && (
                <PlayerVolume
                  min={0}
                  max={100}
                  value={volumeValue}
                  onChange={changeVolumeHandler}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        <Button color="none-light" type="icon" Icon={RepeatIcon} onClick={toggleIsRepeat} />

        <Button
          className="full"
          color="none-light"
          type="icon"
          Icon={MdFullscreen}
          onClick={fullScreen}
        />
      </div>
    </div>
  );
});
