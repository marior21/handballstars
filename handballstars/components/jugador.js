import React, { Component, PureComponent } from 'react';
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

export default class Jugador extends PureComponent {
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
      <View style={styles.card}>
        <View style={{ width: 110 }}>
          <Image resizeMethod='auto' resizeMode='cover' source={imagenesJugadores[this.props.datos.Identificador]} style={{ height: 130, width: 110, flex: 1 }} />
        </View>
        <View>
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
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'brown'}}>
            <View style={{ width: 100 }}>
              <Text>Position</Text>
              <Text>Age</Text>
              <Text>Place of Birth</Text>
              <Text>Height</Text>
              <Text>Weight</Text>
              <Text>Club</Text>
            </View>
            <View style={{minWidth:100}}>
              <Text>{this.props.datos.Posicion}</Text>
              <Text>{this.props.datos.Edad}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{width: 0,flexGrow: 1,flex: 1}}>{this.props.datos.LugarNacimiento}</Text>
              </View>
              <Text>{this.props.datos.Altura}</Text>
              <Text>{this.props.datos.Peso}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{width: 0,flexGrow: 1,flex: 1}}>{this.props.datos.Equipo}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2

  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    height: 40
  },
  cell: {
    height: 40
  },
  texto: {
    width: 100,
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