import { combineReducers } from 'redux';
import trips from './trips';
import categories from './categories';
import payments from './payments';

export default combineReducers({ trips, categories, payments });
