import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './App/store';
// import 'antd/dist/antd.css';


const root = document.getElementById('root');
ReactDOM.render(
    <Router>
        <Provider store={store}>
 
            <App />
        </Provider>
    </Router>,
    root
);




