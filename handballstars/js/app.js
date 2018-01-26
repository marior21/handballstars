import React, { Component } from 'react';
import { StyleSheet, Alert, View, Platform } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Item, Input, Text, Spinner } from 'native-base';
import Realm from 'realm';
import Jugadores from './components/jugadores.js';
import { db } from './config/firebase';
import GestorTabs from './gestorTabs.js';
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

const FavoritoSchema = {
  name: 'Favorito',
  properties: {
    idJugador: { type: 'int' }
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
      jugadoresFiltro: [],
      titulo: 'Players',
      filtro: ''
    };
    this.handleTabItem = this.handleTabItem.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.handleOnFav = this.handleOnFav.bind(this);
    // this.getFavorito = this.getFavorito.bind(this);
  }

  componentWillMount() {
    let actualizarJugadores = true
    let losJugadores
    db.ref('/FechaActual').once('value', snapshot => {
      const fechaActual = snapshot.val()
      let fechaBBDD;
      console.log(fechaActual)
      Realm.open({
        schema: [JugadorSchema, JugadoreWrapperSchema, FavoritoSchema]
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
            let jugadoresFavs = [];
            jugadoresFavs = realm.objects('Favorito');
            losJugadores.forEach(jugador => {
              jugador.Favorito = jugadoresFavs.filter(favs => favs.idJugador === jugador.Identificador).length > 0;
            });
            losJugadores = losJugadores.sort((j1, j2) => j1.Nombre.localeCompare(j2.Nombre));
            this.setState({
              isReady: true,
              jugadores: losJugadores,
              jugadoresFiltro: losJugadores,
              jugadoresFavs: losJugadores.filter(
                jug => jugadoresFavs.filter(favs => favs.idJugador === jug.Identificador).length > 0)

            });
            /* Realm.open({
               schema: [FavoritoSchema]
             }).then(realm => {
               
             });*/


          })
        }

      })

    })

  }

  handleTabItem(indice) {
    this.setState({ isReady: false })
    const elGestor = new GestorTabs(this.state, indice);
    this.setState({
      titulo: elGestor.getTextoTab(),
      jugadoresFiltro: elGestor.getJugadores(this.state.filtro),
      activeTab: indice,
      isReady: true
    })
  }

  handleOnSearch(e) {
    const filtro = e.nativeEvent.text;
    this.setState({ filtro: filtro, isReady: false })
    const elGestor = new GestorTabs(this.state, this.state.activeTab);
    this.setState({
      jugadoresFiltro: elGestor.getJugadores(filtro),
      isReady: true
    })
  }

  handleOnFav(jugador, favorito) {
    jugador.Favorito = favorito;
    let jugadores = this.state.jugadoresFavs;
    let favoritosBd = [];
    Realm.open({
      schema: [FavoritoSchema]
    }).then(realm => {
      realm.write(() => {
        let elFavorito = { idJugador: parseInt(jugador.Identificador) };
        favoritosBd = realm.objects('Favorito');
        if (favorito) {
          realm.create('Favorito', elFavorito);
        }
        else {
          elFavorito = favoritosBd.filtered('idJugador == ' + jugador.Identificador);
          if (elFavorito) {
            realm.delete(elFavorito);

          }
        }
      })
      let jugadoresFavs = this.state.jugadores.filter(
        jug => favoritosBd.filter(favs => favs.idJugador === jug.Identificador).length > 0);
      let jugadoresFiltro = new GestorTabs({ jugadores: this.state.jugadores, jugadoresFavs: jugadoresFavs }, this.state.activeTab).getJugadores(this.state.filtro);
      this.setState({
        jugadoresFavs: jugadoresFavs,
        jugadoresFiltro: jugadoresFiltro
      });
    });
  }

  // getFavorito(idJugador) {
  // return this.state.jugadoresFavs.filter(j => j.Identificador === idJugador).length > 0;
  //}

  render() {
    return (
      <Container>
        <Header rounded>
          <Text style={{ fontSize: 24, marginTop: 8, color: Platform.OS === 'ios' ? '#010' : '#fef' }}>{this.state.titulo}</Text>
        </Header>
        <Item>
          <Icon name="search" />
          <Input placeholder="Search" onChange={this.handleOnSearch} />
        </Item>
        <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
          {this.state.isReady ? <Jugadores onFav={this.handleOnFav} dataSource={this.state.jugadoresFiltro}></Jugadores> : <Spinner />}
        </View>
        <Footer>
          <FooterTab>
            <Button vertical active={this.state.activeTab == 0} onPress={() => this.handleTabItem(0)}>
              <Icon name="people" />
              <Text>Players</Text>
            </Button>
            <Button vertical active={this.state.activeTab == 1} onPress={() => this.handleTabItem(1)}>
              <Icon name="star" />
              <Text>Favorites</Text>
            </Button>
            <Button vertical active={this.state.activeTab == 2} onPress={() => this.handleTabItem(2)}>
              <Icon name="information-circle" />
              <Text>About</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container >
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



