import React, { FC } from 'react';
import { MdOutlineCreditCardOff } from 'react-icons/md';
import { Button } from 'components';
import './BuyMoreSpace.scss';

export interface IBuyMoreSpaceProps {
  onClose: () => void;
}

export const BuyMoreSpace: FC<IBuyMoreSpaceProps> = ({ onClose }) => {
  return (
    <div className="buy-more-space">
      <div className="buy-more-space__message">
        <div className="buy-more-space__icon">
          <MdOutlineCreditCardOff />
        </div>
        <div className="buy-more-space__text">
          К сожалению, наш швейцарский банк куда-то пропал и не может принимать платежи.
        </div>
      </div>
      <div className="buy-more-space__button">
        <Button text="Освободить место в хранилище" />
      </div>
    </div>
  );
};
