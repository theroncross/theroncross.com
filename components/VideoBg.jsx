import React from 'react'
var _ = require('lodash');

class VideoBg extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const styles = _.cloneDeep(this.constructor.styles);

    return(
      <div style={styles.container} >
        <video autoPlay id="bgvid" loop style={styles.video}>
          <source src="https://87506f8d4871f1155c4ce30447f3838aafb09c47.googledrive.com/host/0B9iIVYraohFxWDZScDBVMnhUT1E/Timesquare_1_1.webm" type="video/webm"/>
          <source src="https://87506f8d4871f1155c4ce30447f3838aafb09c47.googledrive.com/host/0B9iIVYraohFxWDZScDBVMnhUT1E/Timesquare_1.mp4" type="video/mp4" />
        </video>
        {this.props.children}
      </div>
    )
  }
}

export default VideoBg

VideoBg.styles = {
  video:{
  minWidth: '100%',
  minHeight: '100%',

  width: 'auto',
  height: 'auto',

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
  },
  container:{
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 10,

  },
}
