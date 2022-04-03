import React, { useState, useEffect } from 'react';
import { useHref, useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { MODIFICAR_CREDENCIALES } from '../../redux/types';

import './Perfil.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';



const Perfil = (props) => {
    let navigate = useNavigate();

    // Hooks.
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: props.credenciales.usuario.nombre,
        edad: props.credenciales.usuario.edad,
        apellidos: props.credenciales.usuario.apellidos,
        telefono: props.credenciales.usuario.telefono,
        ciudad: props.credenciales.usuario.ciudad,
        correo: props.credenciales.usuario.correo,
    })

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
            let res = await axios.get(`${baseURL}usuarios/${props.credenciales.usuario.id}`, config);
            setDatosUsuario(res.data)
        } catch (error) {
            console.log(error)
        }
    }
console.log(datosUsuario);
console.log(props.credenciales);
    if (datosUsuario.nombre !== '') {
        return (
            <div className='designPerfil2'>
                <Header />
                <div className="contenidoPerfil2">
                    <Margin />
                    <div className='cuerpoPerfil2'>
                        <div className='usuarioCaja'>
                            <div className="sobreYo">
                                <div className="nombreFila">{datosUsuario.nombre}</div>
                                <div className="contenidoFila">
                                    <div className="imagenUsuario"></div>
                                    <div className="edadCiudad">
                                        <div className="ciudadUsuario">{datosUsuario.ciudad}</div>
                                        <div className="edadUsuario">{datosUsuario.edad}</div>
                                    </div>
                                </div>
                                 {/* <div className="informacionUsuario">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div> */}
                                        <div className="correo">{datosUsuario.correo}</div>
                                        <div className="telefono">{datosUsuario.telefono}</div>

                                <div className="butonesFondo">
                                    <div className="botonPerfil" onClick={() => navigate('/editar-perfil')}> Editar Perfil</div>
                                    {props.credenciales.usuario._id === datosUsuario._id
                                        ? <div className="botonSeguir"> Seguir!</div>
                                        : <> </>}


                                </div>

                            </div>
                            <div className="torreDatos">
                                <div className="posts" onClick={() => navigate('/publicaciones')}>Posts: </div>
                                <div className="siguiendo" onClick={() => navigate('/siguiendo')}>Siguiendo: </div>
                                <div className="seguidores" onClick={() => navigate('/seguidores')}>Seguidores: </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='designPerfil2'>
                <Header />
                <div className="contenidoPerfil2">
                    <Margin />
                    <div className='cuerpoPerfil2'>
                        <div className='usuarioCaja'>
                            <div className="sobreYo">
                                <div className="nombreFila">Callum Joseph Iain Gordon</div>
                                <div className="contenidoFila">
                                    <div className="imagenUsuario"></div>
                                    <div className="edadCiudad">
                                        <div className="ciudadUsuario">Ciudad:</div>
                                        <div className="edadUsuario">Edad:</div>
                                    </div>
                                </div>
                                <div className="informacionUsuario">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
                            </div>
                            <div className="torreDatos">
                                <div className="posts">Posts: </div>
                                <div className="siguiendo">Siguiendo: </div>
                                <div className="seguidores">Seguidores: </div>
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