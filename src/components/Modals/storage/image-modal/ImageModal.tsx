import React, { FC, useCallback, useRef, useEffect } from 'react';
import { FileItemInfo, ViewItemLayout, WorkplaceModal } from 'components';
import { ItemsService } from 'services';
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

  useEffect(() => {
    ItemsService.addListen({ id: currentItemData.id, type: currentItemData.type });
  }, []);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  return (
    <WorkplaceModal currentItemData={currentItemData} onClose={onClose}>
      <ViewItemLayout>
        <div aria-hidden onClick={stopPropagation} className="image-modal">
          <img ref={refImage} src={imageLink || ''} alt="Картика" />
          <FileItemInfo itemData={currentItemData} />
        </div>
      </ViewItemLayout>
    </WorkplaceModal>
  );
};
