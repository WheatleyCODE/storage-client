import React, { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MdShortText } from 'react-icons/md';
import { Button, Textarea } from 'components';
import { useValidInput } from 'hooks';
import { textAreaValidator } from 'helpers';
import { getFirstLetter } from 'utils';
import { getCommentCreatorAnimation } from './getCommentCreatorAnimation';
import './CommentCreator.scss';

export interface CommentCreatorProps {
  name: string;
  onClose: () => void;
  createComment: (text: string, id?: string) => void;
  answerId?: string;
}

export const CommentCreator: FC<CommentCreatorProps> = (props) => {
  const { name, onClose, createComment, answerId } = props;
  const textInput = useValidInput([textAreaValidator]);

  const onSuccess = useCallback(() => {
    createComment(textInput.value, answerId);
    onClose();
  }, [answerId, createComment, onClose, textInput.value]);

  const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  return (
    <motion.div
      {...getCommentCreatorAnimation()}
      aria-hidden
      onClick={stopPropagation}
      className="comment-creator"
    >
      <div className="comment-creator__user">
        <div className="comment-creator__letter">{getFirstLetter(name)}</div>
        <div className="comment-creator__name">{name}</div>
        {answerId && <div className="comment-creator__answer-id">Ответ: {answerId}</div>}
      </div>

      <div className="comment-creator__textarea">
        <Textarea
          Icon={MdShortText}
          value={textInput.value}
          placeholder="Текст трека"
          onChange={textInput.onChange}
          onBlur={textInput.onBlur}
          onFocus={textInput.onFocus}
          isError={textInput.isError}
          validError={textInput.validError}
          isActive={textInput.isActive}
          changeFocus={textInput.changeFocus}
          changeActive={textInput.changeActive}
        />
      </div>

      <div className="comment-creator__buttons">
        <Button onClick={onSuccess} outline="fill" color="blue" text="Добавить" />
        <Button onClick={onClose} color="none-dark" text="Отмена" />
      </div>
    </motion.div>
  );
};
