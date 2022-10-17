import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState, TypedDispatch } from 'store';
import { rootActions } from 'store/root-actions';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(rootActions, dispatch);
};
