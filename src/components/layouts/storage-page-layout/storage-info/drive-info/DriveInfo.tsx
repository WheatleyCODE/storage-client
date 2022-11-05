import React, { FC } from 'react';
import './DriveInfo.scss';

export const DriveInfo: FC = () => {
  return (
    <div className="drive-info">
      <img
        className="drive-info__img"
        src="https://ssl.gstatic.com/docs/doclist/images/empty_state_details.png"
        alt=""
      />
      <div className="drive-info__text">Выберите объект, чтобы посмотреть подробности</div>
    </div>
  );
};
