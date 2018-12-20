import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import * as HNUrlToos from '../utils/HNUrlToos';
import * as fetchCommentsActions from '../redux/actions/fetchComments';
import * as fetchItemsActions from '../redux/actions/fetchItems';
import Comment from '../components/bussiness/Comment';
import Story from '../components/bussiness/Story';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    //获取url的参数
    this.storyId = this.props.params.id;
  }
  componentDidMount() {
    const{ fetchItems } = this.props;
    //进入页面，根据id获取数据，fetchItems判断是localstorage拿，还是走fetch
    let items = [this.storyId];
    fetchItems(items, 0);
  }
  componentWillMount(){
    const{ initComments } = this.props;
    initComments();
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
          <Story data={CommentsData.parentData}/>
        </div>:null}
        <ul>
          {CommentsData.items.map((data)=>{
            return <Comment data={data.data} key = {data.id}/>
          })}
        </ul>
        {this._renderWaypoint()}
      </div>
    );
  }
}
Comments.propTypes  = {
  CommentsData: PropTypes.object.isRequired,
  StoriesData: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    CommentsData: state.CommentsData,
    StoriesData: state.StoriesData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, fetchCommentsActions, fetchItemsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);