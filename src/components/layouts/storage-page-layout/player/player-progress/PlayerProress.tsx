import { useDelayHover } from 'hooks';
import React, { FC, useState } from 'react';
import { formatTime, getPercentOfNumber, numOfNumPercent } from 'utils';
import './PlayerProgress.scss';

export interface PlayerProgressProps {
  currentTime: number;
  duration: number;
  changeCurrentTime: (percent: number) => void;
}

export const PlayerProgress: FC<PlayerProgressProps> = (props) => {
  const { currentTime, duration, changeCurrentTime } = props;
  const [left, setLeft] = useState(0);
  const [titleCurrentTime, setTitleCurrentTime] = useState(0);
  const { isShow, onMouseEnter, onMouseLeave } = useDelayHover();
  const activePercent = numOfNumPercent(currentTime, duration);

  const calcTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX } = e;
    const { width, left: leftX } = currentTarget.getBoundingClientRect();
    const x = clientX - leftX;

    const percent = Math.round((x / width) * 100);
    const time = getPercentOfNumber(duration, percent);

    return { time, x };
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { time } = calcTime(e);
    changeCurrentTime(time);
  };

  const onMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const { time, x } = calcTime(e);
    setTitleCurrentTime(time);
    setLeft(x - 17);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMoveHandler}
      aria-hidden
      onClick={onClick}
      className="player-progress"
    >
      {isShow && (
        <div style={{ left: `${left}px` }} className="player-progress__title">
          {formatTime(Math.ceil(titleCurrentTime))} <div className="player-progress__triangle" />
        </div>
      )}

      <div style={{ width: `${activePercent}%` }} className="player-progress__line" />
      <div className="player-progress__duration">
        {formatTime(Math.ceil(currentTime))} / {formatTime(Math.ceil(duration))}
      </div>
    </div>
  );
};
