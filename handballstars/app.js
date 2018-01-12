import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  View
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon, Item, Input,
  Text,
  Spinner
} from 'native-base';
import Realm from 'realm'
import Jugadores from './components/jugadores.js'
import { db } from './config/firebase'
//import { JugadoresSchema } from './data/jugadoresSchema.js'
//import { JugadorSchema } from './data/jugadorSchema.js'

const JugadorSchema = {
  name: 'Jugador',
  properties: {
    Altura: 'string',
    Biografia: 'string',
    Edad: 'int',
    EquipoActual: 'string',
    FechaNacimiento: 'string',
    Identificador: 'int',
    LugarNacimiento: 'string',
    Nacionalidad: 'string',
    NacionalidadCodigo: 'string',
    NombreApellidos: 'string',
    Numero: 'int',
    Peso: 'string',
    Puesto: 'string',
    UrlImagen: 'string',
    UrlImagenBandera: 'string',
    UrlMasInformacion: 'string',
    UrlMasVideos: 'string',
  }
};

const JugadoreWrapperSchema = {
  name: 'JugadoreWrapper',
  properties: {
    //jugadores: 'Jugador[]',
    fechaActual: 'string'
  }
};

export default class handballstars extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      activeTab: 0,
      jugadores: [],
      jugadoresFavs: [],
      filtro: ''
    }
    this.handleTabItem = this.handleTabItem.bind(this)
    this.handleOnSearch = this.handleOnSearch.bind(this)
    this.handleOnFav = this.handleOnFav.bind(this)
  }

  handleTabItem(indice) {
    this.setState({ activeTab: indice })
  }

  componentWillMount() {
    let actualizarJugadores = true
    let losJugadores
    db.ref('/FechaActual').once('value', snapshot => {
      const fechaActual = snapshot.val()
      let fechaBBDD;
      console.log(fechaActual)
      Realm.open({
        schema: [JugadorSchema, JugadoreWrapperSchema]
      }).then(realm => {
        console.log(realm.path)
        losJugadores = realm.objects('Jugador')
        if (losJugadores.length === 0) {
          actualizarJugadores = true
          console.log('sin jugadores')
        }
        else {
          fechaBBDD = realm.objects('JugadoreWrapper').fechaActual
          console.log(fechaBBDD)
          if (fechaBBDD !== fechaActual) {
            actualizarJugadores = true
            console.log('actualizar jugadores')
          }
        }
        if (actualizarJugadores) {
          db.ref('/Jugadores').once('value', snapshot => {
            losJugadores = snapshot.val()
            /*Realm.open({
              schema: [JugadorSchema, JugadoreWrapperSchema]
            }).then(realm => {
              if (realm.objects('Jugador') &&
                realm.objects('Jugador').length > 0) {
                realm.objects('Jugador').forEach(function (cadaJugador) {
                  realm.write(() => {
                    realm.delete(cadaJugador)
                  })
                }, this)
              }
              losJugadores.forEach(function (cadaJugador) {
                realm.write(() => {
                  realm.create('Jugador', cadaJugador)
                })
              }, this)
              if (realm.objects('JugadoreWrapper').fechaActual) {
                realm.objects('JugadoreWrapper').fechaActual = fechaActual
              }
              else {
                const objeto = {
                  fechaActual: fechaActual
                }
                realm.write(() => {
                  realm.create('JugadoreWrapper', objeto)
                })
              }

            })*/
            this.setState({
              isReady: true,
              jugadores: losJugadores
            })
          })
         }
        
      })

    })

  }

  handleOnSearch(e) {
    this.setState({ filtro: e.nativeEvent.text })
  }

  handleOnFav(jugador, favorito) {
    let jugadores = this.state.jugadoresFavs
    if (favorito) {
      jugadores.push(jugador)
    }
    else {
      jugadores.pop(jugador)
    }
    this.setState({ jugadoresFavs: jugadores })
  }

  render() {
    let titulo
    let jugadores = []
    switch (this.state.activeTab) {
      case 0:
        titulo = 'Players'
        jugadores = this.state.jugadores
        break
      case 1:
        titulo = 'Favorites'
        jugadores = this.state.jugadoresFavs
        break
      case 2:
        titulo = 'About'
        jugadores = []
        break;
    }
    jugadores = jugadores.filter(
      jugador => jugador.Nombre.toUpperCase().includes(
        this.state.filtro.toUpperCase()
      )
    )
    return (
      <View>
        {this.state.isReady ? <Jugadores onFav={this.handleOnFav} dataSource={jugadores}></Jugadores> : <Text>Cargando...</Text>}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});



