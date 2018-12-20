/**
 * 页面头部tap切换
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Taps extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log('test');
    const { tapItems } = this.props;
    if (tapItems.length > 0) {
      let $tabItems = document.querySelectorAll('.cp-tabs li');
      for(let $tab of $tabItems){
        $tab.style.width = (1 / tapItems.length) * 100 + '%';
      }
    }
  }
  render() {
    const { needUnderline, selectedIndex } = this.props;
    let itemEle = this.props.tapItems.map((item, i) => {
      return (
        <li className='cp-tab' key={i} onClick={()=>this._tapSelect(i, item.value)}>
          <span className={selectedIndex==i?(needUnderline !== false ?'underline on':'on'):''}>{item.text}</span>
        </li>
      )
    })
    return (
      <div id='cp-tabs' className={this.props.isFixed?'fixed':''}>
        <div className='cp-tabs'>
          <ul className='clr'>
            {itemEle}
          </ul>
        </div>
        <hr className='blackBorderTop'/>
      </div>
    )
  }
  _tapSelect(index, key){
    this.props.indexChange(index, key);
  }
}
Taps.propTypes = {
  tapItems:PropTypes.array.isRequired,
  indexChange:PropTypes.func.isRequired,
}
