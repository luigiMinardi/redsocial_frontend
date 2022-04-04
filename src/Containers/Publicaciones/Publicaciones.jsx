import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { baseURL } from '../../utiles';
import './Publicaciones.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import moment from 'moment';
import { DATOS_HILO, DATOS_PERFIL } from '../../redux/actions';


const Publicaciones = (props) => {
    const [publicaciones, setPublicaciones] = useState([]);
    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credenciales.token}` }
    };

    useEffect(() => {
        traerPublicaciones();
    }, []);

    useEffect(() => {
        traerPublicaciones();
    }, [publicaciones]);

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate("/");
        }
    })

    const traerPublicaciones = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/usuarios/${props.usuario._id}/publicaciones`, config);
            setTimeout(() => {
                if (JSON.stringify(respuesta.data.publicaciones.reverse()) !== JSON.stringify(publicaciones)) {
                    // console.log(JSON.stringify(respuesta.data.publicaciones.reverse()) === JSON.stringify(publicaciones));
                    setPublicaciones(respuesta.data.publicaciones.reverse());
                }
            }, 1000);
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

    if (publicaciones.length !== 0) {
        // console.log(publicaciones[0][0].usuario.usuarioId, props.usuario._id);
        if (publicaciones[0][0].usuario.usuarioId === props.usuario._id) {
            return (
                <div className='paginaPublicaciones'>
                    <Header />
                    <div className="contenidoPublicaciones">
                        <Margin />
                        <div className='cuerpoPublicaciones'>
                            {
                                publicaciones.map((publicaciones, index) => {
                                    return (
                                        <div className="foroPostPublicaciones" key={index}>
                                            <div className="postCabezaPublicaciones">
                                                <div className="nombreUsuarioPublicaciones" onClick={() => escogeUsuario(publicaciones[0].usuario.usuarioId)}>
                                                    <img className='imagenUsuarioPublicaciones' src={
                                                        publicaciones[0].usuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : publicaciones[0].usuario.foto
                                                    } />
                                                    <p>{publicaciones[0].usuario.nombre} {publicaciones[0].usuario.apellidos}</p>
                                                </div>
                                                <div className="fechaPost"><p>Fecha: {moment(publicaciones[0].fecha).fromNow()}</p></div>
                                            </div>
                                            <div className='contenidoPostPublicaciones' onClick={() => escogeHilo(publicaciones[0]._id)}>
                                                <p className='tituloHiloPublicaciones'>{publicaciones[0].titulo}</p>
                                                <p className='cuerpoHiloPublicaciones'>{publicaciones[0].cuerpo}</p>
                                            </div>
                                            <div className="botonesPostPublicaciones">
                                                <button className='botonPublicaciones'>Me gusta</button>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            traerPublicaciones();
            return (
                <div className='paginaHome'>
                    <Header />
                    <div id='malo' className="contenidoHome">
                        <Margin />
                        <div className='cuerpoHome'>
                            <div className="espinner"></div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className='paginaHome'>
                <Header />
                <div id='malo' className="contenidoHome">
                    <Margin />
                    <div className='cuerpoHome'>
                        <div className="espinner"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    credenciales: state.credenciales,
    usuario: state.datosPerfil
}))(Publicaciones);