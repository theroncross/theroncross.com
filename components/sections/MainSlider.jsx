import React from 'react'
var _ = require('lodash');
import Section from '../Section';

class MainSlider extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const { windowHeight, windowWidth, className, section, isSmallScreen } = this.props
    const styles = _.cloneDeep(this.constructor.styles);
    const displayName = this.constructor.name

    if(isSmallScreen) {
      styles.headMetaBox.textAlign = 'center';
      styles.headMetaBox.width = 'auto';
      styles.headMetaBox.marginLeft = 'auto';
      styles.headMetaBox.borderLeft = 'none';
      styles.container.backgroundSize= 'cover';
      delete styles.headMeta.top;
      styles.headMeta.bottom = 0;
      styles.headMeta.transform = 'translate(-50%,0)';
    }

    return(
      <Section
        parentName={displayName}
        className={`${displayName.toLowerCase()}-section`}
        isSmallScreen={isSmallScreen}
      >
        <div style={{...styles.container, minHeight: windowHeight}}
        >
          <div style={styles.overContainer} />
            <div style={styles.headMeta}>
              <div
                style={styles.headMetaBox}
                className='main_heading'
              >
                <h1
                  style={{
                    fontSize: '2em',
                    lineHeight: '2.60rem',
                    color: 'white',
                    marginBottom: 0
                  }}
                  dangerouslySetInnerHTML={{ __html: this.props.headline }}
                >
                </h1>
              <div
                style={{
                  fontSize: '1.2em',
                  lineHeight: '1.2em',
                  color: 'white'}}
                dangerouslySetInnerHTML={{ __html: this.props.body }}
              />
            </div>
          </div>
        </div>
      </Section>
    )
  }
}

export default MainSlider

MainSlider.styles = {
  container:{
    position: 'relative',
    background:'url(../assets/me.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize:'cover'
  },
  overContainer:{
    position: 'absolute',
    width:'100%', height:'100%',
  },
  headMetaBox:{
    marginLeft:'50%',
    padding: 10,
    color: '#d0d0d0',
    borderLeft: '5px solid #fbbf69',
    background:'rgba(0, 0, 0, 0.51)'
  },
  headMeta:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '80%',
  }
}
