import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,Image
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
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import Jugador from '../components/jugador.js'
import imagenesJugadores from '../imagenesJugadores'
export default class Jugadores extends Component {
    constructor(props) {
        super(props)
    }
    _renderItem = ({ item }) => (
        <View>
        <Text>{item.Nombre}</Text>
        <Image resizeMethod='auto' resizeMode='cover' source={imagenesJugadores[item.Identificador]} style={{ height: 160, width: 160, flex: 1 }} />
      </View>
    );
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
              }></List></View>)
              
               <Jugador onFav={this.props.onFav}
                                datos={item} />
                                 <ListItem
            roundAvatar
            title={item.Nombre}
            subtitle={item.Nombre}
            avatar={{ uri: imagenesJugadores[item.Identificador]} }
        />
                                */
        return (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <FlatList data={this.props.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.Identificador}
                    initialNumToRender={5} >
                </FlatList>
            </View>
        )
    }
}