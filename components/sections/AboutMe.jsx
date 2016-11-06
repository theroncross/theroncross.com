import React from 'react';
import { Page } from '../Page.jsx';
var _ = require('lodash');
import { Section } from '../Section.jsx'
import { SideBlock } from '../SideBlock.jsx';

class AboutMe extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const h = this.props.scrollTop % 360;
    return(
      <Section
        {...this.props}
        parentName = {this.props.displayName || this.props.name || undefined}
        fixed_column = {
          <SideBlock{...this.props}>
            <div style={{color:'#000'}}>
              <div>
                <i
                 className={"icon-"+this.props.icon}
                 style={{ color:'hsl('+h+', 63%, 90%)' }}
                />
              </div>
              <div className="section-title" >
                {this.props.title}
              </div>
              <div
                className='section-subtitle'
                dangerouslySetInnerHTML={{ __html:this.props.subtitle }}
              ></div>
            </div>
          </SideBlock>
        }
      >
        <Page HTMLContent={this.props.body}/>
      </Section>
    )
  }
}

export default AboutMe;

