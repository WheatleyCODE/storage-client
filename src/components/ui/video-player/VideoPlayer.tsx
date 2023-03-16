import React, { FC, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useVideoPlayer } from 'hooks';
import { getFileLink } from 'utils';
import { IClientItemData } from 'types';
import { VideoControls } from './video-controls/VideoControls';
import './VideoPlayer.scss';

export interface IVideoPlayerProps {
  videoData: IClientItemData;
}

export const VideoPlayer: FC<IVideoPlayerProps> = ({ videoData }) => {
  const [isShowControls, setIsShowControls] = useState(false);
  const {
    videoRef,
    toggleVideo,
    status,
    fullScreen,
    revert,
    forward,
    changeCurrentTime,
    toggleIsRepeat,
    changeVolume,
    toggleIsMute,
  } = useVideoPlayer(videoData);

  const onMouseEnter = useCallback(() => {
    setIsShowControls(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsShowControls(false);
  }, []);

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="video-player">
      <video
        ref={videoRef}
        className="video-player__video"
        preload="metadata"
        onClick={toggleVideo}
      >
        <track kind="captions" />
        <source src={getFileLink(videoData) || ''} type="video/mp4" />
      </video>

      <AnimatePresence>
        {isShowControls && (
          <motion.div
            initial={{ translateY: 5, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            exit={{ translateY: 5, opacity: 0 }}
            className="video-player__controls"
          >
            <VideoControls
              fullScreen={fullScreen}
              revert={revert}
              forward={forward}
              toggleVideo={toggleVideo}
              changeCurrentTime={changeCurrentTime}
              toggleIsRepeat={toggleIsRepeat}
              changeVolume={changeVolume}
              toggleIsMute={toggleIsMute}
              status={status}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
