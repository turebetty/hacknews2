(function(root, factory) {
  root = root||{};
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return root.DtPop = factory();
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.DtPop = factory();
  }
}(this, function() {
  var DtPop = {
    /**
     * 打开一个弹框
     * @param {string} msg 需要弹框的内容
     */
    popupMsg: function(msg) {
      var body = document.body;
      var popmask = document.getElementById('pop-center-mask');
      if (!popmask) {
        popmask = document.createElement('div');
        popmask.setAttribute('id', 'pop-center-mask');
        popmask.setAttribute('style', 'visibility: visible;position: fixed;top: 0px;left: 0px; width: 100%; height: 100%; display: block; opacity: 0; background-color: rgb(0, 0, 0); z-index: 999; ');
        body.appendChild(popmask);
      }
      var pop = document.getElementById('pop-center-msg');
      if (!pop) {
        pop = document.createElement('div');
        pop.setAttribute('id', 'pop-center-msg');
        pop.setAttribute('style', ' transform: translate( -50% ,-50%); -o-transform:  translate( -50% ,-50%); -webkit-transform:  translate( -50% ,-50%); -moz-transform:  translate( -50% ,-50%);  visibility: visible;  position: fixed; padding: 20px 30px;  border-radius: 8px; color: rgb(255, 255, 255); text-align: center; font-size: 16px; z-index: 999; display: block; height: auto; left: 50%; top: 50%; background-color: rgb(0, 0, 0);');
        body.appendChild(pop);
      } else {
        pop.setAttribute('style', ' transform: translate( -50% ,-50%); -o-transform:  translate( -50% ,-50%); -webkit-transform:  translate( -50% ,-50%); -moz-transform:  translate( -50% ,-50%); visibility: visible;  position: fixed; padding: 20px 30px;  border-radius: 8px; color: rgb(255, 255, 255); text-align: center; font-size: 16px; z-index: 999; display: block; height: auto; left: 50%; top: 50%; background-color: rgb(0, 0, 0);');
        popmask.setAttribute('style', 'visibility: visible;position: fixed;top: 0px;left: 0px; width: 100%; height: 100%; display: block; opacity: 0; background-color: rgb(0, 0, 0); z-index: 999; ');
      }
      pop.innerHTML = msg;
    },
    /**
     * 关闭一个弹框
     */
    popupClose: function() {
      var popmask = document.getElementById('pop-center-mask');
      var pop = document.getElementById('pop-center-msg');
      popmask.setAttribute('style', 'display:none');
      pop.setAttribute('style', 'display:none');
    },
    /**
     * 打开一个弹框，并在1.5s后关闭
     * @param {string} msg 需要弹框的内容
     */
    popMsgThenClose: function(msg) {
      if (msg) {
        var _this = this;
        _this.popupMsg(msg);
        setTimeout(function() {
          _this.popupClose();
        }, 1500);
      }
    }
  };
  return DtPop;
}));