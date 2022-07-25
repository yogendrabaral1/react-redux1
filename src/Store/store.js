import { createStore } from 'redux';
import { TestReducer } from './reducers/testReducer';

export const store = createStore(TestReducer);
