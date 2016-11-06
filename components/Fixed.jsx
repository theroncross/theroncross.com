import React from 'react';
import access from 'safe-access';
var _ = require('lodash');

class Fixed extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    var styles = _.cloneDeep(this.constructor.styles);

    return(<div style={styles.container}>{this.props.children}</div>)
  }
}

export default Fixed

Fixed.styles = {
  container:{
    position: 'fixed',
    width: '50%'
  }
}
