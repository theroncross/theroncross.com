import React from 'react';
import Section from '../Section.jsx';
import Page from '../Page.jsx';
import SideBlock from '../SideBlock.jsx';
import Signature from '../Signature.jsx';
var _ = require('lodash');

class Contact extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const { windowHeight, windowWidth, className, section, isSmallScreen, title, subtitle, icon } = this.props
    const displayName = this.constructor.name

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
      >
        <Page HTMLContent={this.props.body}></Page>
      </Section>
    )
  }
}

export default Contact
// <div>
//   <div>
//     <i className={"icon-mustache"} style={{color:'#f1f1db'}}/>
//   </div>
//   <div className="section-title" >
//     {this.props.title}
//   </div>
//   <div
//     className='section-subtitle'
//     dangerouslySetInnerHTML={{__html:this.props.subtitle}}
//   ></div>
// </div>
