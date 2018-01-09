import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList
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
        /*  return (<View>
              <List dataArray={this.props.dataSource}
              style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}
              renderRow={
                  (item) => {
                      return (
                          <ListItem style={{width:150,height:250, alignItems:'center',justifyContent:'center'}}> 
                              <Jugador onFav={this.props.onFav} key={item.Identificador}
                                  datos={item} />
                          </ListItem>
                      )
                  }
              }></List></View>)*/
        return (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <FlatList data={this.props.dataSource}
                    renderItem={({ item }) => (
                        <View style={{ width: 350, height: 160 }}>
                            <Jugador onFav={this.props.onFav}
                                datos={item} />
                        </View>
                    )}
                    keyExtractor={item => item.Identificador} >
                </FlatList>
            </View>
        )
    }
}