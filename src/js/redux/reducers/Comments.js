import * as types from '../../constants/ActionTypes';
import cloneDeep from 'lodash/cloneDeep';
const initialState = {
  parentData: {}, //父层用的数据
  list: [], //子层列表的ids list
  items: [], //子层列表的具体信息 list
  start: 0,
  limit: 12,
  nextList: [], //下次请求的子层的ids list
  canRequestItems: true, //加锁
};
let commentsCache = {
  parentData: {},
  list: [],
  items: [],
  start: 0,
  limit: 12,
  nextList: [],
  canRequestItems: true,
};
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
export default function CommentsData(state = initialState, action) {
  switch (action.type) {
  case types.REQUEST_ITEMS:{
    return Object.assign({}, state, {
      canRequestItems: false
    });
  }
  case types.RECEIVE_ITEMS:{
    if(action.data.length>0){
      //itemsType为0,表示父层数据，获取parentData，并将ids list塞入
      if(action.itemsType === 0){
        commentsCache.list = action.data[0].data.kids || [];
        commentsCache = setNext(commentsCache);
        commentsCache.canRequestItems = true;
        commentsCache.parentData = action.data[0].data;
        return Object.assign({}, state, cloneDeep(commentsCache));
      }else{
      //itemsType为0,表示子层数据，放入items中
        commentsCache = setNext(commentsCache);
        commentsCache.items = commentsCache.items.concat(action.data);
        commentsCache.canRequestItems = true;
        return Object.assign({}, state, cloneDeep(commentsCache));
      }
    }
    return state;
  }
  case types.INIT_COMMENTS:{
    //初始化
    commentsCache = {
      parentData: {}, //父层用的数据
      list: [], //子层列表的ids list
      items: [], //子层列表的具体信息 list
      start: 0,
      limit: 12,
      nextList: [], //下次请求的子层的ids list
      canRequestItems: true, //加锁
    };
    return Object.assign({}, state, commentsCache);
  }
  default:
    return state;
  }
}