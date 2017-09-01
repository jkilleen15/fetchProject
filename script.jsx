'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const styles = require('./style.css');

// Define data points from 'pics' array (fetch response data) using map
// Return list of custom list items from 'Pic' component below

const PicList = props => {
  const results = props.data;
  let pics = results.map(pic =>
    <Pic
      url={pic.links[0].href}
      key={pic.data[0].nasa_id}
      title={pic.data[0].title} />
  );

  return (
    <ul className='pic-list'>
      {pics}
    </ul>
  );
};

// Generates custom list items

const Pic = props => (
  <li className='pic-wrap'>
    <h3>{props.title}</h3>
    <img src={props.url} alt={props.title} />
    <br /><br />
  </li>
);

// Primary component rendered to DOM

class Fetch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pics: []
    };
  }

  // Initiates fetch from NASA Image and Video Library

  componentDidMount () {
    fetch('https://images-api.nasa.gov/search?q=stars')
    .then(response => response.json())
    .then(data => {
      this.setState({pics: data.collection.items});
    })
    .catch((error) => {
      console.log('Oops! Error fetching and parsing your data', error);
    });
  }

  // Renders structure for incoming list items

  render () {
    console.log(this.state.pics);
    return (
      <div className='main-content'>
        <h1>NASA Imagery --> STAR STUFF!</h1><br />
        <PicList data={this.state.pics} />
      </div>
    );
  }
}

ReactDOM.render(<Fetch />, document.getElementById('fetch'));
