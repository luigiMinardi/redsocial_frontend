import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';
import { baseURL } from '../../utiles';
// Redux
import { connect } from 'react-redux';
import { MODIFICAR_CREDENCIALES } from '../../redux/actions';

import './EditarContrasena.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';



const EditarContrasena = (props) => {
    let navigate = useNavigate();

    // Hooks.
    const [contrasena, setContrasena] = useState({
        clave: undefined,
        claveNueva: undefined,
    })

    // Handler (Manejador).
    const rellenarDatos = (e) => {
        setContrasena({
            ...contrasena,
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

    const actualizaContrasena = async () => {
        let body = {
            clave: contrasena.clave,
            claveNueva: contrasena.claveNueva
        }
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            // Actualizamos los datos de Usuario en nuestra base de datos.
            let res = await axios.patch(`${baseURL}/usuarios/${props.credenciales.usuario._id}/cambiar-clave`, body, config);
            if (res) {
                // Guardamos los datos en Redux.
                navigate('/perfil');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='designContrasena'>
            <Header />
            <div className="contenidoContrasena">
                <Margin />
                <div className='cuerpoContrasena'>
                    <div className="contenedor">
                        <div className="postCabezaFoto">
                            <p className='titulo'>Edite la Contrasena de tu Usuario!</p>
                        </div>
                        <img className="imagenContrasena" src={
                            props.credenciales.usuario.foto === undefined ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : props.credenciales.usuario.foto
                        } />
                        <div className="contenedorClave">
                            <input className='inputEditarContrasena' type="password" name="clave" id="clave" title="clave" placeholder={`Contraseña Antigua:`} onChange={(e) => { rellenarDatos(e) }} />
                            <button onClick={(e) => {
                                let input = document.getElementById('clave');
                                if (input.type === 'password') {
                                    input.type = 'text'
                                    e.target.innerHTML = 'ESCONDER'
                                } else {
                                    input.type = 'password'
                                    e.target.innerHTML = 'MOSTRAR'
                                }
                            }}>
                                SHOW
                            </button>
                        </div>
                        <div className="contenedorClave">
                        <input className='inputEditarContrasena' type="password" name="claveNueva" id="claveNueva" title="claveNueva" placeholder={`Contraseña Nueva:`} onChange={(e) => { rellenarDatos(e) }} />
                            <button onClick={(e) => {
                                let input = document.getElementById('claveNueva');
                                if (input.type === 'password') {
                                    input.type = 'text'
                                    e.target.innerHTML = 'ESCONDER'
                                } else {
                                    input.type = 'password'
                                    e.target.innerHTML = 'MOSTRAR'
                                }
                            }}>
                                SHOW
                            </button>
                        
                        </div>
                        <div className="botonEditarContrasena" onClick={() => actualizaContrasena()}>
                            Actualizar Contrasena
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect((state) => ({
    credenciales: state.credenciales
}))(EditarContrasena);