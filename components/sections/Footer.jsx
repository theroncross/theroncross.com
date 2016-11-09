import React from 'react';
import Section from '../Section.jsx';
import Page from '../Page.jsx';
import Signature from '../Signature.jsx';
var _ = require('lodash');

class Footer extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const styles = _.cloneDeep(this.constructor.styles);
    const displayName = this.constructor.name
    return(
      <Section
        parentName = {displayName}
        className={`${displayName.toLowerCase()}-section`}
      >
        <Signature
          height={200}
          style={{
            position: 'absolute',
            top: '50%',
            marginTop: -100,
            left: 0,
            right: 0,
            textAlign: 'center'
          }}
        />
      </Section>
    )
  }
}

export default Footer

Footer.styles = {}
