import React from 'react'
import ReactDOM from 'react-dom'
import { Navigator } from '../utils/navigator.js';

const _ = require('lodash');
import velocityHelpers from 'velocity-react/velocity-helpers';

class Section extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    console.log(this.constructor.name, node)
    const elementBox = node.getBoundingClientRect();
    const elementHeight = node.clientHeight;

    this.setState({elementBox, elementHeight})
  }

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    const elementBox = node.getBoundingClientRect();
    const elementHeight = node.clientHeight;

    const url = Navigator.genURL(this.props.sectionName || this.props.parentName);

    if(elementBox.top <= 0  && elementBox.bottom > 0 && location.hash !== url) {
      Navigator.setURL(this.props.sectionName || this.props.parentName)
    }
  }

  render() {
    const { parentName, className, isSmallScreen, fixedColumn } = this.props
    const styles = _.cloneDeep(this.constructor.styles);

    styles.scrollable.backgroundColor = this.props.scrollableBgColor;
    styles.scrollable.minHeight = this.props.windowHeight;

    //traditional classnames
    const classes = this.props.className.split(' ');

    if(isSmallScreen) classes.push('sm');

    // console.log(this.props.parentName, this.props)
    return(
      <section
        className={classes.join(' ')}
        ref={this.props.ref}
        style={{
          ...styles.container,
          minHeight: this.props.windowHeight
        }}
      >
        {fixedColumn &&
          React.createElement(fixedColumn.component, Object.assign({},
            {
              ...fixedColumn.props,
              elementBox: this.state.elementBox,
              elementHeight: this.state.elementHeight
            }
          ))
        }
        {this.props.children}
      </section>
    )
  }
}

export default Section

const RPT = React.PropTypes

Section.propTypes = {
  children: RPT.any,
  className: RPT.string.isRequired,
  fixedColumn: RPT.object,
  isOpen: RPT.bool,
  parentName: RPT.string,
  ref: RPT.string,
  scrollableBgColor: RPT.string,
  sectionName: RPT.string,
  windowHeight: RPT.number,
  windowWidth: RPT.number,
}

Section.defaultProps = {
  scrollableBgColor: 'white',
  windowHeight: 800,
  windowWidth: 0,
  isOpen: true,
}

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
