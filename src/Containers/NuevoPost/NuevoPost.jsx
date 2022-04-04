import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { connect } from 'react-redux';
import { baseURL } from '../../utiles';
import './NuevoPost.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { connect } from 'react-redux';


const NuevoPost = (props) => {
    let navigate = useNavigate();
    //hooks
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

    const creaHilo = async () => {
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
            let res = await axios.post(`${baseURL}/hilos`, body, config);
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='paginaNuevoPost'>
            <Header />
            <div className="contenidoNuevoPost">
                <Margin />
                <div className='cuerpoNuevoPost'>
                    <div className="foroPostNuevoPost">
                        <div className="postCabezaNuevoPost"></div>
                        <div className='contenidoPostNuevoPost'>
                            <input className='inputNuevoPost' type="text" name="titulo" id="titulo" title="titulo" placeholder="Titulo del Post" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            <input className='inputNuevoPost' type="text" name="cuerpo" id="cuerpo" title="cuerpo" placeholder="Descripción del Post" autoComplete="off" onChange={(e) => { rellenarDatos(e) }} />
                            <div className="botonNuevoPost"onClick={() => creaHilo()}>
                                Crear Publicación
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default connect((state) => ({
    credenciales: state.credenciales
}))(NuevoPost);