import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import * as HNUrlToos from '../utils/HNUrlToos';
import * as fetchCommentsActions from '../redux/actions/fetchComments';
import * as fetchItemsActions from '../redux/actions/fetchItems';
import Comment from '../components/bussiness/Comment';

class Replies extends React.Component {
  constructor(props) {
    super(props);
    //获取url的参数
    this.commentId = this.props.params.id;

  }
  componentWillMount(){
    //进入页面，初始化comments数据
    const{ initComments } = this.props;
    initComments();
  }

  componentDidMount() {
    const{ fetchItems } = this.props;
    //进入页面，根据id获取数据，fetchItems判断是localstorage拿，还是走fetch
    let items = [this.commentId];
    fetchItems(items, 0);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id !== nextProps.params.id){
      // 如果id更新，重置commments数据，并获取新的数据
      const{ initComments, fetchItems } = this.props;
      initComments();
      let items = [nextProps.params.id];
      fetchItems(items, 0);
    }
  }
  _renderWaypoint() {
    const {CommentsData, fetchItems} = this.props;
     //开锁状态，并且有nextList，就开始获取数据
    if(CommentsData.canRequestItems && CommentsData.nextList && CommentsData.nextList.length >0){
      return (
        <Waypoint
          onEnter={ () => fetchItems(CommentsData.nextList, 1)}
          threshold={2}/>
      );
    }
  }
  render() {
    const{ CommentsData } = this.props;
    if(CommentsData.parentData){
      CommentsData.parentData.storyType = 1;
    }
    return (
      <div className="pg-comments">
        {CommentsData.parentData? <div className="parent">
          <Comment data={CommentsData.parentData}/>
        </div>:null}
        <ul>
          {CommentsData.items.map((data)=>{
            return <Comment data={data.data} type="reply" key = {data.id}/>
          })}
        </ul>
        {this._renderWaypoint()}
      </div>
    );
  }
}
Replies.propTypes  = {
  CommentsData: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    CommentsData: state.CommentsData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, fetchCommentsActions, fetchItemsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies);