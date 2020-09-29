import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Datatable from './components/Datatable/Datatable';
import CompareTable from './components/Comparetable/CompareTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';

class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <div className='App'>
                        <Header />
                        <Route exact path='/'>
                            <Redirect to='/dataTable' />
                        </Route>
                        <Route exact path='/dataTable'>
                            <div className='datatable'>
                                    <Datatable />
                            </div>
                        </Route>
                        <Route exact path='/comparePlayers'>
                            <div className='datatable'>
                                <CompareTable />
                            </div>
                        </Route>
                    </div>
                </Provider>
            </Router>
        );
    }
}

export default App;
