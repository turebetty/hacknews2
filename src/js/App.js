import React, {
  Component
} from 'react';

class App extends Component {
  componentDidMount(){
    var FastClick = require('fastclick');
    FastClick.attach(document.body);
  }
  render() {
    const {
      children
    } = this.props;
    return ( <section >  {
        children
      } </section>
    );
  }
}

export default App;