import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import * as fetchStoriesActions from '../redux/actions/fetchStories';
import * as fetchItemsActions from '../redux/actions/fetchItems';
import Tabs from '../components/base/Tabs';
import Story from '../components/bussiness/Story';

const tapItems = [
  {value: 0, text:'New'},
  {value: 1, text:'Top'},
  {value: 2, text:'Best'},
];

class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'selectedIndex': '0',
    }
  }
  componentDidMount() {
    const {fetchStories} = this.props;
    //进入获取new stories的数据
    fetchStories(0);
  }
  indexChange(index){
    const {StoriesData, fetchStories} = this.props;
    //切换tab后，若本tab下的story尚未获取过数据，则开始获取
    if(StoriesData.list[index].start === 0){
      fetchStories(index);
    }
    this.setState({
      selectedIndex:index,
    });
  }
  _renderWaypoint() {
    const {StoriesData, fetchItems} = this.props;
    let storyType = this.state.selectedIndex;
    //开锁状态，并且有nextList，就开始获取数据
    if(StoriesData.canRequestItems && StoriesData.list[storyType].nextList && StoriesData.list[storyType].nextList.length >0){
      return (
        <Waypoint
          onEnter={ () => fetchItems(StoriesData.list[storyType].nextList, 1, storyType)}
          threshold={2}/>
      );
    }
  }
  render() {
    const{ StoriesData } = this.props;
    return (
      <div className="pg-stories">
        <Tabs tapItems={tapItems} selectedIndex={this.state.selectedIndex} indexChange={(index)=>this.indexChange(index)} isFixed='true'/>
        <ul className="story-list">{
          StoriesData.list[this.state.selectedIndex].items.map((item, index)=>{
            let data = item.data;
            data.storyType = this.state.selectedIndex;
            data.index = index;
            return <Story data={data} key = {data.id}/>
          })}
          {this._renderWaypoint()}
        </ul>
      </div>
    );
  }
}
Stories.propTypes  = {
  StoriesData: PropTypes.object.isRequired,
  fetchStories: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    StoriesData: state.StoriesData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, fetchStoriesActions, fetchItemsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories);