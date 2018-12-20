import * as types from '../../constants/ActionTypes';
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
  list: [
  //index: 0为new,1为top,2为best
  //list为ids的列表，items为story的具体信息列表，nextList为下次需要请求的ids的list
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  ],
  //加锁用
  canRequestItems: true,
};
let storyCache = [
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
  {list: [], items: [], start: 0, limit: 12, nextList: []},
];

/**
 *重新设置新的start，nextList,用于翻页
 *
 * @param {object} obj
 * @returns
 */
function setNext(obj){
  obj.nextList = obj.list.slice(obj.start, obj.start+obj.limit);
  obj.start = obj.start+obj.limit;
  return obj;
}
export default function StoriesData(state = initialState, action) {
  switch (action.type) {
  case types.RECEIVE_STORIES:{
    //获取到stroy的list，进行赋值
    storyCache[action.storyType].list = action.data;
    //重新设置start,nextList
    storyCache[action.storyType] = setNext(storyCache[action.storyType]);
    return Object.assign({}, state, {
      list: cloneDeep(storyCache)
    });
  }
  case types.REQUEST_ITEMS:{
    //请求开始加锁，避免后期下拉引起的重复请求
    return Object.assign({}, state, {
      canRequestItems: false
    });
  }
  case types.RECEIVE_ITEMS:{
    if(action.storyType){
      storyCache[action.storyType] = setNext(storyCache[action.storyType]);
      //将获取到的items放入story列表中
      storyCache[action.storyType].items = storyCache[action.storyType].items.concat(action.data);
      return Object.assign({}, state, {
        list: cloneDeep(storyCache),
        canRequestItems: true //解开锁
      });
    }else{
      return state;
    }
  }
  default:
    return state;
  }
}