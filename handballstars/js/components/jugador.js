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
import imagenFav from '../../images/full_star.png'
import imagenNoFav from '../../images/empty_star.png'
import imagenesJugadores from '../imagenesJugadores';
import imagenesBanderas from '../imagenesBanderas';
import imagenesEquipos from '../imagenesEquipos';
//const imagenEquipo = require('../../images/equipos/HCMeshkovBrest.png')

export default class Jugador extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      favorito: props.datos.Favorito
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
    //replace(/ /g,'')
  }

  render() {
    const ruta = this.state.favorito ? imagenFav : imagenNoFav
    console.log(ruta)
    return (

      <View style={styles.card}>
        <View style={styles.containerTop}>
          <View style={[styles.cell, styles.texto]}>
            <Image resizeMethod='auto' resizeMode='cover' source={imagenesBanderas[this.props.datos.Pais]} style={{ marginRight: 10, marginTop: 11, width: 23, height: 18 }} />
            <Text style={{ fontSize: 18, marginRight: 10, marginTop: 9 }}>{this.props.datos.Nombre}</Text>
          </View>
          <View style={[styles.cell, styles.estrella]}>
            <TouchableWithoutFeedback onPress={this.handleOnPressFavorito}>
              <Image resizeMethod='auto' resizeMode='stretch' source={ruta} style={{ height: 25, width: 25, marginRight: 10 }} />
            </TouchableWithoutFeedback>
          </View>

        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: 120 }}>
            <Image resizeMethod='auto' resizeMode='cover' source={imagenesJugadores[this.props.datos.Identificador]} style={{ height: 150, width: 120, flex: 1 }} />
          </View>
          <View style={{ flex: 1 }}>

            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#eee', paddingLeft: 15, paddingTop: 15 }}>
              <View style={{ width: 100 }}>
                <Text>Position</Text>
                <Text>Age</Text>
                <Text>Place of Birth</Text>
                <Text>Height</Text>
                <Text>Weight</Text>

              </View>
              <View>
                <Text>{this.props.datos.Posicion}</Text>
                <Text>{this.props.datos.Edad}</Text>

                <Text>{this.props.datos.LugarNacimiento}</Text>

                <Text>{this.props.datos.Altura}</Text>
                <Text>{this.props.datos.Peso}</Text>

              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerBotom}>
          <Image resizeMethod='scale' resizeMode='contain' source={imagenesEquipos[this.props.datos.Equipo.replace(/é/g, 'e').replace(/ /g, '').replace(/ö/g, 'o')]} style={{ height: 30, width: 30, marginRight: 10, marginTop: 3 }} />
          <Text style={{ marginTop: 9, fontSize: 16 }}>{this.props.datos.Equipo}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 0.8,
    borderRadius: 8,
    borderColor: '#ccc',
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2

  },
  containerTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40
  },
  containerBotom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40
  },
  cell: {
    height: 40
  },
  texto: {
    //alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    flexDirection: 'row',
    paddingLeft: 4,
    marginLeft: 10,
    flex: 1
  },
  estrella: {
    width: 25,
    //backgroundColor: 'green',
    paddingTop: 5,
    marginRight: 10
    //height: 40
  },
  cajaAuxiliar: {

    backgroundColor: 'blue'
  }
})