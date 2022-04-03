import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { baseURL } from '../../utiles';
import './Home.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { DATOS_HILO, DATOS_PERFIL } from '../../redux/actions';
import moment from 'moment';
import 'moment/locale/es';

const Home = (props) => {
    const [hilos, setHilos] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        traerHilos();
        moment.locale('es');
    }, []);

    useEffect(() => {
    }, [hilos]);

    const traerHilos = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/hilos`);
            setHilos(respuesta.data.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const escogeHilo = async (hiloId) => {
        await props.dispatch({ type: DATOS_HILO, payload: hiloId });
        navigate("/hilo");
    };
    
    const escogeUsuario = async (usuarioId) => {
        await props.dispatch({ type: DATOS_PERFIL, payload: usuarioId });
        navigate("/perfil");
    };

    if (hilos[0]?._id !== undefined) {
        return (
            <div className='paginaHome'>
                <Header />
                <div className="contenidoHome">
                    <Margin />
                    <div className='cuerpoHome'>
                        {
                            hilos.map((hilo, index) => {
                                return (
                                    <div className="foroPostHome" key={index}>
                                        <div className="postCabezaHome">
                                            <div className="nombreUsuarioHome" onClick={() => escogeUsuario(hilo.usuario.usuarioId)}>
                                                <img className='imagenUsuarioHome' src={
                                                    hilo.usuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : hilo.usuario.foto
                                                } />
                                                <p>{hilo.usuario.nombre} {hilo.usuario.apellidos}</p>
                                            </div>
                                            <div className="fechaPost"><p>Fecha: {moment(hilo.fecha).fromNow()}</p></div>
                                        </div>
                                        <div className='contenidoPostHome' onClick={() => escogeHilo(hilo._id)}>
                                            <p className='tituloHiloHome'>{hilo.titulo}</p>
                                            <p className='cuerpoHiloHome'>{hilo.cuerpo}</p>
                                        </div>
                                        <div className="botonesPostHome">
                                            <button className='botonHome'>Me gusta</button>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div className='paginaHome'>
                <Header />
                <div id="malo" className="contenidoHome">
                    <Margin />
                    <div className='cuerpoHome'>
                        <div className="espinner"></div>
                    </div>
                </div>
            </div>
        )
    };
}

export default connect((state) => ({
    credenciales: state.credenciales
}))(Home);
