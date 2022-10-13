import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, TypedDispatch } from 'store';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
