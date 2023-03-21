import React, { FC, useCallback } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Button } from 'components';
import { getFirstLetter, transformDate } from 'utils';
import { IComment } from 'types';
import './Answer.scss';

export interface AnswerProps {
  answer: IComment;
  deleteComment: (id: string) => void;
}

export const Answer: FC<AnswerProps> = ({ answer, deleteComment }) => {
  const { text, createDate, user, id } = answer;

  const deleteCommentHandler = useCallback(() => {
    deleteComment(id);
  }, [id, deleteComment]);

  return (
    <div aria-hidden onClick={(e) => e.stopPropagation()} className="answer">
      <div className="answer__user">
        <div className="answer__letter">{getFirstLetter(user.name)}</div>
        <div>
          <div className="answer__user-name">{user.name}</div>
          <div className="answer__user-time">{transformDate(createDate)}</div>
        </div>
        <div className="answer__user-buttons">
          <Button
            onClick={deleteCommentHandler}
            color="none-dark"
            type="icon"
            Icon={MdOutlineDeleteOutline}
          />
        </div>
      </div>
      <div className="answer__data">
        <div className="answer__text">{text}</div>
      </div>
    </div>
  );
};
