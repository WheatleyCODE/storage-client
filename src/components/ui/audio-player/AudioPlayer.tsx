import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MdFastForward,
  MdFastRewind,
  MdPause,
  MdPlayArrow,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md';
import { Button } from 'components';
import { useAudioPlayer, useDelayHover } from 'hooks';
import { RepeatIcons } from 'consts';
import { getImageLink } from 'utils';
import { PlayerCloseButton } from './player-close-button/PlayerCloseButton';
import { PlayerProgress } from './player-progress/PlayerProress';
import { PlayerVolume } from './player-volume/PlayerVolume';
import './AudioPlayer.scss';

const audio = new Audio();

export const AudioPlayer: FC = () => {
  const {
    mainDivRef,
    repeatType,
    isPlay,
    isMute,
    currentTrackData,
    closeAudioPlayer,
    changeCurrentTime,
    status,
    volume,
    prevTrack,
    nextTrack,
    toggleIsPlay,
    toggleIsMute,
    changeRepeatType,
    changeVolume,
  } = useAudioPlayer(audio);
  const { currentTime, duration } = status;
  const {
    onMouseEnter: onMouseEnterVolume,
    onMouseLeave: onMouseLeaveVolume,
    onMouseMove: onMouseMoveVolume,
    isShow: isShowVolume,
  } = useDelayHover(false, 1000);

  const {
    onMouseEnter: onMouseEnterClose,
    onMouseLeave: onMouseLeaveClose,
    onMouseMove: onMouseMoveClose,
    isShow: isShowClose,
  } = useDelayHover(false, 1000);

  const PlayIcon = isPlay ? MdPause : MdPlayArrow;
  const RepeatIcon = RepeatIcons[repeatType].Icon;
  const repeatColor = RepeatIcons[repeatType].color;
  const path = getImageLink(currentTrackData) || '';
  const valueVolume = isMute ? 0 : volume;

  return (
    <motion.div
      ref={mainDivRef}
      initial={{ opacity: 0, translateY: 65 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 65 }}
      transition={{ duration: 0.1 }}
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
          {isShowClose && <PlayerCloseButton onClose={closeAudioPlayer} />}
        </AnimatePresence>

        <PlayerProgress
          changeCurrentTime={changeCurrentTime}
          currentTime={currentTime}
          duration={duration}
        />

        <div className="player__main">
          <div className="player__buttons">
            <Button onClick={prevTrack} color="none-dark" type="icon" Icon={MdFastRewind} />
            <Button onClick={toggleIsPlay} color="none-dark" type="icon" Icon={PlayIcon} />
            <Button onClick={nextTrack} color="none-dark" type="icon" Icon={MdFastForward} />
          </div>
          <div className="player__info">
            <img className="player__image" src={path} alt="Картинка" />

            <div className="player__text">
              <div className="player__track-name">{currentTrackData.name}</div>
              <div className="player__track-author">{currentTrackData.author}</div>
            </div>
          </div>

          <div className="player__seatings">
            <Button
              onClick={changeRepeatType}
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
                onClick={toggleIsMute}
                color="none-dark"
                type="icon"
                Icon={isMute ? MdVolumeOff : MdVolumeUp}
              />

              <AnimatePresence>
                {isShowVolume && (
                  <PlayerVolume min={0} max={100} value={valueVolume} onChange={changeVolume} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
