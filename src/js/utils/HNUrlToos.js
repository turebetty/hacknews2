/**
 * url操作工具库
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return (root.HNUrlTools = factory());
    });

  } else if (typeof exports === 'object') {
    module.exports = factory();

  } else {
    root.HNUrlTools = factory();
  }
}(this || global, function() {
  var HNUrlTools = {};

  /**
   *将参数对象拼接到url上
   * @param {string} uri  旧url
   * @param {object} data 参数的对象
   * @returns 新url
   */
  HNUrlTools.dtUriTrans = function(uri, data) {
    if (data == undefined) {
      return uri;
    } else {
      var uriParamArray = [];
      for (var key in data) {
        var a = key+'='+data[key]
        uriParamArray.push(a);
      }
      var uriParam = uriParamArray.join('&');
      var newUri = (uri+'?'+uriParam)||'';
      return newUri;
    }
  };


  /**
   * 获取url中的参数的值
   * @param {any} name
   * @returns 参数的值
   */
  HNUrlTools.getParamString = function(name) {
    let search = location.search; //获取url中'?'符后的字串
    let hash = location.hash; //获取url中'?'符后的字串
    let theRequest = new Object();
    if (search.indexOf('?') != -1) {
      let str = search.substr(1);
      let strs = str.split('&');
      for(let i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split('=')[0]]=unescape(strs[i].split('=')[1]);
      }
      if(typeof theRequest === 'undefined'){
        return theRequest;
      }
    }
    if((JSON.stringify(theRequest) === '{}' || theRequest === ''|| typeof theRequest === 'undefined') && hash){
      let str = hash.split('?')[1];
      let strs = str.split('&');
      for(let i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split('=')[0]]=unescape(strs[i].split('=')[1]);
      }
      return theRequest;
    }

  };

  /**
   * @param {string} url 原url
   * @param {string} param 参数名称
   * @param {any} value 参数值
   * @returns 新url
   */
  HNUrlTools.addParam = function(url, param, value) {
    var re = new RegExp('([&\\?])' + param + '=[^& ]*', 'g');
    url = url.replace(re, function(a, b) {
      return b == '?' ? '?' : ''
    })
    var idx = url.indexOf('?');
    var hashIndex = url.indexOf('#');
    if (hashIndex<0) {
      url = (idx > -1 ? idx + 1 != url.length ? url + '&' :url +  '' : url + '?') + param + '=' + value;
    }
    return url
  };
  return HNUrlTools;

}));
