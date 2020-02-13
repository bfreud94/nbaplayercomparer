import React, { Component } from 'react';
import Datatable from './components/datatable/datatable'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { players: [] };
  }

  componentDidMount() {
    fetch('http://localhost:8000/nbaPlayerComparer/getAllPlayers')
    .then(res => res.json())
    .then(json => {
      this.setState({ 'players': json });
    });
  }

  render()  {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="./">Players
          </a>
        </nav>
        <Datatable players={ this.state.players } />
        <Datatable />
      </div>
    );
  }
}

export default App;
