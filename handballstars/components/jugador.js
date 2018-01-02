import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Item,
  Input,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Thumbnail
} from 'native-base';

import imagenFav from '../images/full_star.png'
import imagenNoFav from '../images/empty_star.png'

export default class Jugador extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorito: false
    }
    this.handleOnPressFavorito = this.handleOnPressFavorito.bind(this)
  }

  handleOnPressFavorito() {
    let favoritoOuter = !this.state.favorito
    this.setState((prevState) => (
      {
        favorito: !prevState.favorito
      }
    ))
    this.props.onFav(this.props.datos, favoritoOuter)
  }

  render() {
    const ruta = this.state.favorito ? imagenFav : imagenNoFav
    console.log(ruta)
    return (
      <Card style={{ flex: 1, flexDirection: 'row' }}>
        <CardItem cardBody style={{ width: 130 }}>
          <Image resizeMethod='scale' resizeMode='stretch' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/handballstars-920a4.appspot.com/o/Jugadores%2FAngelFernandez.jpg?alt=media&token=3cbe45ed-cc21-4689-88e9-81d1fd1bc836' }} style={{ height: 150, width: 150, flex: 1 }} />
        </CardItem>
        <CardItem style={{ width: 210 }}>
          <Body>
            <View style={styles.container}>
              <View style={[styles.cell, styles.texto]}>
                <Text>{this.props.datos.NombreApellidos}</Text>
              </View>
              <View style={[styles.cell, styles.estrella]}>
                <TouchableWithoutFeedback style={{ width: 20 }} onPress={this.handleOnPressFavorito}>
                  <Image resizeMethod='auto' resizeMode='stretch' source={ruta} style={{ height: 20, width: 20, marginRight: 10 }} />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View><Text>Valor 1</Text></View>
            <View><Text>Valor 2</Text></View>
            <View><Text>Valor 3</Text></View>
            <View><Text>Valor 4</Text></View>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200
  },
  cell:{
    height: 40
  },
  texto: {
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  estrella: {
    width: 20,
    backgroundColor: 'red'
  },
  cajaAuxiliar: {

    backgroundColor: 'blue'
  }
})