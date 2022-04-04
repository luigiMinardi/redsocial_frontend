import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';

import './Perfil.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { DATOS_PERFIL, MODIFICAR_CREDENCIALES } from '../../redux/actions';

const Perfil = (props) => {
    let navigate = useNavigate();

    // Hooks.
    const [datosUsuario, setDatosUsuario] = useState(null);

    useEffect(() => {
        muestraUsuario();
    }, [])

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate('/');
        };
    })

    useEffect(() => {
        muestraUsuario();
    }, [props.perfil._id])

    const muestraUsuario = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let res = await axios.get(`${baseURL}/usuarios/${props.perfil._id}`, config);
            setDatosUsuario(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const sigueUsuario = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };

        let body = {
            siguiendo: {
                _id: datosUsuario._id,
                nombre: datosUsuario.nombre,
                apellidos: datosUsuario.apellidos,
                foto: datosUsuario.foto
            },
            usuario: {
                _id: props.credenciales.usuario._id,
                nombre: props.credenciales.usuario.nombre,
                apellidos: props.credenciales.usuario.apellidos,
                foto: props.credenciales.usuario.foto
            },
        }
        try {
            let res = await axios.post(`${baseURL}/usuarios/${props.credenciales.usuario._id}/siguiendo`, body, config);
            if (res.status === 200) {
                muestraUsuario();
                props.dispatch({ type: MODIFICAR_CREDENCIALES, payload: res.data.usuario })
            }
        }
        catch (error) {
            console.log(error.response)
        }
    }

    const dejaDeSeguirUsuario = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let res = await axios.delete(`${baseURL}/usuarios/${props.credenciales.usuario._id}/siguiendo/${datosUsuario._id}`, config);
            if (res.status === 200) {
                muestraUsuario();
                props.dispatch({ type: MODIFICAR_CREDENCIALES, payload: res.data.usuario })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (datosUsuario !== null) {
        return (
            <div className='paginaPerfil'>
                <Header />
                <div className="cuerpoPerfil">
                    <Margin />
                    <div className='contenidoPerfil'>
                        <div className="datosUsuario">
                            <h1 className='nombreUsuario'>{datosUsuario.nombre} {datosUsuario.apellidos}</h1>

                            <img className='imagenUsuario' src={
                                datosUsuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : datosUsuario.foto
                            } />
                            <div className='flex'>
                                <div className="camposUsuario">Ciudad:&nbsp;</div>
                                <div>{datosUsuario.ciudad === undefined ? 'Secreto' : datosUsuario.ciudad}</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Edad:&nbsp;</div>
                                <div>{new Date(Date.now() - new Date(datosUsuario.edad).getTime()).getUTCFullYear() - 1970}</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Correo:&nbsp;</div>
                                <div>{datosUsuario.correo}</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Telefono:&nbsp;</div>
                                <div>{datosUsuario.telefono === undefined ? 'Secreto' : datosUsuario.telefono}</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Data de nacimiento:&nbsp;</div>
                                <div>{new Date(datosUsuario.edad).toLocaleDateString()}</div>
                            </div>

                            <div className="botonesPerfil">
                                {props.credenciales.usuario._id !== datosUsuario._id
                                    ?
                                    props.credenciales.usuario.siguiendo.find(usuario => usuario._id === datosUsuario._id)
                                        ? <div className="botonPerfil" onClick={() => dejaDeSeguirUsuario()}> Dejar de Seguir</div>
                                        : <div className="botonPerfil" onClick={() => sigueUsuario()}> Seguir!</div>
                                    : <div className="botonPerfil" onClick={() => navigate('/editar-perfil')}> Editar Perfil</div>
                                }
                            </div>
                        </div>
                        <div className="datosInteracionesUsuario">
                            <div
                                className="interacionesUsuario"
                                onClick={async () => {
                                    await props.dispatch({ type: DATOS_PERFIL, payload: datosUsuario._id })
                                    navigate('/publicaciones')
                                }}
                            >
                                <div className="camposUsuario">Posts:</div>
                                <div className='datosCamposUsuario'>{datosUsuario.publicaciones ? datosUsuario.publicaciones.length : 0}</div>
                            </div>
                            <div className="interacionesUsuario" onClick={() => navigate('/siguiendo')}>
                                <div className="camposUsuario">Siguiendo:</div>
                                <div className='datosCamposUsuario'>{datosUsuario.siguiendo ? datosUsuario.siguiendo.length : 0}</div>
                            </div>
                            <div className="interacionesUsuario" onClick={() => navigate('/seguidores')}>
                                <div className="camposUsuario">Seguidores:</div>
                                <div className='datosCamposUsuario'>{datosUsuario.seguidores ? datosUsuario.seguidores.length : 0}</div>
                            </div>
                            <div className="interacionesUsuario" onClick={() => navigate('/likes')}>
                                <div className="camposUsuario">Likes:</div>
                                <div className='datosCamposUsuario'>{datosUsuario.likes ? datosUsuario.likes.length : 0}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='paginaPerfil'>
                <Header />
                <div className="cuerpoPerfil">
                    <Margin />
                    <div className='contenidoPerfil'>
                        <div className="datosUsuario">
                            <h1 className='nombreUsuario'>404 Usuario no encontrado</h1>
                            <img className='imagenUsuario' src='https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' />
                            <div className='flex'>
                                <div className="camposUsuario">Ciudad:</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Edad:</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Correo:</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Telefono:</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Data de nacimiento:</div>
                            </div>
                        </div>
                        <div className="datosInteracionesUsuario">
                            <div className="interacionesUsuario">
                                <div className="camposUsuario">Posts:</div>
                                <div className='datosCamposUsuario'>0</div>
                            </div>
                            <div className="interacionesUsuario">
                                <div className="camposUsuario">Siguiendo:</div>
                                <div className='datosCamposUsuario'>0</div>
                            </div>
                            <div className="interacionesUsuario">
                                <div className="camposUsuario">Seguidores:</div>
                                <div className='datosCamposUsuario'>0</div>
                            </div>
                            <div className="interacionesUsuario">
                                <div className="camposUsuario">Likes:</div>
                                <div className='datosCamposUsuario'>0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    credenciales: state.credenciales,
    perfil: state.datosPerfil
}))(Perfil);