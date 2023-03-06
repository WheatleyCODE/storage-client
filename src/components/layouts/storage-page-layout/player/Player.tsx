import React, { FC, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  MdClose,
  MdFastForward,
  MdFastRewind,
  MdPause,
  MdPlayArrow,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md';
import { playerActions } from 'store';
import { Button } from 'components';
import { useDelayHover, useTypedSelector } from 'hooks';
import { RepeatIcons, repeatSteps } from 'consts';
import './Player.scss';
import { PropertyFactory } from 'helpers';
import { getFileLink, getImageLink } from 'utils';
import { PlayerCloseButton } from './player-close-button/PlayerCloseButton';
import { PlayerProgress } from './player-progress/PlayerProress';
import { PlayerVolume } from './player-volume/PlayerVolume';

const audio = new Audio();

export const Player: FC = () => {
  const { currentTrack, isPlay, repeatType, isMute } = useTypedSelector((state) => state.player);
  const currentTrackData = PropertyFactory.create(currentTrack);

  const dispatch = useDispatch();
  const {
    onMouseEnter: onMouseEnterVolume,
    onMouseLeave: onMouseLeaveVolume,
    onMouseMove: onMouseMoveVolume,
    isShow: isShowVolume,
  } = useDelayHover();

  console.log(currentTrackData);

  const {
    onMouseEnter: onMouseEnterClose,
    onMouseLeave: onMouseLeaveClose,
    onMouseMove: onMouseMoveClose,
    isShow: isShowClose,
  } = useDelayHover();

  const RepeatIcon = RepeatIcons[repeatType].Icon;
  const repeatColor = RepeatIcons[repeatType].color;

  useEffect(() => {
    const path = getFileLink(currentTrackData);
    if (!path) return;

    audio.src = path;
  }, [currentTrack]);

  const changeStep = () => {
    const index = repeatSteps.findIndex((type) => type === repeatType);
    const type = repeatSteps[index + 1];

    if (type) {
      dispatch(playerActions.changeRepeatType(type));
      return;
    }

    dispatch(playerActions.changeRepeatType(repeatSteps[0]));
  };

  const changePlay = () => {
    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
    }
    dispatch(playerActions.changePlay(!isPlay));
  };

  const changeMute = () => {
    dispatch(playerActions.changeMute(!isMute));
  };

  const closePlayer = () => {
    dispatch(playerActions.changeOpen(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 65 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 65 }}
      transition={{ duration: 0.2 }}
      className="player"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        aria-hidden
        onMouseEnter={onMouseEnterClose}
        onMouseLeave={onMouseLeaveClose}
        onMouseMove={onMouseMoveClose}
        className="player__width"
      >
        <AnimatePresence>
          {isShowClose && <PlayerCloseButton onClose={closePlayer} />}
        </AnimatePresence>

        <PlayerProgress />

        <div className="player__main">
          <div className="player__buttons">
            <Button color="none-dark" type="icon" Icon={MdFastRewind} />
            <Button
              onClick={changePlay}
              color="none-dark"
              type="icon"
              Icon={isPlay ? MdPause : MdPlayArrow}
            />
            <Button color="none-dark" type="icon" Icon={MdFastForward} />
          </div>
          <div className="player__info">
            <img
              className="player__image"
              src={getImageLink(currentTrackData) || ''}
              alt="Картинка"
            />
            <div className="player__text">
              <div className="player__track-name">{currentTrackData.name}</div>
              <div className="player__track-author">{currentTrackData.author}</div>
            </div>
          </div>
          <div className="player__seatings">
            <Button
              onClick={changeStep}
              className={repeatColor}
              color="none-dark"
              type="icon"
              Icon={RepeatIcon}
            />
            <div
              onMouseEnter={onMouseEnterVolume}
              onMouseLeave={onMouseLeaveVolume}
              onMouseMove={onMouseMoveVolume}
            >
              <Button
                onClick={changeMute}
                color="none-dark"
                type="icon"
                Icon={isMute ? MdVolumeUp : MdVolumeOff}
              />
              <AnimatePresence>
                {isShowVolume && <PlayerVolume value={30} onChange={() => {}} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
