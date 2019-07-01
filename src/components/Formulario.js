import React, { Component } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

class Formulario extends Component {
    
    state = {
        criptomonedas: [],
        moneda: '',
        criptomoneda: '',
        error: false
    }

    async componentWillMount(){
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    
        await axios.get(url)
        .then(respuesta=>{
            this.setState({
                criptomonedas : respuesta.data.Data
            })
        })
    }

    obtenerValor = (e) =>{ //DE ESTA FORMA PODEMOS OBTENER VALORES SIN LOS REFS
        const {name, value} = e.target; //LE PONEMOS UN NOMBRE A CADA SELECT
        this.setState({
            [name]:value // Y LE ASIGNAMOS SU VALOR
        }) //ASI CADA VEZ QUE SELECCIONEMOS UN VALOR EN EL SELECT ESTE SE ACTUALIZARA AUTOMATICAMENTE
    }


    //VALIDAMOS EL METODO CON EL SUBMIT
    cotizarMoneda = (e) =>{
        e.preventDefault();

        const {moneda, criptomoneda} = this.state
        //validamos que haya algo en el state
        
        if(moneda ==='' || criptomoneda === ''){
            this.setState({
                error: true
            }, () =>{
                setTimeout(()=>{
                    this.setState({
                        error: false
                    })
                }, 3000)
            })

            return;
        }

        //creamos el objeto

        const cotizacion = {
            moneda,
            criptomoneda
        }

        //enviamos a app.js

        this.props.cotizarCriptomoneda(cotizacion);
    }
    
    render() {
        const mensaje = (this.state.error) ? <Error mensaje="Ambos campos son obligatorios"/> : '';
        return (
            <form onSubmit={this.cotizarMoneda}>
            {mensaje}
                <div className="row">
                    <label>Elige tu Moneda</label>
                    <select
                        onChange={this.obtenerValor} //PONEMOS ON CHANGE EN AMBOS SELECTORES
                        name="moneda"
                        className="u-full-width">
                            <option value="">Elige tu moneda</option>
                            <option value="USD">Dolar Estadounidense</option>
                            <option value="ARS">Peso Argentino</option>
                            <option value="GBP">Libras</option>
                            <option value="EUR">Euros</option>
                    </select>
                </div>

                <div className="row">
                <div>
                    <label>Elige tu Criptomoneda</label>
                    <select 
                        onChange={this.obtenerValor} //ON CHANGE
                        name="criptomoneda"
                        className="u-full-width">
                        <option value="">Elige tu criptomoneda</option>
                        {Object.keys(this.state.criptomonedas).map(key=>(
                            <Criptomoneda
                                key={key}
                                criptomoneda={this.state.criptomonedas[key]}
                            />
                        ))}
                    </select>
                </div>
                </div>
                <input className="button-primary u-full-width" type="submit" value="Cotizar" />
            </form>
                
      );
    }
}

export default Formulario;