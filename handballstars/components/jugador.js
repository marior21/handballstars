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
import imgenesJugadores from '../imagenesJugadores.js'
import imagenFav from '../images/full_star.png'
import imagenNoFav from '../images/empty_star.png'
import imagenesJugadores from '../imagenesJugadores';

export default class Jugador extends Component {
  constructor(props) {
    super(props)
    const rutaFoto = '../images/jugadores/AngelFernandez.jpg'// + props.datos.UrlImagen
    this.state = {
      favorito: false,
      rutaFoto: rutaFoto ? rutaFoto : ''
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

  componentWillMount() {

  }

  render() {
    const ruta = this.state.favorito ? imagenFav : imagenNoFav
    console.log(ruta)
    return (
      <Card style={{ flex: 1, flexDirection: 'row' }}>
        <CardItem cardBody style={{ width: 130 }}>
          <Image resizeMethod='scale' resizeMode='cover' source={imagenesJugadores[this.props.datos.Identificador]} style={{ height: 150, width: 150, flex: 1 }} />
        </CardItem>
        <CardItem style={{ width: 215 }}>
          <Body>
            <View style={styles.container}>
              <View style={[styles.cell, styles.texto]}>
                <Text>{this.props.datos.Nombre}</Text>
              </View>
              <View style={[styles.cell, styles.estrella]}>
                <TouchableWithoutFeedback style={{ width: 20 }} onPress={this.handleOnPressFavorito}>
                  <Image resizeMethod='auto' resizeMode='stretch' source={ruta} style={{ height: 20, width: 20, marginRight: 10 }} />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{flex: 1, flexDirection:'row', backgroundColor:'brown',marginTop:0}}>
              <View style={{width:100}}>
                <View><Text>Position</Text></View>
                <View><Text>Age</Text></View>
                <View><Text>Place of Birth</Text></View>
                <View><Text>Height</Text></View>
                <View><Text>Weight</Text></View>
              </View>
              <View style={{width:50}}>
                <View><Text>left</Text></View>
                <View><Text>19</Text></View>
                <View><Text>Santander</Text></View>
                <View><Text>198 cm</Text></View>
                <View><Text>87 kg</Text></View>
              </View>
            </View>
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
    width: 200,
    height:40
  },
  cell:{
    height: 40
  },
  texto: {
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  estrella: {
    width: 20,
    backgroundColor: 'green'
  },
  cajaAuxiliar: {

    backgroundColor: 'blue'
  }
})