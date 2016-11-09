import React from 'react';
import ReactDOM from 'react-dom';
import { Navigator } from '../../utils/navigator.js';
import Project from '../Project.jsx';
import SVGStylish from '../svg/SVGStylish.jsx';
import Section from '../Section.jsx';
import SideBlock from '../SideBlock.jsx';
import Fixed from '../Fixed.jsx';
var _ = require('lodash');

import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import stylish from '../../pages/assets/stylish.svg';
import { slugify } from '../../utils/strings.js'


class ProjectList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isProjectSelected: false,
      currentProject: ''
    };

    this.scrollToSectionTop = this.scrollToSectionTop.bind(this)
    this.handleSelectProject = this.handleSelectProject.bind(this)
    this.handleGoToProject = this.handleGoToProject.bind(this)
    this.handleCloseProject = this.handleCloseProject.bind(this)
  }

  scrollToSectionTop() {
    var node = ReactDOM.findDOMNode(this);
    var elementBox = node.getBoundingClientRect();
  }

  handleSelectProject(e, currentProject) {
    ((window.isMobile) ?
      Navigator.scrollTo(currentProject.id) :
      Navigator.scrollTo(this.props.section_name)
    )
    .then(() => {
      this.setState({
        isProjectSelected: true,
        currentProject : currentProject
      })
    })

    this.props.onProjectOpen && this.props.onProjectOpen(e,currentProject);
  }

  handleGoToProject(pid) {
    Navigator.scrollTo(pid);
  }

  handleCloseProject() {
    ((window.isMobile)
      ? Navigator.scrollTo(this.state.currentProject.id)
      : Navigator.scrollTo(this.props.sectionName)
    )
    .then(() => {
      this.setState({
        isProjectSelected:false,
        currentProject:''
      })
    })
  }

  render() {
    const { windowHeight, windowWidth, className, section, isSmallScreen } = this.props
    const displayName = this.constructor.name
    const opensource = []
    const projects = this.props.projects.map((project, i) => {
      const projectId = Navigator.genId([this.props.section_name,project.data.title]);
      if(project.data.type.toLowerCase() == 'opensource') {
        if(opensource.length !== 0) opensource.push(
          <span
            className="middotDivider"
            key={opensource.length+1}>
          </span>
        );
        opensource.push(
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline'}}
            onClick={this.handleGoToProject.bind(this, projectId)}
            key={project.data.title+i}
          >
            {project.data.title}
          </span>
        )
      }

      if(!this.state.isProjectSelected) {
        return (
          <Project
            {...project}
            id={projectId}
            onClick={this.handleSelectProject.bind(this)}
            key={project.data.title}
          />
        )
      }

      if(this.state.isProjectSelected && this.state.currentProject && project.data.title == this.state.currentProject.title) {
          return (
            <Project
              {...project}
              id={projectId}
              onClose={this.handleCloseProject.bind(this)}
              currentProject = {project.data.title == this.state.currentProject.title}
              isProjectSelected = {this.state.isProjectSelected}
              onClick={this.handleSelectProject.bind(this)}
              key={project.data.title}
            />
          )
        }
      });

    return(
      <Section
        parentName = {displayName}
        className={`${displayName.toLowerCase()}-section`}
        fixedColumn={{
          component: SideBlock,
          props: {
            isSmallScreen,
            icon,
            subtitle,
            title,
            windowHeight,
            windowWidth,
          }
        }}
        onCloseItem={this.handleCloseProject}
      >
        <div
          style={{borderBottom:'5px solid #0C1926'}}
          className='striped-bg'
        >
          <VelocityTransitionGroup
            enter={{animation: "slideDown"}}
            leave={{animation: "slideUp"}}
          >
            {projects}
          </VelocityTransitionGroup>
        </div>
      </Section>
    )
  }
}

export default ProjectList
// <div>
//   <div><i className="icon-energy" style={{color:'#7fd093'}}/></div>
//   <div className="section-title" >Recent Projects</div>
//   <div className='section-subtitle'>Never Bored<br />Always Inspired</div>
// </div>
// {!this.state.isProjectSelected &&
//   <div className="section-menu-item">
//     <i className="icon-social-github"/>
//     <div className='inner'>
//       <div >Curious to see how I code?<br />Check my opensource projects</div>
//       <div className='item-anchors'>
//         {opensource}
//       </div>
//     </div>
//   </div>
// }
