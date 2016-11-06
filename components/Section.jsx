import React from 'react'
import ReactDOM from 'react-dom'
import { Navigator } from '../utils/navigator.js';

const _ = require('lodash');
import velocityHelpers from 'velocity-react/velocity-helpers';

class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  fixedColumn = this.props.fixed_column;

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    this.elementBox = node.getBoundingClientRect();
    this.elementHeight = node.clientHeight;
  }

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.elementBox = node.getBoundingClientRect();
    this.elementHeight = node.clientHeight;

    const url = Navigator.genURL(this.props.section_name || this.props.parentName);

    if(this.elementBox.top <= 0  && this.elementBox.bottom > 0 && location.hash !== url){
      Navigator.setURL(this.props.section_name || this.props.parentName)
    }
  }

  render() {
    const styles = _.cloneDeep(this.constructor.styles);
    const isSmallScreen = this.props.windowWidth < 800;

    if(this.props.scollableBgColor) {
      styles.scrollable.backgroundColor = this.props.scollableBgColor;
    }
    styles.scrollable.minHeight = this.props.windowHeight;

    //traditional classnames
    const sectionClass = [this.props.className];

    if(isSmallScreen) sectionClass.push('sm');
    if(this.props.isOpen) sectionClass.push('open');

    return(
      <section
        ref='sectionContainer'
        className={this.props.parentName}
        id={this.props.section_name}
        { ...this.props }
        style={{
          ...styles.container,
          minHeight:this.props.windowHeight
        }}
        className={ sectionClass.join('') }
      >
        {(this.props.fixed_column) ?
            React.cloneElement(this.props.fixed_column,
              {
                height: this.props.windowHeight,
                isOpen: this.props.isOpen,
                elementBox: this.elementBox,
                elementHeight: this.elementHeight,
                isSmallScreen: isSmallScreen
              }
            ) :
            null
        }
        <div
          style={fixedColumn ? styles.scrollable : {}}
          className={fixedColumn ? "scrollable-column" : null}
        >
          {this.props.children}
        </div>
      </section>
    )
  }
}

export default Section

Section.styles = {
  container: {
    position: 'relative',
    display: 'block'
  },
  scrollable: {
    position: 'relative',
    backgroundColor: 'white'
  },
}
