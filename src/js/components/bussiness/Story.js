/**
 * 页面头部tap切换 eg:我的订单 tab选择
 */
import React from 'react';
import HNTime from '../../utils/HNTime';

const Story = (props) =>{
  let data = props.data;
  let dateDiff = HNTime.getDateDiff(data.time);
  return <div className="cp-story-box">
    <div  className="cp-story">
      {data.storyType == 0 ?<img className="icon l" src={require('../../../../public/img/new.png')}></img>:null}
      {data.storyType == 1?<img className="icon l" src={require('../../../../public/img/top.png')}></img>:null}
      {data.storyType == 2?<img className="icon l" src={require('../../../../public/img/best.png')}></img>:null}
      <div className="right">
        <a href={data.url}>
          <h3 className="title">{data.title}</h3>
        <p className="time">{dateDiff}</p>
        </a>
        <p className="by">by {data.by}</p>
        <div className="bottom-right-info clr">
          <img className="icon l" src={require('../../../../public/img/like.png')}></img>
          <p className="l">{data.score}</p>
          <a href={data.kids && data.kids.length!==0? `#/hacknews/comments/${data.id}/`:'javascript:void(0)'}>
            <img className="icon l" src={require('../../../../public/img/comments.png')}></img>
            <p className="l">{data.kids? data.kids.length:0}</p>
          </a>
        </div>
      </div>
    </div>
    <hr className="blackBorderTop"/>
  </div>
}
export default Story;