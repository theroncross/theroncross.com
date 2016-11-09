import React from 'react';
import ReactDOM from 'react-dom';
import access from 'safe-access';
var _ = require('lodash');

class SideBlock extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const { isSmallScreen, elementBox, elementHeight, windowHeight, windowWidth } = this.props
    console.log(elementBox)
    const styles = _.cloneDeep(this.constructor.styles);
    let percRead;

    if(isSmallScreen) {
      styles.fixed.position = 'absolute';
      styles.scrollable.width = styles.fixed_content_container.width = '100%';
      styles.scrollable.left = 0;
    } else {
      const isCurrent = elementBox.top <= 0 && (elementHeight + elementBox.top >= 0);
      const isAtEnd = elementBox.bottom < windowHeight;

      if(!isSmallScreen) {
        percRead = Math.min(100, Math.floor(-((elementBox.top)/elementHeight) * 100))
      }

      if(!isCurrent || isAtEnd){
        styles.fixed.position = 'absolute';
      }

      if(isAtEnd) {
        delete styles.fixed.top;
        styles.fixed.bottom = 0;
      }
    }

    return(
      <div
        style={(!isSmallScreen) ? styles.fixed : null}
        className='fixed-column'
      >
        <div
          className='fixed-column-container'
          style={styles.fixed_content_container}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default SideBlock

const RPT = React.PropTypes

SideBlock.propTypes = {
  children: RPT.any.isRequired,
  isSmallScreen: RPT.bool.isRequired,
  elementBox: RPT.object,
  windowHeight: RPT.number.isRequired,
  windowWidth: RPT.number.isRequired,
}

SideBlock.styles = {
  container:{
    position: 'relative',
    display: 'block',
  },
  fixed_content_container:{
    display:'flex',
    height: '100%',
    color: 'white',
  },
  fixed:{
    position: 'fixed',
    top:0, left: 0,
    textAlign: 'center',
  },
  scrollable:{
    position: 'relative',
    backgroundColor: 'white',
  },
}
