import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { baseURL } from '../../utiles';
import './Publicaciones.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';


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
        if (props.credenciales.token === '') {
            navigate("/");
        }
    })

    useEffect(() => {
        console.log(publicaciones);
    }, [publicaciones]);

    const traerPublicaciones = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/usuarios/${props.credenciales.usuario._id}/publicaciones`, config);
            console.log(respuesta.data)
            setTimeout(() => {
                setPublicaciones(respuesta.data.publicaciones);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };
    if (publicaciones[0]?.id !== undefined) {
        return (
            <div className='paginaPublicaciones'>
                <Header />
                <div className="contenidoPublicaciones">
                    <Margin />
                    <div className='cuerpoPublicaciones'>
                        {
                            publicaciones.map((publicaciones, index) => {
                                return (
                                    <div className="foroPostHome" key={index}>
                                        <div className="postCabezaHome">
                                            <div className="nombreUsuarioHome">
                                                <img className='imagenUsuarioHome' src={
                                                    publicaciones.usuario.foto === '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : publicaciones.usuario.foto
                                                } />
                                                <p>{publicaciones.usuario.nombre} {publicaciones.usuario.apellidos}</p>
                                            </div>
                                            <div className="fechaPost"><p>Fecha : {publicaciones.fecha}</p></div>
                                        </div>
                                        <div className='contenidoPostHome'>
                                            <p className='tituloHilo'>{publicaciones.titulo}</p>
                                            <p className='cuerpoHilo'>{publicaciones.cuerpo}</p>
                                        </div>
                                        <div className="botonesPostHome">
                                            <button className='botonHome'>Me gusta</button>
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
        return (
            <div className='paginaHome'>
                <Header />
                <div className="contenidoHome">
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
    credenciales: state.credenciales
}))(Publicaciones);