import React, { Component } from 'react';
import Datatable from './components/datatable/datatable';
import CompareTable from './components/comparetable/compareTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header/header';
import { Provider } from 'react-redux';
import store from './store';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    render()  {
        return (
            <Router>
                <Provider store={store}>
                    <div className="App">
                        <Header/>
                        <Route exact path="/" render={props => (
                            <Redirect to='/dataTable'/>
                        )}>
                        </Route>
                        <Route exact path="/dataTable" render={props =>  (
                            <div className="datatable">
                                <Datatable />
                            </div>
                        )} />
                        <Route exact path="/comparePlayers" render={props =>  (
                            <div className="datatable">
                                <CompareTable />
                            </div>
                        )} />
                    </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
