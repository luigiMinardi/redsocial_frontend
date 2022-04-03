import React, { useState, useEffect } from 'react';
import { useHref, useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { MODIFICAR_CREDENCIALES } from '../../redux/actions';

import './Perfil.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';

const Perfil = (props) => {
    let navigate = useNavigate();

    // Hooks.
    const [datosUsuario, setDatosUsuario] = useState({ _id: '' });

    useEffect(() => {
        muestraUsuario();
    }, [])

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate('/');
        };
    })

    const muestraUsuario = async () => {
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            let res = await axios.get(`${baseURL}/usuarios/${props.credenciales.usuario._id}`, config);
            setDatosUsuario(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    if (datosUsuario._id !== '') {
        return (
            <div className='paginaPerfil'>
                <Header />
                <div className="cuerpoPerfil">
                    <Margin />
                    <div className='contenidoPerfil'>
                        <div className="datosUsuario">
                            <h1 className='nombreUsuario'>{datosUsuario.nombre} {datosUsuario.apellidos}</h1>

                            <img className='imagenUsuario' src={
                                datosUsuario.foto !== '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : datosUsuario.foto
                            } />
                            <div className='flex'>
                                <div className="camposUsuario">Ciudad:&nbsp;</div>
                                <div>{datosUsuario.ciudad !== '' ? 'Secreto' : datosUsuario.ciudad}</div>
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
                                <div>{datosUsuario.telefono !== '' ? 'Secreto' : datosUsuario.telefono}</div>
                            </div>
                            <div className='flex'>
                                <div className="camposUsuario">Data de nacimiento:&nbsp;</div>
                                <div>{new Date(datosUsuario.edad).toLocaleDateString()}</div>
                            </div>

                            <div className="botonesPerfil">
                                <div className="botonPerfil" onClick={() => navigate('/editar-perfil')}> Editar Perfil</div>
                                {props.credenciales._id === datosUsuario._id
                                    ? <div className="botonPerfil"> Seguir!</div>
                                    : <> </>}
                            </div>
                        </div>
                        <div className="datosInteracionesUsuario">
                            <div className="interacionesUsuario" onClick={() => navigate('/publicaciones')}>
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
                            <img className='imagenUsuario' src={
                                datosUsuario.foto !== '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : datosUsuario.foto
                            } />
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
                            <div className="interacionesUsuario" onClick={() => navigate('/publicaciones')}>
                                <div className="camposUsuario">Posts:</div>
                                <div className='datosCamposUsuario'>0</div>
                            </div>
                            <div className="interacionesUsuario" onClick={() => navigate('/siguiendo')}>
                                <div className="camposUsuario">Siguiendo:</div>
                                <div className='datosCamposUsuario'>0</div>
                            </div>
                            <div className="interacionesUsuario" onClick={() => navigate('/seguidores')}>
                                <div className="camposUsuario">Seguidores:</div>
                                <div className='datosCamposUsuario'>0</div>
                            </div>
                            <div className="interacionesUsuario" onClick={() => navigate('/likes')}>
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
    credenciales: state.credenciales
}))(Perfil);