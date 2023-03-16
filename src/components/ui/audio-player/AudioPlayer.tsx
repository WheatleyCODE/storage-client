import React, { FC, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  MdFastForward,
  MdFastRewind,
  MdPause,
  MdPlayArrow,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md';
import { playerActions } from 'store';
import { Button } from 'components';
import { ItemsService } from 'services';
import { useDelayHover, usePlayerHandlers, useTypedSelector } from 'hooks';
import { RepeatIcons } from 'consts';
import { PropertyFactory } from 'helpers';
import { correctVolume, getFileLink, getImageLink } from 'utils';
import { RepeatType } from 'types';
import { PlayerCloseButton } from './player-close-button/PlayerCloseButton';
import { PlayerProgress } from './player-progress/PlayerProress';
import { PlayerVolume } from './player-volume/PlayerVolume';
import './AudioPlayer.scss';

const audio = new Audio();

export const Player: FC = () => {
  const { currentTrack, isPlay, repeatType, isMute, volume, playlist } = useTypedSelector(
    (state) => state.player
  );
  const currentTrackData = PropertyFactory.create(currentTrack);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { changeRepeatType, nextTrack, prevTrack } = usePlayerHandlers();
  const dispatch = useDispatch();
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

  const RepeatIcon = RepeatIcons[repeatType].Icon;
  const repeatColor = RepeatIcons[repeatType].color;

  const addListen = () => {
    ItemsService.addListen({ id: currentTrack.id, type: currentTrack.type });
  };

  useEffect(() => {
    audio.onended = () => {
      if (repeatType === RepeatType.NONE) {
        dispatch(playerActions.changePlay(false));
        return;
      }

      if (repeatType === RepeatType.TRACK) {
        audio.play();
        ItemsService.addListen({ id: currentTrack.id, type: currentTrack.type });
        return;
      }

      const index = playlist.findIndex((track) => track.id === currentTrack.id);

      if (repeatType === RepeatType.ALBUM && index === playlist.length - 1) {
        dispatch(playerActions.setCurrent(playlist[0]));
        return;
      }

      if (playlist.length > 1 && playlist[index + 1]) {
        const track = playlist[index + 1];
        dispatch(playerActions.setCurrent(track));
      }
    };
  }, [repeatType, playlist, currentTrack]);

  useEffect(() => {
    const path = getFileLink(currentTrackData);
    if (!path) return;

    ItemsService.addListen({ id: currentTrack.id, type: currentTrack.type });

    audio.src = path;
    audio.volume = correctVolume(volume);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    if (isPlay) audio.play();
  }, [currentTrack]);

  const changeCurrentTime = useCallback(
    (time: number) => {
      audio.currentTime = time;
      setCurrentTime(time);
    },
    [duration]
  );

  const changePlay = useCallback(() => {
    if (!isPlay) {
      audio.play();
    } else {
      audio.pause();
    }

    dispatch(playerActions.changePlay(!isPlay));
  }, [isPlay]);

  const changeMute = useCallback(() => {
    if (!isMute) {
      audio.volume = 0;
    } else {
      audio.volume = correctVolume(volume);
    }

    dispatch(playerActions.changeMute(!isMute));
  }, [isMute, volume]);

  const closePlayer = useCallback(() => {
    dispatch(playerActions.changeOpen(false));
  }, []);

  const changeVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number(e.target.value);

      if (isMute && newVolume !== 0) {
        dispatch(playerActions.changeMute(false));
      }

      if (newVolume === 0) {
        dispatch(playerActions.changeMute(true));
      }

      audio.volume = correctVolume(newVolume);
      dispatch(playerActions.setVolume(newVolume));
    },
    [isMute]
  );

  return (
    <motion.div
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
          {isShowClose && <PlayerCloseButton onClose={closePlayer} />}
        </AnimatePresence>

        <PlayerProgress
          changeCurrentTime={changeCurrentTime}
          currentTime={currentTime}
          duration={duration}
        />

        <div className="player__main">
          <div className="player__buttons">
            <Button onClick={prevTrack} color="none-dark" type="icon" Icon={MdFastRewind} />
            <Button
              onClick={changePlay}
              color="none-dark"
              type="icon"
              Icon={isPlay ? MdPause : MdPlayArrow}
            />

            <Button onClick={nextTrack} color="none-dark" type="icon" Icon={MdFastForward} />
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
                onClick={changeMute}
                color="none-dark"
                type="icon"
                Icon={isMute ? MdVolumeOff : MdVolumeUp}
              />

              <AnimatePresence>
                {isShowVolume && (
                  <PlayerVolume
                    min={0}
                    max={100}
                    value={isMute ? 0 : volume}
                    onChange={changeVolume}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
