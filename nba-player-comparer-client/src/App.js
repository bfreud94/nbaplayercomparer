import React, { Component } from 'react';
import Datatable from './components/datatable/datatable';
import CompareTable from './components/comparetable/compareTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/header';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render()  {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <Header/>
            <Route exact path="/" render={props =>  (
              <React.Fragment>
                <div className="datatable">
                  <Datatable />
                </div>
              </React.Fragment>
            )} />
            <Route exact path="/comparePlayers" render={props =>  (
              <React.Fragment>
                <div className="datatable">
                  <CompareTable />
                </div>
              </React.Fragment>
            )} />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
