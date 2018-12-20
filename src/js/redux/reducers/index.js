import {
  combineReducers
} from 'redux';
import {
  routerReducer
} from 'react-router-redux';
import StoriesData from './Stories';
import CommentsData from './Comments';

const rootReducer = combineReducers({
  StoriesData,
  CommentsData,
  routing: routerReducer
});

export default rootReducer;