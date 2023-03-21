import React, { FC, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineDeleteOutline, MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md';
import { Button } from 'components';
import { getFirstLetter, transformDate } from 'utils';
import { IComment } from 'types';
import { Answer } from './answer/Answer';
import './Comment.scss';

export interface CommentProps {
  comment: IComment;
  answers: IComment[];
  setAnwerIdHandler: (id: string) => void;
  deleteComment: (id: string) => void;
  isSelect: boolean;
}

export const Comment: FC<CommentProps> = (props) => {
  const { comment, setAnwerIdHandler, isSelect, answers, deleteComment } = props;
  const { user, text, createDate, id } = comment;
  const [isShow, setIsShow] = useState(false);
  const isAnswers = !!answers.length;

  const toggleShow = useCallback(() => {
    setIsShow((p) => !p);
  }, []);

  const setAnwerId = useCallback(() => {
    setAnwerIdHandler(id);
  }, [id, setAnwerIdHandler]);

  const deleteCommentHandler = useCallback(() => {
    deleteComment(id);
  }, [deleteComment, id]);

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 320 }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.1 }}
      aria-hidden
      onClick={stopPropagation}
      className={`comment ${isSelect ? 'outline' : ''}`}
    >
      <div className="comment__user">
        <div className="comment__letter">{getFirstLetter(user.name)}</div>
        <div>
          <div className="comment__user-name">{user.name}</div>
          <div className="comment__user-time">{transformDate(createDate)}</div>
        </div>
        <div className="comment__user-buttons">
          <Button
            onClick={deleteCommentHandler}
            color="none-dark"
            type="icon"
            Icon={MdOutlineDeleteOutline}
          />
          <Button
            onClick={isAnswers ? toggleShow : undefined}
            color="none-dark"
            type="icon"
            Icon={isShow ? MdOutlineExpandLess : MdOutlineExpandMore}
            className="comment__user-answer-icon"
          />
        </div>
      </div>
      <div className="comment__data">
        <div className="comment__text">{text}</div>
        <div className="comment__count">{answers.length} ответов</div>
        <div aria-hidden onClick={setAnwerId} className="comment__answer">
          Ответить
        </div>
      </div>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ height: 0, opacity: 0, translateY: -10 }}
            animate={{ height: 'auto', opacity: 1, translateY: 0 }}
            exit={{ height: 0, opacity: 0, translateY: -10 }}
            transition={{ duration: 0.1 }}
            className="comment__answers"
          >
            {answers.map((answer) => (
              <Answer deleteComment={deleteComment} key={answer.id} answer={answer} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
