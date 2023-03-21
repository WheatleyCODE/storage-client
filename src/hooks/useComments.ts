import { useCallback, useEffect, useState } from 'react';
import { CommentService } from 'services';
import { IComment, ICreateCommentFilds, IDeleteCommentFilds, IItemFilds } from 'types';
import { useRequest } from './useRequest';

export const useComments = (itemFilds: IItemFilds) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const { data, isLoading, error } = useRequest<IComment[], string>(
    '/api/commentator',
    'post',
    itemFilds
  );

  useEffect(() => {
    setComments(data);
  }, [data]);

  const createCommentAsync = useCallback(async (filds: ICreateCommentFilds) => {
    const { data: comment } = await CommentService.create(filds);
    setComments((p) => [...p, comment]);
  }, []);

  const deleteCommentAsync = useCallback(async (filds: IDeleteCommentFilds) => {
    const { data: commentsData } = await CommentService.delete(filds);
    setComments(commentsData);
  }, []);

  return { comments, isLoading, error, createCommentAsync, deleteCommentAsync };
};
