/**
 * fetch请求的封装方法，现主要用于get请求
 *
 * @param {object} payload fetch的请求内容，包括url，data的一个对象
 * @returns
 */
let HNTime = {
  getDateDiff: function(timeStamp){
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let month = day * 30;
    let now = new Date().getTime();
    let diffValue = now - timeStamp*1000;
    if (diffValue < 0) {
      //若日期不符则弹出窗口告之
      //alert('结束日期不能小于开始日期！');
    }
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    let result = '';
    if (monthC >= 1) {
      result = parseInt(monthC) + 'M ago';
    }
    else if (weekC >= 1) {
      result = parseInt(weekC) + 'w ago';
    }
    else if (dayC >= 1) {
      result = parseInt(dayC) + 'd ago';
    }
    else if (hourC >= 1) {
      result = parseInt(hourC) + 'h ago';
    }
    else{
      result = parseInt(minC) + 'm ago';
    }
    return result;
  }
}
export default HNTime;