import HNFetch from '../../utils/HNFetch';
import * as types from '../../constants/ActionTypes';
import * as api from '../../constants/ApiServer';
import HNLocalStorage from '../../utils/HNLocalStorage';

function requestItems(data, storyType) {
  return {
    type: types.REQUEST_ITEMS,
    receivedAt: Date.now()
  };
}
function receiveItems(data, itemsType, storyType) {
  return {
    type: types.RECEIVE_ITEMS,
    data: data,
    storyType: storyType,
    itemsType: itemsType,
    receivedAt: Date.now()
  };
}
function fetchItemsData(ids, itemsType, storyType) {
  let items = [];
  return dispatch => {
    //批量获取item以后，action完成
    let flag = 0;
    for (let id of ids) {
      //若item已经存在于localstorage则直接赋值
      if(HNLocalStorage.get(id)){
        items.push({id: id, data: HNLocalStorage.get(id)});
        flag++;
        if(flag === ids.length){
          return dispatch(receiveItems(items, itemsType, storyType || ''));
        }
      }else{
        //若item不存在于localstorage则fetch获取
        items.push({id: id});
        let index = items.length -1;
        HNFetch({
          type: 'GET',
          url: api.itemUri(id),
        }).then(json =>{
          items[index].data = json;
          //获取到item后，存储到localstorage
          HNLocalStorage.set(id, json);
          flag++;
          if(flag === ids.length){
            return dispatch(receiveItems(items, itemsType, storyType || ''));
          }
        });
      }
    }
  };
}
/**
 * 根据id的列表，获取到item的列表
 *
 * @export
 * @param {array} ids id的列表
 * @param {0,1} itemsType 0表示parents,1表示child
 * @param {0,1,2} storyType 0表示story,1表示comment,2表示reply
 * @returns
 */
export function fetchItems(ids, itemsType, storyType) {
  return (dispatch)=>{
    dispatch(fetchItemsData(ids, itemsType, storyType));
  }
}