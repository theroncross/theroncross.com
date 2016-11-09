import React from 'react';
var _ = require('lodash');
import Page from '../Page.jsx';
import Section from '../Section.jsx'
import SideBlock from '../SideBlock.jsx';

class AboutMe extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { windowHeight, windowWidth, className, section, isSmallScreen, title, subtitle, icon } = this.props
    const h = this.props.scrollTop % 360;
    const displayName = this.constructor.name;
    return(
      <Section
        id={displayName.toLowerCase()}
        className={`${displayName.toLowerCase()}-section`}
        parentName={displayName}
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
      >
        <Page HTMLContent={this.props.body} />
      </Section>
    )
  }
}

// <div style={{color:'#000'}}>
//   <div>
//     <i
//      className={"icon-"+this.props.icon}
//      style={{ color:'hsl('+h+', 63%, 90%)' }}
//     />
//   </div>
//   <div className="section-title" >
//     {this.props.title}
//   </div>
//   <div
//     className='section-subtitle'
//     dangerouslySetInnerHTML={{ __html:this.props.subtitle }}
//   ></div>
// </div>
export default AboutMe;

