import React from 'react';
import ReactDOM from 'react-dom'
import access from 'safe-access';
var _ = require('lodash');
import {Motion, spring, presets} from 'react-motion';
import {slugify} from '../utils/strings.js';
import {Navigator} from '../utils/navigator.js';
import {ReadingIndicator} from './ReadingIndicator';

class DataBox extends React.Component{
  render() {
    return(
      <div className='data-block'>
        <span className='data-block-title'>
          {this.props.title.toUpperCase()+ ': '}
        </span>
        <span className='data-block-content'>
          {(typeof this.props.content=== 'string')
            ? this.props.content
            : this.props.content.join(', ')}
        </span>
      </div>
    )
  }
}

class ProjectSidebar extends React.Component{
  render() {
    return <div>
      test
      </div>
  }
}

class Project extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mouseEvent:false
    }
  }
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    this.elementBox=node.getBoundingClientRect();
    this.elementHeight = node.clientHeight;
  }

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.elementBox=node.getBoundingClientRect();
    this.elementHeight = node.clientHeight;
  }

  handleClick(e) {
    const { url, title } = this.props.data;

    if(url) {
      ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: url,
        transport: 'beacon'
      });

      const win = window.open(url, '_blank');
      win.focus();
      return ;
    } else {
      ga('send', 'event', {
        eventCategory: 'Open Project',
        eventAction: 'click',
        eventLabel: title
      });

      this.props.onClick(e, {id:this.props.id, ...this.props.data})
    }
  }

  handleMouseEnter(e){
    if(this.props.currentProject) return;

    this.setState({
      mouseEvent:'hover',
      activeArea:e.nativeEvent.target.getBoundingClientRect()
    })
  }

  handleMouseLeave(e){
    this.setState({mouseEvent:'out', event:e, xFactor:0, yFactor:0})
  }

  render() {
    const {title, tagline, body, platform,
          technologies, roles,
          header_image_small, header_background_color, header_background_size,
          chapters} = this.props.data;

    const styles = _.cloneDeep(this.constructor.styles);

    if(!this.props.currentProject) {
      styles.projectBox.cursor = 'pointer'
    }
    styles.header.backgroundSize = header_background_size || styles.header.backgroundSize;

    let projectZTranslation = 0;

    if(this.state.mouseEvent =='hover') {
      projectZTranslation = 40;
    }

    let projectCardTransformation = value => {
      let t = '';
      t = 'translateZ(-'+value.x+'px) ';
      return t;
    }

    return(
      <div
        id={this.props.id}
        style={styles.projectPlaceholder}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onTouchStart={this.handleMouseEnter.bind(this)}
        onTouchEnd={this.handleMouseLeave.bind(this)}
      >
        <Motion
          defaultStyle={{x: 0}}
          style={{x: spring(projectZTranslation)}}
        >
          {value =>
            <div style={{transform: projectCardTransformation(value)}}
            >
              <div style={styles.dataContainer}>
                <div
                  style={{
                    backgroundImage:header_image_small,
                    backgroundColor:header_background_color,
                    ...styles.header
                  }}
                  onClick = {e => {
                    if(this.props.currentProject) return;
                    this.handleMouseLeave(e);
                    this.handleClick(e);
                  }}
                />
                <div style={styles.metaBox}
                  onClick = {e => {
                    if(this.props.currentProject) return;
                    this.handleMouseLeave(e);
                    this.handleClick(e);
                  }}
                >
                  <h3 style={styles.title}>{tagline}</h3>
                  {(platform)
                    ? <DataBox title='Platform' content={platform}/>
                    : null
                  }
                  {(technologies)
                    ? <DataBox title='Technologies' content={technologies}/>
                    : null
                  }
                  {(roles)
                    ? <DataBox title='Roles' content={roles}/>
                    : null}
                </div>
                <div style={styles.projectBody}>
                  {/*{(this.props.currentProject)
                    ? <ProjectSidebar />
                    : null}*/
                  }
                  {(this.props.currentProject)
                    ? <div dangerouslySetInnerHTML={{__html:body}}></div>
                    : null
                  }
                </div>
                {(this.props.currentProject)
                  ? <footer
                      style={styles.footer}
                      onClick={() => { this.props.onClose() }}
                    >
                      <i className='icon-arrow-left' /> Return to other projects
                    </footer>
                  : null
                }
              </div>
            </div>
          }
        </Motion>
      </div>
    )
  }
}

export default Project

Project.styles = {
  projectPlaceholder:{
    // width: '33%',
    perspective: 600,
    width: '100%',

  },
  projectBox:{
    color: 'grey',
    // paddingRight:25,
    overflow:'hidden'
  },
  metaBox: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  projectBody:{
    padding: 10,
    paddingLeft:20,
    paddingRight: 20,
  },
  footer:{
    cursor: 'pointer',
    padding: 30,
    marginTop: 30,
    backgroundColor:'#f0f0f0',
    clear:'both',
  //  borderTop: '1px dashed #ccc'
  textAlign: 'center',
    backgroundImage: 'linear-gradient(to right, #adadad 70%, rgba(255,255,255,0) 0%)',
    backgroundPosition: 'top left',
    backgroundSize: '15px 1px',
    backgroundRepeat: 'repeat-x'
  },
  dataContainer:{
    //boxShadow: '5px 0 6px #c8c8c8',
    backgroundColor: 'white',

    //padding: 10,
    paddingTop:0, paddingRight: 0
  },
  header:{
    minHeight: 400,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  headerImage:{

  },
  title:{
    color:'black',
    marginBottom:10
  }
}

/*

onMouseMove = { e => {
  const yFactor = ((e.nativeEvent.clientX - this.state.activeArea.left) - this.state.activeArea.width / 2) / this.state.activeArea.width / 2
  const xFactor = ((e.nativeEvent.clientY - this.state.activeArea.top) - this.state.activeArea.height / 2) / this.state.activeArea.height / 2
  this.setState({xFactor: xFactor,yFactor:yFactor});
}}

onMouseOver = { e => {
  if(this.props.currentProject) return;

  this.setState({
    mouseEvent: 'hover',
    activeArea: e.nativeEvent.target.getBoundingClientRect()
  })
}}

onMouseLeave = { e => {
  this.setState({
    mouseEvent:'out',
    event: e,
    xFactor: 0,
    yFactor: 0
  })
}}

*/
