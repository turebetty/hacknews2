import HNFetch from '../../utils/HNFetch';
import * as types from '../../constants/ActionTypes';
import * as api from '../../constants/ApiServer';

function receiveStories(json, storyType) {
  return {
    type: types.RECEIVE_STORIES,
    data: json,
    storyType: storyType,
    receivedAt: Date.now()
  };
}
function fetchStoriesData(storyType) {
  return dispatch => {
    let url = '';
    switch(storyType){
    case 0:
      url = api.newStoriesUri;
      break;
    case 1:
      url = api.topStoriesUri;
      break;
    case 2:
      url = api.bestStoriesUri;
      break;
    default: break;
    }
    return HNFetch({
      type: 'GET',
      url: url,
    }).then(json =>{
      dispatch(receiveStories(json, storyType))
    });
  };
}
/**
 * 获取各种类型列表的story的ids
 *
 * @export
 * @param {0,1,2} storyType 0表示story,1表示comment,2表示reply
 * @returns
 */
export function fetchStories(storyType) {
  return (dispatch) => dispatch(fetchStoriesData(storyType));
}