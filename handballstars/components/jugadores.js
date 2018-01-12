import React, { Component, PureComponent } from 'react';
import {
    StyleSheet,
    View,
    FlatList,Image,VirtualizedList
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
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import Jugador from '../components/jugador.js'
import imagenesJugadores from '../imagenesJugadores'
import _ from 'lodash'; 
import { enableLogging } from '@firebase/database/dist/esm/src/core/util/util';

const NUM_DATA = 10;

export default class Jugadores extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data: null
          }
    }

    componentWillMount() {
        
        this.setState({data: this.getData(NUM_DATA, 0)})
      }

      getData = (num, skip) => {
        const start = skip
        const end = skip + num
        return this.props.dataSource.slice(start,end);
        //return _.range(start, end).map((x, i) => ({id: i, title: 'List Item ' + i}))
      }

      onEndReached = () => {
        //return;
        let data = this.state.data
        let newData = data.concat(this.getData(NUM_DATA, data.length + 1))
        this.setState({data: newData})
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
            <View>
                <Text>Hola</Text>
            <View>
                <Text>Prueba</Text>
                <FlatList data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.Identificador} 
                    onEndReached={this.onEndReached}>
                </FlatList>
            </View>
            </View>
        )
    }
}