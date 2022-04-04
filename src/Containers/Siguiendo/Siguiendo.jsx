import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Redux
import { connect } from 'react-redux';

import './Siguiendo.css';
import Margin from '../../Components/Margin/Margin';
import Header from '../../Components/Header/Header';
import { baseURL } from '../../utiles';
import { DATOS_PERFIL } from '../../redux/actions';




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

    const traerUsuariosSiguiendo = async () => {
        try {
            const respuesta = await axios.get(`${baseURL}/usuarios/${props.perfil._id}/siguiendo`, config);
            setSiguiendo(respuesta.data.siguiendo);
        } catch (error) {
            console.log(error);
        }
    };

    const verPerfil = async (id) => {
        await props.dispatch({ type: DATOS_PERFIL, payload: id });
        navigate('/perfil');
    }

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
                                                    <button className='botonPerfil' onClick={() => verPerfil(usuario._id)} >Ver Perfil</button>
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
    credenciales: state.credenciales,
    perfil: state.datosPerfil
}))(Siguiendo);