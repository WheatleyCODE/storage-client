import React, { FC, memo } from 'react';
import { getImageLink, getWorkplaceIcon } from 'utils';
import { IClientItemData } from 'types';
import './Image.scss';

export interface IImageProps extends React.HTMLAttributes<HTMLDivElement> {
  itemData: IClientItemData;
  fontSize?: number;
}

export const Image: FC<IImageProps> = memo((props) => {
  const { itemData, className, fontSize, ...anotherProps } = props;
  const imageLink = getImageLink(itemData);
  const MemoIcon = memo(getWorkplaceIcon(itemData));

  // ? Возможно добавить открытие модалки с картинкой ?

  return (
    <div aria-hidden {...anotherProps} className={`image ${className || ''}`}>
      {imageLink && <img src={imageLink} alt="Картинка" />}
      {!imageLink && <MemoIcon style={{ fontSize: `${fontSize}px` }} />}
    </div>
  );
});
