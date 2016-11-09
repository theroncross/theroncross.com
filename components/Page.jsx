import React from 'react';

class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page">
        <div dangerouslySetInnerHTML={{ __html: this.props.HTMLContent }}></div>
        {this.props.children}
      </div>
    )
  }
}

export default Page;

Page.propTypes = {
  children: React.PropTypes.any,
  HTMLContent: React.PropTypes.string,
};
