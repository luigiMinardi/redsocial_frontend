import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Redux
import { connect } from 'react-redux';

import './Siguiendo.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { baseURL } from '../../utiles';




const Siguiendo = (props) => {

    const [siguiendo, setSiguiendo] = useState([]);
    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credenciales.token}` }
    };

    useEffect(() => {
        traerUsuariosSiguiendo();
    }, []);

    useEffect(() => {
        if (props.credenciales.token === '') {
            navigate("/");
        }
    })

    useEffect(() => {
        console.log(siguiendo);
    }, [siguiendo]);

    const traerUsuariosSiguiendo = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/usuarios/${props.credenciales.usuario._id}/siguiendo`, config);
            console.log(respuesta.data)
            setTimeout(() => {
                setSiguiendo(respuesta.data.siguiendo);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };
    if (siguiendo[0]?._id !== undefined) {
        return (
            <div className='paginaSiguiendo'>
                <Header />
                <div className="contenidoSiguiendo">
                    <Margin />
                    <div className='cuerpoSiguiendo'>
                        <div className="foroPostSiguiendo">
                            {
                                siguiendo.map((usuario, index) => {
                                    return (
                                        <div className="postSiguiendo" key={index}>
                                            <div className="cardSiguiendo">
                                                <div className='cardSiguiendoIzq'>
                                                    <img className='imagenSiguiendo' src={
                                                        usuario.foto === '' ? 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' : usuario.foto
                                                    } />
                                                    <button className='botonPerfil'>Ver Perfil</button>
                                                </div>
                                                <div className="cardSiguiendoDrc">
                                                <p className='letras1'>{usuario.nombre}</p>
                                                <p className='letras1'>{usuario?.apellidos}</p>
                                                <p className='letras1'>{usuario?.ciudad}</p>
                                                <p className='letras1'>{usuario?.fecha}</p>
                                            </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='paginaSiguiendo'>
                <Header />
                <div className="contenidoSiguiendo">
                    <Margin />
                    <div className='cuerpoSiguiendo'>
                        <div className="foroPostSiguiendo">
                            <div className='espinner'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};



export default connect((state) => ({
    credenciales: state.credenciales
}))(Siguiendo);