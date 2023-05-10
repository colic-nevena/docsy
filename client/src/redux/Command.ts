import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import Dependency from '../dependency/Dependency';
import { RootState } from './store';

export type Command = ThunkAction<void, RootState, Dependency, AnyAction>;
