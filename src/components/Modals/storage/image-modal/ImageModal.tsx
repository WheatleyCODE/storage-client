import React, { FC, useCallback, useRef } from 'react';
import { ViewItemLayout, WorkplaceModal } from 'components';
import { getImageLink } from 'utils';
import { IClientItemData } from 'types';
import './ImageModal.scss';

export interface IImageModalProps {
  currentItemData: IClientItemData;
  onClose: () => void;
}

export type Size = { width: number; height: number };

export const ImageModal: FC<IImageModalProps> = ({ currentItemData, onClose }) => {
  const refImage = useRef<HTMLImageElement | null>(null);

  const imageLink = getImageLink(currentItemData);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout>
        <div aria-hidden onClick={stopPropagation} className="image-modal">
          <img ref={refImage} src={imageLink || ''} alt="Картика" />
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
