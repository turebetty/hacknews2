let storage = window.localStorage;
let HNLocalStorage = {
  /**
   * 设置localstorage
   *
   * @param {string} key
   * @param {any} value
   */
  set: function (key, value) {
    if (storage) {
      if (typeof value == 'object' && value !== null) {
        storage.setItem(key, JSON.stringify(value));
      } else {
        storage.setItem(key, value);
      }
    } else {
      console.log('暂不支持localstorage');
    }
  },
  /**
   * 获取localstorage
   *
   * @param {string} key
   * @returns
   */
  get: function (key) {
    if (storage) {
      let data = storage.getItem(key);
      if (typeof data == 'string' && data !== '') {
        return JSON.parse(data);
      } else {
        return data;
      }
    } else {
      console.log('暂不支持localstorage');
    }
  },
  /**
   * 清除所有的localstorage,或者其中某一项
   *
   * @param {string} key
   * @returns
   */
  clear: function (key) {
    if (storage) {
      if(key){
        storage.removeItem(key);
      }else{
        storage.clear();
      }
    } else {
      console.log('暂不支持localstorage');
    }
  }
}
export default HNLocalStorage;