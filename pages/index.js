import React from 'react'
import _ from 'lodash'
import access from 'safe-access'
import Menu from '../components/Menu.jsx'
import { MainSlider, ProjectList, AboutMe, Contact, Medium, Footer } from '../components/sections'

import { Navigator } from '../utils/navigator.js'
import mobilecheck from '../utils/mobilecheck.js'
import 'css/zenburn.css'

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.sortedPages = _.sortBy(props.route.pages,
      (page) => access(page, 'data.date')
    ).reverse()

    this.pageGroups = _.groupBy(props.route.pages, 'file.dirname')
    this.pageGroups.root = _.mapValues(_.groupBy(this.pageGroups[''], 'file.name'), arr => arr[0])
    delete this.pageGroups['']

    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      menuCloseSection: false,
      isSmallScreen: false,
    }

    this.handleResize = this.handleResize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleSectionOpen = this.handleSectionOpen.bind(this)
  }

  componentDidMount () {
    Navigator.goToHash(1000, ['home'])
    window.isMobile = mobilecheck()
    this.setState({
      windowWidth: window && window.innerWidth,
      windowHeight: window && window.innerHeight,
      isSmallScreen: true,
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

  render() {
    const sitemap = [
      {
        section: 'home',
        component: MainSlider,
        props: {
          ...this.state,
          ...this.pageGroups.root.intro.data,
          className: 'color-one home',
          icon: 'home',
        },
      },
      {
        section: 'projects',
        component: ProjectList,
        props: {
          ...this.state,
          className: 'color-two projects',
          icon: 'energy',
          projects: this.pageGroups.projects,
          onProjectOpen: this.handleSectionOpen,
        },
      },
      {
        section: 'about-me',
        component: AboutMe,
        props: {
          ...this.state,
          className: 'color-three about',
          icon: '',
          data: this.pageGroups.root.about_me.data,
        },
      },
      {
        section: 'medium',
        component: Medium,
        props: {
          ...this.state,
          className: 'color-four medium',
          icon: 'book-open',
        },
      },
      {
        section: 'contact',
        component: Contact,
        props: {
          ...this.state,
          ...this.pageGroups.root.contact.data,
          className: 'color-five contact',
          icon: 'envelope',
        },
      },
    ]

    Navigator.load(sitemap)

    return (
      <div style={{ position: 'relative' }}>
        <Menu sections={sitemap} />
        {sitemap.map(item => {
          const el = React.createElement(item.component, Object.assign(
            {},
            item.props,
            {
              key: item.section,
              sectionName: item.section,
              ref: item.section,
            }
          ))
          return el
        })}
        <Footer
          className="color-six footer"
          {...this.state}
        />
      </div>
    )
  }
}

export default Index
