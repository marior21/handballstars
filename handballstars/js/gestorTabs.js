export default class GestorTabs {
    constructor(state, indice) {
        this.titulo = '';
        this.jugadores = [];
        switch (indice) {
            case 0:
                this.jugadores = state.jugadores;
                this.titulo = 'Players';
                break
            case 1:
                this.jugadores = state.jugadoresFavs;
                this.titulo = 'Favorites';
                break
            case 2:
                this.titulo = 'About';
                break;
        }
    }

    getJugadores(filtro) {
        if (filtro) {
            return this.jugadores.filter(
                jugador => jugador.Nombre.toUpperCase().includes(
                    filtro.toUpperCase()
                )
            );
        }
        return this.jugadores;
    }

    getTextoTab() {
        return this.titulo;
    }
}