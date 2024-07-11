import { Component } from 'react';
import './styles/Loader.css';

class Loader extends Component {
  render() {
    return <img className="loader" src="./svg/pokeball.svg"></img>;
  }
}

export default Loader;