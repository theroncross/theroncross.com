import React from 'react';

const Page = props => {
  return (
    <div className="page">
      <div dangerouslySetInnerHTML={{ __html: props.HTMLContent }}></div>
      {props.children}
    </div>
  );
};

export default Page;

Page.propTypes = {
  children: React.PropTypes.any,
  HTMLContent: React.PropTypes.string,
};
