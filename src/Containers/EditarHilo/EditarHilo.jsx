import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { CREDENCIALES, DATOS_HILO, MODIFICAR_HILO } from '../../redux/actions';
import { baseURL } from '../../utiles';
import './EditarHilo.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';


const EditarHilo = (props) => {

    let navigate = useNavigate();

    const [datosHilo, setDatosHilo] = useState({
        titulo: undefined,
        cuerpo: undefined,
    });

    const rellenarDatos = (e) => {
        setDatosHilo({
            ...datosHilo,
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
            titulo: datosHilo.titulo,
            cuerpo: datosHilo.cuerpo,
            fecha: Date.now(),
            usuario: {
                usuarioId: props.credenciales.usuario._id,
                nombre: props.credenciales.usuario.nombre,
                apellidos: props.credenciales.usuario.apellidos,
                foto: props.credenciales.usuario.foto,
            },
        }
        let config = {
            headers: { Authorization: `Bearer ${props.credenciales.token}` }
        };
        try {
            // Actualizamos los datos de Usuario en nuestra base de datos.
            let res = await axios.patch(`${baseURL}/hilos/${props.datosHilo._id}`, body, config);
            if (res) {
                // Guardamos los datos en Redux.
                props.dispatch({ type: MODIFICAR_HILO, payload: datosHilo });
                props.dispatch({ type: DATOS_HILO, payload: props.datosHilo._id });
            }
            navigate('/hilo');
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
                            <input className='inputEditarHilo' type="text" name="cuerpo" id="cuerpo" title="cuerpo" placeholder="Descripción del Post" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
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