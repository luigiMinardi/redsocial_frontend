import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    })

    // Handler (Manejador).
    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate('/');
        };
    })

    const actualizaUsuario = async () => {
        let body = {
            id: props.credenciales.usuario.id,
            nombre: datosUsuario.nombre,
            edad: datosUsuario.edad,
            apellidos: datosUsuario.apellidos,
            telefono: datosUsuario.telefono,
            ciudad: datosUsuario.ciudad,
        }
        console.log("papayote", body)
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            // Actualizamos los datos de Usuario en nuestra base de datos.
            let res = await axios.put(`${baseURL}usuarios/${props.credenciales.usuario.id}`, body, config);
            if (res) {
                // Guardamos los datos en Redux.
                props.dispatch({ type: MODIFICAR_CREDENCIALES, payload: datosUsuario });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='designPerfil'>
            <Header />
            <div className="contenidoPerfil">
                <Margin />
                <div className='cuerpoPerfil'>
                    <div className="foroPostFoto">
                        <div className="postCabezaFoto">
                            <p className='letras'>Foto de Perfil y Contraseña</p>
                        </div>
                        <div className="imagenPerfil"></div>
                        <div className="botonPostFoto">Cambiar imagen de Perfil</div>
                        <div className="botonPostFoto">Cambiar la contraseña</div>
                    </div>


                    <div className="foroPostPerfil">
                        <div className="postCabezaPerfil">
                            <p className='letras'>Actualiza tus datos</p>
                        </div>
                        <input className='input' type="text" name="nombre" id="nombre" title="nombre" placeholder={`Nombre:  ${props.credenciales.usuario.nombre}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="text" name="apellidos" id="apellidos" title="apellidos" placeholder={`Apellidos:  ${props.credenciales.usuario.apellidos}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="date" name="edad" id="edad" title="edad" placeholder="Fecha de Nacimiento" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="text" name="telefono" id="telefono" title="telefono" placeholder={`Telefono (opcional)  ${props.credenciales.usuario.telefono}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='input' type="text" name="ciudad" id="ciudad" title="ciudad" placeholder={`Ciudad (opcional)  ${props.credenciales.usuario.ciudad}`} autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                        <div className="botonPerfil" onClick={() => actualizaUsuario()}>
                            Actualizar Perfil
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credenciales: state.credenciales
}))(Perfil);