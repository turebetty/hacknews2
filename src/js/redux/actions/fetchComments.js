import HNFetch from '../../utils/HNFetch';
import * as types from '../../constants/ActionTypes';
import * as api from '../../constants/ApiServer';

/**
 * 设置已知的comments
 *
 * @export
 * @param {any} comments
 * @returns
 */
export function fetchComments(comments) {
  return {
    type: types.RECEIVE_COMMENTS,
    data: comments,
    receivedAt: Date.now()
  };
}

/**
 * 将comment设置为初始化状态
 *
 */
export function initComments() {
  return {
    type: types.INIT_COMMENTS,
    receivedAt: Date.now()
  };
}