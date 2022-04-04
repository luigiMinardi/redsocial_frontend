import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { MODIFICAR_CREDENCIALES } from '../../redux/actions';

import './EditarPerfil.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';



const EditarPerfil = (props) => {
    let navigate = useNavigate();

    // Hooks.
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: props.credenciales.usuario.nombre,
        apellidos: props.credenciales.usuario.apellidos,
        edad: props.credenciales.usuario.edad,
        correo: props.credenciales.usuario.correo,
        telefono: props.credenciales.usuario.telefono,
        ciudad: props.credenciales.usuario.ciudad,
        foto: props.credenciales.usuario.foto
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

    useEffect(() => {
    }, [props.credenciales.usuario])

    const actualizaUsuario = async () => {
        let body = {
            nombre: datosUsuario.nombre,
            apellidos: datosUsuario.apellidos,
            edad: datosUsuario.edad,
            correo: datosUsuario.correo,
            telefono: datosUsuario.telefono,
            ciudad: datosUsuario.ciudad,
            foto: datosUsuario.foto
        }
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            // Actualizamos los datos de Usuario en nuestra base de datos.
            let res = await axios.patch(`${baseURL}/usuarios/${props.credenciales.usuario._id}`, body, config);
            console.log(res.data)
            if (res) {
                // Guardamos los datos en Redux.
                props.dispatch({ type: MODIFICAR_CREDENCIALES, payload: res.data });
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
                    <div className="contenedor">
                        <div className="postCabezaFoto">
                            <p className='titulo'>Edite el Perfil de tu Usuario!</p>
                        </div>
                        <img className="imagenPerfil" src={
                            datosUsuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : datosUsuario.foto
                        } />
                        <input className='inputEditarPerfil' type="text" name="nombre" id="nombre" title="nombre" placeholder={`Nombre:  ${props.credenciales.usuario.nombre}`} onChange={(e) => { rellenarDatos(e) }} />
                        <input className='inputEditarPerfil' type="text" name="apellidos" id="apellidos" title="apellidos" placeholder={`Apellidos (opcional):  ${props.credenciales.usuario.apellidos}`} onChange={(e) => { rellenarDatos(e) }} />
                        <input className='inputEditarPerfil' type="date" name="edad" id="edad" title="edad" placeholder="Fecha de Nacimiento" onChange={(e) => { rellenarDatos(e) }} />
                        <input className='inputEditarPerfil' type="email" name="correo" id="correo" title="correo" placeholder={`Correo Electronico ${props.credenciales.usuario.correo}`} onChange={(e) => { rellenarDatos(e) }} />
                        <input
                            className='inputEditarPerfil'
                            type="tel"
                            name="telefono"
                            id="telefono"
                            title="telefono"
                            placeholder={`Telefono (opcional)  ${props.credenciales.usuario.telefono}`}
                            pattern="^(\+?\d{0,2})?[\D]?\(?(\d{2,3})\)?[\D]?(\d{1,5})[\D]?(\d{2,4})[\D]?(\d{2})$"
                            onChange={(e) => { rellenarDatos(e) }} />
                        <input className='inputEditarPerfil' type="text" name="ciudad" id="ciudad" title="ciudad" placeholder={`Ciudad (opcional)  ${props.credenciales.usuario.ciudad}`} onChange={(e) => { rellenarDatos(e) }} />
                        <input className='inputEditarPerfil' type="url" name="foto" id="foto" title="foto" placeholder={`Foto (opcional, URL de la foto)`} onChange={(e) => { rellenarDatos(e) }} />
                        <div className="botonEditarPerfil" onClick={() => actualizaUsuario()}>
                            Actualizar Perfil
                        </div>
                        <div className="botonEditarPerfil">
                            Cambiar la contraseña
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credenciales: state.credenciales
}))(EditarPerfil);