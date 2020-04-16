import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
   constructor(props){
     super(props);
     this.state = {};
     this.handleclick = this.handleclick.bind(this);
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}
  handleclick()
  {
    this.props.onClick();
  }
  
  render() {
    return (
      <div>
        <button className={this.props.className} onClick={this.handleclick}>{this.props.name}</button>
      </div>
    );
  }
}

export default Button;