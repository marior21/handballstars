import React, { Component, PureComponent } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import {
    Container, Header, Content, Footer, FooterTab,
    Button, Icon, Item, Input, List, ListItem, Text
} from 'native-base';
import Jugador from '../components/jugador.js';
import imagenesJugadores from '../imagenesJugadores';


export default class Jugadores extends Component {
    constructor(props) {
        super(props)
        // screen sizing
        const { width, height } = Dimensions.get('window');
        // orientation must fixed
        let SCREEN_WIDTH = width;// < height ? width : height;
        // const SCREEN_HEIGHT = width < height ? height : width;
        let isSmallDevice = SCREEN_WIDTH <= 440;
        let numColumns = isSmallDevice ? 1 : 2;
        this.state = {
            numColumns: numColumns
        }
    }

    componentWillMount() {
        Dimensions.addEventListener('change', () => {
            // screen sizing
            const { width, height } = Dimensions.get('window');
            // orientation must fixed
            SCREEN_WIDTH = width;// < height ? width : height;
            // const SCREEN_HEIGHT = width < height ? height : width;
            isSmallDevice = SCREEN_WIDTH <= 440;
            numColumns = isSmallDevice ? 1 : 2;
            this.setState({ numColumns: numColumns });
        });
    }

    renderItem = ({ item }) => (
        <Jugador onFav={this.props.onFav}
            datos={item} />
    );
    render() {
        return (
            <FlatList data={this.props.dataSource}
                renderItem={this.renderItem}
                keyExtractor={item => item.Identificador}
                numColumns={this.state.numColumns}
                key={this.state.numColumns === 1 ? 'v' : 'h'}>
            </FlatList>
        )
    }
}