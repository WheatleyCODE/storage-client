import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { MdArrowBack, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useResizeObserver } from 'hooks';
import { getImageLink, getWorkplaceIcon } from 'utils';
import { WorkplaceItem } from 'types';
import './ImageModal.scss';

export interface IImageModalProps {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export type Size = { width: number; height: number };

export const ImageModal: FC<IImageModalProps> = ({ currentItems, onClose }) => {
  const item = currentItems[0];
  const refImage = useRef<HTMLImageElement | null>(null);
  const refDiv = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [initialSize, setInitialSize] = useState<Size>({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState<[width: number, height: number]>([1, 1]);

  const imageLink = getImageLink(item);
  const MemoArrow = memo(MdArrowBack);
  const MemoIcon = memo(getWorkplaceIcon(item));

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  const containerSize = useResizeObserver(refDiv);

  const fractionReduce = (
    numerator: number,
    denominator: number
  ): [numerator: number, denominator: number] => {
    let a = numerator;
    let b = denominator;
    let c;

    while (b) {
      c = a % b;
      a = b;
      b = c;
    }

    return [numerator / a, denominator / a];
  };

  useEffect(() => {
    const image = refImage.current;
    if (!image) return;

    const width = image.clientWidth;
    const height = image.clientHeight;

    setSize({ width, height });
    setInitialSize({ width, height });
    setAspectRatio(fractionReduce(width, height));
  }, []);

  useEffect(() => {
    const [containerWidth, containerHeight] = containerSize;
    const [ratioWidth, ratioHeight] = aspectRatio;
    const { width, height } = size;

    if (containerWidth !== width && containerWidth < initialSize.width) {
      const h = (containerWidth * ratioHeight) / ratioWidth;

      if (h > containerHeight) {
        return;
      }

      setSize({
        width: containerWidth,
        height: h,
      });

      return;
    }

    if (containerHeight !== height && containerHeight < initialSize.height) {
      const w = (containerHeight * ratioWidth) / ratioHeight;

      if (w > containerWidth) {
        return;
      }

      setSize({
        width: w,
        height: containerHeight,
      });
    }
  }, [aspectRatio, containerSize, initialSize.height, initialSize.width, size]);

  return (
    <div aria-hidden onClick={stopPropagation} className="image-modal">
      <div className="image-modal__header">
        <div className="image-modal__title">
          <div aria-hidden onClick={onClose} className="image-modal__arrow">
            <MemoArrow />
          </div>
          <div className="image-modal__name">
            <MemoIcon className="image-modal__icon" />
            {item.name}
          </div>
        </div>
        <div className="image-modal__action">
          <MdOutlineRemoveRedEye className="image-modal__icon" />
          Только просмотр
        </div>
        {/* <div className="image-modal__menu">
          <h1>name</h1>
        </div> */}
      </div>
      {imageLink && (
        <div ref={refDiv} className="image-modal__image">
          <img
            height={size.height || undefined}
            width={size.width || undefined}
            ref={refImage}
            src={imageLink}
            alt="Картика"
          />
        </div>
      )}
    </div>
  );
};
