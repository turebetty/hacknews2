/**
 * 页面头部tap切换 eg:我的订单 tab选择
 */
import React from 'react';
import HNTime from '../../utils/HNTime';

const Comment = (props) =>{
  let data = props.data;
  let dateDiff = HNTime.getDateDiff(data.time);
  return <div className="cp-comment-box">
    <div className="cp-comment">
      {props.type === 'reply'?<img className="icon l" src={require('../../../../public/img/message.png')}/>:
        <img className="icon l" src={require('../../../../public/img/comments.png')}/>
      }
      <div className="right">
        <h3 className="title" dangerouslySetInnerHTML={{__html: data.text}}></h3>
        <p className="time">{dateDiff}</p>
        <p className="by">by {data.by}</p>
        <a className="bottom-right-info clr" href={data.kids && data.kids.length!==0? `#/hacknews/replies/${data.id}/`:'javascript:void(0)'}>
          <img className="icon l" src={require('../../../../public/img/message.png')}></img>
          <p className="l">{data.kids && data.kids.length>0?data.kids.length : 0}</p>
        </a>
      </div>
    </div>
    <hr className="blackBorderTop"/>
  </div>
}
export default Comment;