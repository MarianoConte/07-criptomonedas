import React, { Component } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

class App extends Component {

  state={
    cargando: false,
    resultado : {},
    monedaSeleccionada : '',
    criptoSeleccionada : ''
  }

  cotizarCriptomoneda = async (cotizacion) =>{
    
    const {moneda, criptomoneda} = cotizacion;

    const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    await axios.get(url)
    .then(respuesta =>{
      this.setState({
        resultado: respuesta.data.DISPLAY[criptomoneda][moneda],
        cargando: true
      },()=>{
        setTimeout(()=>{
          this.setState({
            cargando: false
          })
        }, 2000)
      })
    })
    
  }

  render() {
    const resultado = this.state.cargando ? <Spinner /> : <Resultado 
                                                            resultado = {this.state.resultado}
                                                            />
    return (
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={imagen} alt="imagen" className="logotipo"/>
          </div>
          <div className="one-half column">
            <h1>Cotiza Criptomonedas al Instante</h1>
            <Formulario 
              cotizarCriptomoneda={this.cotizarCriptomoneda}
            />
            {resultado}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
