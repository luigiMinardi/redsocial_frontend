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

    const gustaDelHilo = async (hiloId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${props.credenciales.token}` }
            };

            const respuesta = await axios.post(`${baseURL}/usuarios/${props.credenciales.usuario._id}/like/${hiloId}`, null, config);

            if (respuesta.status === 200) {
                traerHilos();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const dejarDeGustarDelHilo = async (hiloId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${props.credenciales.token}` }
            };

            const respuesta = await axios.delete(`${baseURL}/usuarios/${props.credenciales.usuario._id}/like/${hiloId}`, null, config);

            if (respuesta.status === 200) {
                traerHilos();
            }
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
                        {props.credenciales.token
                            && <div className='botonHome backgroundColorHome' onClick={() => {
                                navigate("/nuevo-post");
                            }}>
                                Crear Post
                            </div>
                        }
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
                                            <div>Likes: {hilo.likes.length}</div>
                                            {hilo.likes.find(like => like === props.credenciales.usuario._id)
                                                ? <button className='botonHome' onClick={() => {
                                                    dejarDeGustarDelHilo(hilo._id);
                                                }}>Dejar de Gustar</button>
                                                : props.credenciales.token && <button className='botonHome' onClick={() => {
                                                    gustaDelHilo(hilo._id);
                                                }}>Gustar</button>
                                            }
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
