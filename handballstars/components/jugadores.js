import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Footer,
    FooterTab,
    Button,
    Icon, Item, Input, List, ListItem,
    Text
} from 'native-base';
import Jugador from '../components/jugador.js'

export default class Jugadores extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<List dataArray={this.props.dataSource}
            renderRow={
                (item) => {
                    return (
                        <ListItem>
                            <Jugador onFav={this.props.onFav} key={item.Identificador}
                                datos={item} />
                        </ListItem>
                    )
                }
            }></List>)
        /* return (
             <View>
             {this.props.dataSource.map(
                 item => {
                     <Jugador key={item.Identificador}
                     nombreApellidos={item.NombreApellidos} />
                 }
             )}
             </View>
         )*/
    }
}