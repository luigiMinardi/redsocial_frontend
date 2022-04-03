import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { CREDENCIALES, MODIFICAR_HILO } from '../../redux/actions';
import { baseURL } from '../../utiles';
import './EditarHilo.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';


const EditarHilo = (props) => {

    let navigate = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState({
        nombre: props.credenciales.usuario.nombre,
        apellidos: props.credenciales.usuario.apellidos,
        ciudad: props.credenciales.usuario.ciudad,
        titulo: props.datosHilo.usuario.titulo,
        cuerpo: props.datosHilo.usuario.cuerpo,
    })

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

    const actualizaHilo = async () => {
        let body = {
            id: props.credenciales.usuario.id,
            nombre: props.credenciales.nombre,
            apellidos: props.credenciales.apellidos,
            ciudad: props.credenciales.ciudad,
            titulo: datosUsuario.titulo,
            cuerpo: datosUsuario.cuerpo,
        }
        console.log("papayote", body)
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            // Actualizamos los datos de Usuario en nuestra base de datos.
            let res = await axios.patch(`${baseURL}/hilos/${props.credenciales.usuario.id}`, body, config);
            if (res) {
                // Guardamos los datos en Redux.
                props.dispatch({ type: MODIFICAR_HILO, payload: datosUsuario });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='paginaEditarHilo'>
            <Header />
            <div className="contenidoEditarHilo">
                <Margin />
                <div className='cuerpoEditarHilo'>
                    <div className="foroPostEditarHilo">
                        <div className="postCabezaEditarHilo"></div>
                        <div className='contenidoPostEditarHilo'>
                            <input className='inputEditarHilo' type="text" name="titulo" id="titulo" title="titulo" placeholder="Titulo del Post" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            <input className='inputEditarHilo' type="cuerpo" name="cuerpo" id="cuerpo" title="cuerpo" placeholder="Descripción del Post" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            <div className="botonEditarHilo" onClick={() => actualizaHilo()}>
                                Modificar Publicación
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default connect((state) => ({
    credenciales: state.credenciales,
    datosHilo: state.datosHilo
}))(EditarHilo);