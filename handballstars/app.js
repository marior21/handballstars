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
import {JugadoresSchema} from './data/jugadoresSchema'
import {JugadorSchema} from './data/jugadorSchema'

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
    db.ref('/Jugadores').once('value', snapshot => {
      const losJugadores = snapshot.val()
      this.setState({
        isReady: true,
        jugadores: losJugadores        
      });
      Realm.open({schema: [JugadoresSchema, JugadorSchema]})
      .then(realm => {
        losJugadores.forEach(function(cadaJugador) {
          realm.write(() => {
            realm.create('Jugador', cadaJugador);
          });
        }, this);
        // ... use the realm instance to read and modify data

      })
      //.then(realm => {
       // realm.write(() => {
         // realm.create('Jugador', cadaJugador);
        //});
      });
    
    })
  }

  handleOnSearch(e) {
    this.setState({ filtro: e.nativeEvent.text })
  }

  handleOnFav(jugador,favorito) {
    let jugadores = this.state.jugadoresFavs
    if(favorito) {
      jugadores.push(jugador)
    } 
    else {
      jugadores.pop(jugador)
    }
    this.setState({jugadoresFavs : jugadores})
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
      jugador => jugador.NombreApellidos.toUpperCase().includes(
        this.state.filtro.toUpperCase()
      )
    )
    return (
      <Container>
        <Header rounded>
          <Text>{titulo}</Text>
        </Header>
        <Content>
          <Item>
            <Icon name="search" />
            <Input text={this.state.filtro} placeholder="Search" onChange={this.handleOnSearch} />
          </Item>
          {this.state.isReady ? <Jugadores onFav={this.handleOnFav} dataSource={jugadores}></Jugadores> : <Spinner />}
        </Content>
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
      </Container>
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



