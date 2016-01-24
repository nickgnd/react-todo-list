import './style.scss'

import React from 'react';
import ReactDOM from 'react-dom';

// var Hello = React.createClass({
//   render: function() {
//     return <h1 className="red">
//       Hello!
//     </h1>
//   }
// });

class Hello extends React.Component {
  render() {
  return <h1 className="red">
          Hello!
        </h1>
  }
};

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
