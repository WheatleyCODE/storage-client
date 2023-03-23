import React, { FC, MouseEvent, useCallback, memo, useState } from 'react';
import { Portal, Backdrop, Button, Comment, CommentCreator } from 'components';
import { AnimatePresence } from 'framer-motion';
import {
  MdArrowBack,
  MdArrowLeft,
  MdArrowRight,
  MdFileDownload,
  MdOutlineAddComment,
  MdOutlineRemoveRedEye,
  MdCreate,
} from 'react-icons/md';
import { useActions, useComments, useTypedSelector } from 'hooks';
import { IClientItemData } from 'types';
import { useDispatch } from 'react-redux';
import { modalsActions, storageActions } from 'store';
import { getActionMessage, PropertyFactory } from 'helpers';
import './WorkplaceModal.scss';

export interface IWorkplaceModalProps {
  onClose: () => void;
  onChangeCurrent?: () => void;
  onClickHeader?: () => void;
  children: React.ReactNode;
  currentItemData: IClientItemData;
  isChange?: boolean;
}

export const WorkplaceModal: FC<IWorkplaceModalProps> = (props) => {
  const {
    onClose,
    children,
    currentItemData,
    isChange = false,
    onChangeCurrent,
    onClickHeader,
  } = props;
  const [anwerId, setAnwerId] = useState<string | undefined>();
  const [isShowCreate, setIsShowCreate] = useState(false);
  const { workplaceItems } = useTypedSelector((state) => state.storage);
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { downloadAcrhive } = useActions();
  const { id, type, name } = currentItemData;
  const { comments, createCommentAsync, deleteCommentAsync } = useComments({
    id,
    type,
  });

  const MemoEye = memo(MdOutlineRemoveRedEye);
  const MemoCreate = memo(MdCreate);

  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    if (onClickHeader) onClickHeader();
  }, []);

  const download = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      downloadAcrhive({ items: [{ id, type }] });
    },
    [id, type]
  );

  const toggleIsShowCreate = useCallback(() => {
    setIsShowCreate((p) => !p);
    setAnwerId(undefined);
  }, []);

  const closeIsShowCreate = useCallback(() => {
    setIsShowCreate(false);
    setAnwerId(undefined);
  }, []);

  const changeCurrent = (num: number) => {
    const index = workplaceItems.findIndex((item) => item.id === id);

    const newItem = workplaceItems[index + num];

    if (index !== -1 && newItem) {
      if (newItem.type !== type) {
        const itemData = PropertyFactory.create(newItem);
        const key = isChange ? itemData.openChangeModalStateKey : itemData.openModalStateKey;

        if (!key) return;

        onClose();
        dispatch(storageActions.setCurrent([newItem]));
        dispatch(modalsActions.changeIsModal({ key, boolean: true }));
        return;
      }

      dispatch(storageActions.setCurrent([newItem]));
    }
  };

  const addCurrent = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onChangeCurrent) onChangeCurrent();
      changeCurrent(1);
    },
    [currentItemData]
  );

  const subCurrent = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onChangeCurrent) onChangeCurrent();
      changeCurrent(-1);
    },
    [currentItemData]
  );

  const createComment = useCallback(
    (text: string, answerFor?: string) => {
      createCommentAsync({ id, type, text, answerFor });

      dispatch(
        getActionMessage({ color: 'default', text: 'Комментарий добавлен', isRestore: false })
      );
    },
    [createCommentAsync, id, type]
  );

  const deleteComment = useCallback(
    (comment: string) => {
      deleteCommentAsync({ id, type, comment });

      dispatch(
        getActionMessage({ color: 'default', text: 'Комментарий удален', isRestore: false })
      );
    },
    [deleteCommentAsync, id, type]
  );

  const setAnwerIdHandler = useCallback((anwrId: string) => {
    setAnwerId(anwrId);
    setIsShowCreate(true);
  }, []);

  const commentsItems = [...comments].filter((com) => !com.answerFor);

  return (
    <Portal>
      <Backdrop isDark onClose={onClose}>
        <div className="workplace-modal">
          <div aria-hidden onClick={stopPropagation} className="workplace-modal__header">
            <div className="workplace-modal__name">
              <Button
                onClick={onClose}
                outline="fill"
                color="none-light"
                type="icon"
                Icon={MdArrowBack}
              />
              <div className="workplace-modal__item-name">{name}</div>
            </div>
            <div className="workplace-modal__app">
              {isChange ? (
                <div className="workplace-modal__correct">
                  Редактирование <MemoCreate />
                </div>
              ) : (
                <div className="workplace-modal__only-view">
                  Только просмотр <MemoEye />
                </div>
              )}
            </div>
            <div className="workplace-modal__buttons">
              <Button
                onClick={toggleIsShowCreate}
                outline="fill"
                color="none-light"
                type="icon"
                Icon={MdOutlineAddComment}
              />
              <Button
                onClick={download}
                outline="fill"
                color="none-light"
                type="icon"
                Icon={MdFileDownload}
              />
            </div>
          </div>
          <div className="workplace-modal__right">
            <div className="workplace-modal__icon">
              <Button
                onClick={addCurrent}
                outline="fill"
                color="black"
                type="icon"
                Icon={MdArrowRight}
              />
            </div>
          </div>
          <div className="workplace-modal__left">
            <div className="workplace-modal__icon">
              <Button
                onClick={subCurrent}
                outline="fill"
                color="black"
                type="icon"
                Icon={MdArrowLeft}
              />
            </div>
          </div>
          <div className="workplace-modal__item">
            {children}

            <div className="workplace-modal__comments">
              <div className="workplace-modal__comments-items">
                <AnimatePresence>
                  {commentsItems.map((comment) => {
                    const answers = [...comments].filter((com) => comment.id === com.answerFor);

                    return (
                      <Comment
                        deleteComment={deleteComment}
                        answers={answers}
                        isSelect={anwerId === comment.id}
                        setAnwerIdHandler={setAnwerIdHandler}
                        key={comment.id}
                        comment={comment}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="workplace-modal__comments-creator">
                <AnimatePresence>
                  {isShowCreate && (
                    <CommentCreator
                      answerId={anwerId}
                      createComment={createComment}
                      onClose={closeIsShowCreate}
                      name={user.name}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Backdrop>
    </Portal>
  );
};
