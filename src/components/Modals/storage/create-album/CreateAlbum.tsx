import React, { FC } from 'react';
import { MdLibraryMusic } from 'react-icons/md';
import { Input, Confirm } from 'components';
import { useValidInput } from 'hooks';
import { nameValidator } from 'helpers';
import './CreateAlbum.scss';

export const CreateAlbum: FC = () => {
  const nameInput = useValidInput([nameValidator]);

  return (
    <Confirm onClose={() => {}} onUpprove={() => {}}>
      <div className="create-album">
        <h1 className="create-album__title">Создать альбом</h1>

        <Input
          Icon={MdLibraryMusic}
          value={nameInput.value}
          type="text"
          placeholder="Название альбома"
          onChange={nameInput.onChange}
          onBlur={nameInput.onBlur}
          onFocus={nameInput.onFocus}
          isError={nameInput.isError}
          validError={nameInput.validError}
          isActive={nameInput.isActive}
          changeFocus={nameInput.changeFocus}
          changeActive={nameInput.changeActive}
        />
      </div>
    </Confirm>
  );
};
