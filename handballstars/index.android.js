import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './app.js';

export default class handballstars extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('handballstars', () => handballstars);
