import React from 'react'
import _ from 'lodash'
import access from 'safe-access'
import { Menu } from '../components/Menu.jsx'
import { MainSlider, ProjectList, AboutMe, Contact, Medium, Footer } from '../components/sections'

import { Navigator } from '../utils/navigator.js'
import mobilecheck from '../utils/mobilecheck.js'
// Styles for highlighted code blocks.
import 'css/zenburn.css'

/*
#f9ffa2,
#aafd6d 600px,
#00e2c5 900px,
#00a7a8 1200px,
#312633 1500px,
#ff6b6b 1800px,
#ffffff 2100px
*/

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.sortedPages = _.sortBy(props.route.pages,
      (page) => access(page, 'data.date')
    ).reverse()

    this.pageGroups = _.groupBy(props.route.pages, 'file.dirname')
    this.pageGroups.root =
    _.mapValues(_.groupBy(this.pageGroups[''], 'file.name'), arr => arr[0])
    delete this.pageGroups['']
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      menuCloseSection: false,
    }


    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    Navigator.goToHash(1000, ['home'])
    window.isMobile = mobilecheck()
    this.setState({
      windowWidth: window && window.innerWidth,
      windowHeight: window && window.innerHeight,
    })
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleSectionOpen () {
    this.setState({
      menuCloseSection: true,
    })
  }

  handleResize () {
    const newDimensions = {
      windowWidth: window && window.innerWidth,
    }

    if (window.isMobile) {
      newDimensions.windowHeight = this.state.windowHeight || (window && window.innerHeight)
    } else {
      newDimensions.windowHeight = (window && window.innerHeight)
    }

    this.setState(newDimensions)
  }

  handleScroll (event) {
    this.setState({
      scrollTop: event.srcElement.body.scrollTop,
      scrollHeight: event.srcElement.body.scrollHeight,
      activeSection: event.srcElement.body.scrollHeight/event.srcElement.body.scrollTop,
    })
  }

  render () {
    let sitemap = [
      {
        section: 'home',
        component: <MainSlider
          { ...this.state }
          className="color-one"
          icon="home"
          { ...this.pageGroups.root.intro.data }
        />,
      },
      {
        section: 'projects',
        component: <ProjectList
          icon="energy"
          className="color-two projects"
          { ...this.state }
          projects={ this.pageGroups.projects }
          onProjectOpen={ this.handleSectionOpen.bind(this) }
        />,
      },
      {
        section: 'about-me',
        component: <AboutMe
          className="color-three about"
          { ...this.state }
          { ...this.pageGroups.root.about_me.data}
        />,
      },
      {
        section: 'medium',
        component: <Medium
          icon="book-open"
          className="color-four"
          { ...this.state }
        />,
      },
      {
        section: 'contact',
        component: <Contact
          className="color-five contact"
          { ...this.state }
          { ...this.pageGroups.root.contact.data}
          icon="envelope"
        />,
      },
    ]

    Navigator.load(sitemap)

    return (
      <div style={{ position: 'relative' }}>
        <Menu sections={sitemap} />
        { sitemap.map(item => {
          const el = React.cloneElement(item.component, {
            key: item.section,
            section_name: item.section,
            ref: item.section,
          })
          return el
        })}
        <Footer
          className="color-six footer"
          { ...this.state }
        />
      </div>
    )
  }
}
