import { combineReducers } from 'redux';
import trips from './trips';
import categories from './categories';

export default combineReducers({ trips, categories });
